import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

// Mock Stripe before importing PaymentsService
const mockStripe = {
  checkout: {
    sessions: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
};

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => mockStripe);
});

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prisma: {
    product: { findUniqueOrThrow: jest.Mock };
    order: { create: jest.Mock; update: jest.Mock; findUnique: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      product: { findUniqueOrThrow: jest.fn() },
      order: { create: jest.fn(), update: jest.fn(), findUnique: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: EmailService,
          useValue: {
            sendOrderConfirmation: jest.fn(),
            sendShippingNotification: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
            getOrThrow: jest.fn().mockReturnValue('sk_test_fake'),
          },
        },
      ],
    }).compile();

    service = module.get(PaymentsService);
    jest.clearAllMocks();
  });

  describe('createCheckoutSession', () => {
    const customerFields = {
      customerName: 'Jean Dupont',
      customerEmail: 'jean@test.com',
      customerPhone: '+33612345678',
      shippingAddress: {
        line1: '12 rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
      },
    };
    const dto = { productId: 'prod-1', quantity: 2, ...customerFields };
    const product = {
      id: 'prod-1',
      name: 'Test Product',
      description: 'A description',
      price: 29.99,
      images: ['https://example.com/img.jpg'],
    };

    it('should create order and stripe session for valid product', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-1' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/session',
      });

      const result = await service.createCheckoutSession(dto);

      expect(prisma.product.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
      });
      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 29.99 * 2,
          }),
        }),
      );
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: { stripeSessionId: 'cs_test_123' },
      });
      expect(result).toEqual({
        sessionId: 'cs_test_123',
        url: 'https://checkout.stripe.com/session',
      });
    });

    it('should throw when product does not exist', async () => {
      prisma.product.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.createCheckoutSession(dto)).rejects.toThrow(
        'Record not found',
      );
    });

    it('should not crash when images[0] is undefined', async () => {
      const productNoImages = { ...product, images: [] };
      prisma.product.findUniqueOrThrow.mockResolvedValue(productNoImages);
      prisma.order.create.mockResolvedValue({ id: 'order-2' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_test_456',
        url: 'https://checkout.stripe.com/session',
      });

      // Should not throw even though images[0] is undefined
      const result = await service.createCheckoutSession(dto);
      expect(result.sessionId).toBe('cs_test_456');
    });

    it('should create checkout with solo pack at correct price', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-solo' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_solo',
        url: 'https://checkout.stripe.com/solo',
      });

      const result = await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 1,
        packType: 'solo',
        ...customerFields,
      });

      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 29.99,
            items: expect.objectContaining({
              create: expect.objectContaining({
                price: 29.99,
                quantity: 1,
              }),
            }),
          }),
        }),
      );
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            expect.objectContaining({
              price_data: expect.objectContaining({
                unit_amount: 2999,
              }),
              quantity: 1,
            }),
          ],
        }),
      );
      expect(result.sessionId).toBe('cs_solo');
    });

    it('should create checkout with duo pack at 49.99', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-duo' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_duo',
        url: 'https://checkout.stripe.com/duo',
      });

      const result = await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 2,
        packType: 'duo',
        ...customerFields,
      });

      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 49.99,
            items: expect.objectContaining({
              create: expect.objectContaining({
                price: 49.99 / 2,
                quantity: 2,
              }),
            }),
          }),
        }),
      );
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            expect.objectContaining({
              price_data: expect.objectContaining({
                unit_amount: 4999,
                product_data: expect.objectContaining({
                  name: 'Test Product x 2',
                }),
              }),
              quantity: 1,
            }),
          ],
        }),
      );
      expect(result.sessionId).toBe('cs_duo');
    });

    it('should create checkout with equipe pack at 99.99', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-equipe' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_equipe',
        url: 'https://checkout.stripe.com/equipe',
      });

      const result = await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 5,
        packType: 'equipe',
        ...customerFields,
      });

      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 99.99,
            items: expect.objectContaining({
              create: expect.objectContaining({
                price: 99.99 / 5,
                quantity: 5,
              }),
            }),
          }),
        }),
      );
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            expect.objectContaining({
              price_data: expect.objectContaining({
                unit_amount: 9999,
                product_data: expect.objectContaining({
                  name: 'Test Product x 5',
                }),
              }),
              quantity: 1,
            }),
          ],
        }),
      );
      expect(result.sessionId).toBe('cs_equipe');
    });

    it('should reject pack with wrong quantity', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);

      await expect(
        service.createCheckoutSession({
          productId: 'prod-1',
          quantity: 3,
          packType: 'duo',
          ...customerFields,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should fallback to unit price * quantity when no packType', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-fallback' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_fallback',
        url: 'https://checkout.stripe.com/fallback',
      });

      const result = await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 3,
        ...customerFields,
      });

      // 29.99 * 3 = 89.97, totalCents = Math.round(89.97 * 100) = 8997
      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 89.97,
            items: expect.objectContaining({
              create: expect.objectContaining({
                price: 89.97 / 3,
                quantity: 3,
              }),
            }),
          }),
        }),
      );
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            expect.objectContaining({
              price_data: expect.objectContaining({
                unit_amount: 2999,
              }),
              quantity: 3,
            }),
          ],
        }),
      );
      expect(result.sessionId).toBe('cs_fallback');
    });
  });

  describe('handleWebhook', () => {
    it('should update order to PAID on checkout.session.completed', async () => {
      const session = {
        id: 'cs_test_123',
        payment_intent: 'pi_123',
      };
      mockStripe.webhooks.constructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: { object: session },
      });
      prisma.order.update.mockResolvedValue({
        id: 'order-1',
        orderNumber: 1,
        customerName: 'Test',
        customerEmail: 'test@test.com',
        total: 29.99,
        shippingAddress: {},
        items: [{ product: { name: 'ClipBag' }, quantity: 1, price: 29.99 }],
      });

      const result = await service.handleWebhook(
        Buffer.from('payload'),
        'sig_test',
      );

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { stripeSessionId: 'cs_test_123' },
        data: {
          status: 'PAID',
          stripePaymentId: 'pi_123',
        },
        include: { items: { include: { product: true } } },
      });
      expect(result).toEqual({ received: true });
    });

    it('should throw on invalid signature', async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      await expect(
        service.handleWebhook(Buffer.from('payload'), 'bad_sig'),
      ).rejects.toThrow('Invalid signature');
    });
  });

  describe('handleWebhook — edge cases', () => {
    it('should ignore non-checkout.session.completed events', async () => {
      mockStripe.webhooks.constructEvent.mockReturnValue({
        type: 'payment_intent.succeeded',
        data: { object: {} },
      });

      const result = await service.handleWebhook(Buffer.from('payload'), 'sig');

      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(result).toEqual({ received: true });
    });
  });

  describe('cancelOrder', () => {
    it('should cancel a PENDING order', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', status: 'PENDING' });
      prisma.order.update.mockResolvedValue({ id: 'order-1', status: 'CANCELLED' });

      const result = await service.cancelOrder('cs_test_cancel');

      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { stripeSessionId: 'cs_test_cancel' },
      });
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: { status: 'CANCELLED' },
      });
      expect(result).toEqual({ cancelled: true });
    });

    it('should NOT cancel a PAID order', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', status: 'PAID' });

      const result = await service.cancelOrder('cs_test_paid');

      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(result).toEqual({ cancelled: true });
    });

    it('should NOT cancel a SHIPPED order', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', status: 'SHIPPED' });

      const result = await service.cancelOrder('cs_test_shipped');

      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(result).toEqual({ cancelled: true });
    });

    it('should return { cancelled: true } when order not found', async () => {
      prisma.order.findUnique.mockResolvedValue(null);

      const result = await service.cancelOrder('cs_nonexistent');

      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(result).toEqual({ cancelled: true });
    });

    it('should not cancel an already CANCELLED order', async () => {
      prisma.order.findUnique.mockResolvedValue({ id: 'order-1', status: 'CANCELLED' });

      const result = await service.cancelOrder('cs_already_cancelled');

      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(result).toEqual({ cancelled: true });
    });
  });

  describe('createCheckoutSession — additional edge cases', () => {
    const product = {
      id: 'prod-1',
      name: 'Test Product',
      description: 'A description',
      price: 29.99,
      images: ['https://example.com/img.jpg'],
    };

    it('should throw BadRequest when packType=equipe but quantity=3', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);

      await expect(
        service.createCheckoutSession({
          productId: 'prod-1',
          quantity: 3,
          packType: 'equipe',
          customerName: 'Test',
          customerEmail: 'test@test.com',
          shippingAddress: { line1: '1 rue Test', city: 'Paris', postalCode: '75001' },
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should handle product with no images and no stripeImage', async () => {
      const noImgProduct = { ...product, images: [], stripeImage: null };
      prisma.product.findUniqueOrThrow.mockResolvedValue(noImgProduct);
      prisma.order.create.mockResolvedValue({ id: 'order-noimg' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_noimg',
        url: 'https://checkout.stripe.com/noimg',
      });

      const result = await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 1,
        customerName: 'Test',
        customerEmail: 'test@test.com',
        shippingAddress: { line1: '1 rue Test', city: 'Paris', postalCode: '75001' },
      });

      const stripeCall = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(stripeCall.line_items[0].price_data.product_data.images).toEqual([]);
      expect(result.sessionId).toBe('cs_noimg');
    });

    it('should handle Stripe API failure', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-fail' });
      mockStripe.checkout.sessions.create.mockRejectedValue(
        new Error('Stripe rate limited'),
      );

      await expect(
        service.createCheckoutSession({
          productId: 'prod-1',
          quantity: 1,
          customerName: 'Test',
          customerEmail: 'test@test.com',
          shippingAddress: { line1: '1 rue Test', city: 'Paris', postalCode: '75001' },
        }),
      ).rejects.toThrow('Stripe rate limited');
    });

    it('should store customer info on the PENDING order', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-info' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_info',
        url: 'https://checkout.stripe.com/info',
      });

      await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 1,
        customerName: 'Marie Martin',
        customerEmail: 'marie@test.com',
        customerPhone: '+33698765432',
        shippingAddress: {
          line1: '5 avenue Victor Hugo',
          line2: 'Apt 3B',
          city: 'Lyon',
          postalCode: '69001',
        },
      });

      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            customerName: 'Marie Martin',
            customerEmail: 'marie@test.com',
            customerPhone: '+33698765432',
            shippingAddress: {
              line1: '5 avenue Victor Hugo',
              line2: 'Apt 3B',
              city: 'Lyon',
              postalCode: '69001',
              country: 'FR',
            },
          }),
        }),
      );
    });

    it('should pass customer_email to Stripe session', async () => {
      prisma.product.findUniqueOrThrow.mockResolvedValue(product);
      prisma.order.create.mockResolvedValue({ id: 'order-email' });
      prisma.order.update.mockResolvedValue({});
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_email',
        url: 'https://checkout.stripe.com/email',
      });

      await service.createCheckoutSession({
        productId: 'prod-1',
        quantity: 1,
        customerName: 'Test',
        customerEmail: 'prefilled@test.com',
        shippingAddress: { line1: '1 rue Test', city: 'Paris', postalCode: '75001' },
      });

      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          customer_email: 'prefilled@test.com',
        }),
      );
      // Should NOT have shipping_address_collection
      const stripeCall = mockStripe.checkout.sessions.create.mock.calls[0][0];
      expect(stripeCall).not.toHaveProperty('shipping_address_collection');
      expect(stripeCall).not.toHaveProperty('billing_address_collection');
      expect(stripeCall).not.toHaveProperty('phone_number_collection');
    });
  });

  describe('getSessionStatus', () => {
    it('should return session and order', async () => {
      const session = { id: 'cs_test_123', status: 'complete' };
      const order = { id: 'order-1', items: [] };
      mockStripe.checkout.sessions.retrieve.mockResolvedValue(session);
      prisma.order.findUnique.mockResolvedValue(order);

      const result = await service.getSessionStatus('cs_test_123');

      expect(mockStripe.checkout.sessions.retrieve).toHaveBeenCalledWith(
        'cs_test_123',
      );
      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { stripeSessionId: 'cs_test_123' },
        include: { items: { include: { product: true } } },
      });
      expect(result).toEqual({ session, order });
    });
  });
});
