import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TrackingService', () => {
  let service: TrackingService;
  let prisma: {
    order: { findUnique: jest.Mock; findMany: jest.Mock };
  };

  const mockOrder = {
    id: 'order-1',
    orderNumber: 12345,
    status: 'SHIPPED',
    customerName: 'John Doe',
    createdAt: new Date('2026-01-01'),
    trackingNumber: 'TRK123',
    trackingUrl: 'https://tracking.example.com/TRK123',
    items: [
      {
        quantity: 2,
        price: 29.99,
        product: { name: 'Test Product' },
      },
    ],
  };

  beforeEach(async () => {
    prisma = {
      order: { findUnique: jest.fn(), findMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(TrackingService);
  });

  it('should find order by orderNumber', async () => {
    prisma.order.findUnique.mockResolvedValue(mockOrder);

    const result = await service.lookup({ orderNumber: '12345' });

    expect(prisma.order.findUnique).toHaveBeenCalledWith({
      where: { orderNumber: 12345 },
      include: {
        items: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    });
    expect(result).toEqual({
      id: 'order-1',
      orderNumber: 12345,
      status: 'SHIPPED',
      customerName: 'John Doe',
      createdAt: mockOrder.createdAt,
      trackingNumber: 'TRK123',
      trackingUrl: 'https://tracking.example.com/TRK123',
      items: [{ name: 'Test Product', quantity: 2, price: 29.99 }],
    });
  });

  it('should find orders by name + email', async () => {
    prisma.order.findMany.mockResolvedValue([mockOrder]);

    const result = await service.lookup({ name: 'John Doe', email: 'john@example.com' });

    expect(prisma.order.findMany).toHaveBeenCalledWith({
      where: {
        customerName: { equals: 'John Doe', mode: 'insensitive' },
        customerEmail: { equals: 'john@example.com', mode: 'insensitive' },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].customerName).toBe('John Doe');
  });

  it('should throw NotFoundException when order not found', async () => {
    prisma.order.findUnique.mockResolvedValue(null);

    await expect(service.lookup({ orderNumber: '99999' })).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when no criteria provided', async () => {
    await expect(service.lookup({})).rejects.toThrow(NotFoundException);
  });
});
