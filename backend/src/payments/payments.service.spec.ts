import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
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
  });

  describe('handleWebhook', () => {
    it('should update order to PAID on checkout.session.completed', async () => {
      const session = {
        id: 'cs_test_123',
        payment_intent: 'pi_123',
        customer_details: { email: 'test@test.com', name: 'John' },
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
