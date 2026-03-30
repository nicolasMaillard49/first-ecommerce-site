import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';

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
    const dto = { productId: 'prod-1', quantity: 2 };
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
        customer_details: { email: 'test@test.com', name: 'John', phone: '+33612345678' },
        collected_information: {
          shipping_details: {
            name: 'John Doe',
            address: {
              line1: '1 rue de la Paix',
              line2: '',
              city: 'Paris',
              postal_code: '75001',
              country: 'FR',
            },
          },
        },
      };
      mockStripe.webhooks.constructEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: { object: session },
      });
      prisma.order.update.mockResolvedValue({});

      const result = await service.handleWebhook(
        Buffer.from('payload'),
        'sig_test',
      );

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { stripeSessionId: 'cs_test_123' },
        data: expect.objectContaining({
          status: 'PAID',
          stripePaymentId: 'pi_123',
          customerEmail: 'test@test.com',
          customerName: 'John Doe',
          customerPhone: '+33612345678',
        }),
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
