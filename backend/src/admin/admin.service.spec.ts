import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdminService', () => {
  let service: AdminService;
  let prisma: {
    order: {
      count: jest.Mock;
      aggregate: jest.Mock;
      findMany: jest.Mock;
      update: jest.Mock;
    };
    product: { findFirst: jest.Mock; update: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      order: {
        count: jest.fn(),
        aggregate: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
      product: { findFirst: jest.fn(), update: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(AdminService);
  });

  describe('getDashboard', () => {
    it('should return dashboard metrics', async () => {
      prisma.order.count
        .mockResolvedValueOnce(50) // totalOrders
        .mockResolvedValueOnce(30); // paidOrders
      prisma.order.aggregate.mockResolvedValue({ _sum: { total: 1500.5 } });
      prisma.order.findMany.mockResolvedValue([{ id: 'order-1' }]);

      const result = await service.getDashboard();

      expect(result).toEqual({
        totalOrders: 50,
        paidOrders: 30,
        totalRevenue: 1500.5,
        recentOrders: [{ id: 'order-1' }],
      });
    });

    it('should return 0 revenue when no paid orders', async () => {
      prisma.order.count.mockResolvedValue(0);
      prisma.order.aggregate.mockResolvedValue({ _sum: { total: null } });
      prisma.order.findMany.mockResolvedValue([]);

      const result = await service.getDashboard();

      expect(result.totalRevenue).toBe(0);
    });
  });

  describe('getOrders', () => {
    it('should return paginated orders', async () => {
      const orders = [{ id: 'order-1' }, { id: 'order-2' }];
      prisma.order.findMany.mockResolvedValue(orders);
      prisma.order.count.mockResolvedValue(50);

      const result = await service.getOrders(2, 20);

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 20, take: 20 }),
      );
      expect(result).toEqual({
        orders,
        total: 50,
        page: 2,
        totalPages: 3,
      });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status', async () => {
      const updated = { id: 'order-1', status: 'SHIPPED' };
      prisma.order.update.mockResolvedValue(updated);

      const result = await service.updateOrderStatus('order-1', 'SHIPPED');

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: { status: 'SHIPPED' },
      });
      expect(result).toEqual(updated);
    });
  });

  describe('getProduct', () => {
    it('should return the product', async () => {
      const product = { id: 'prod-1', name: 'Test' };
      prisma.product.findFirst.mockResolvedValue(product);

      const result = await service.getProduct();

      expect(result).toEqual(product);
    });
  });

  describe('updateProduct', () => {
    it('should update and return the product', async () => {
      const updated = { id: 'prod-1', name: 'Updated', price: 39.99 };
      prisma.product.update.mockResolvedValue(updated);

      const result = await service.updateProduct('prod-1', {
        name: 'Updated',
        price: 39.99,
      });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { name: 'Updated', price: 39.99 },
      });
      expect(result).toEqual(updated);
    });
  });
});
