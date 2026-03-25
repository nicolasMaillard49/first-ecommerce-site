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

  describe('updateOrderTracking', () => {
    it('should update tracking number and URL', async () => {
      const updated = { id: 'order-1', trackingNumber: 'LP123CN', trackingUrl: 'https://track.example.com/LP123CN' };
      prisma.order.update.mockResolvedValue(updated);

      const result = await service.updateOrderTracking('order-1', {
        trackingNumber: 'LP123CN',
        trackingUrl: 'https://track.example.com/LP123CN',
      });

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: {
          trackingNumber: 'LP123CN',
          trackingUrl: 'https://track.example.com/LP123CN',
        },
      });
      expect(result).toEqual(updated);
    });

    it('should update only tracking number when URL is omitted', async () => {
      prisma.order.update.mockResolvedValue({ id: 'order-1', trackingNumber: 'LP456CN' });

      await service.updateOrderTracking('order-1', { trackingNumber: 'LP456CN' });

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: {
          trackingNumber: 'LP456CN',
          trackingUrl: undefined,
        },
      });
    });
  });

  describe('updateOrderSupplier', () => {
    it('should save supplier order ID and URL', async () => {
      const updated = { id: 'order-1', supplierOrderId: '82156372849', supplierUrl: 'https://aliexpress.com/order/82156372849' };
      prisma.order.update.mockResolvedValue(updated);

      const result = await service.updateOrderSupplier('order-1', {
        supplierOrderId: '82156372849',
        supplierUrl: 'https://aliexpress.com/order/82156372849',
      });

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: {
          supplierOrderId: '82156372849',
          supplierUrl: 'https://aliexpress.com/order/82156372849',
        },
      });
      expect(result).toEqual(updated);
    });

    it('should set null when supplier ID is empty string', async () => {
      prisma.order.update.mockResolvedValue({ id: 'order-1', supplierOrderId: null });

      await service.updateOrderSupplier('order-1', {
        supplierOrderId: '',
      });

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: expect.objectContaining({ supplierOrderId: null }),
      });
    });

    it('should only update provided fields', async () => {
      prisma.order.update.mockResolvedValue({ id: 'order-1' });

      await service.updateOrderSupplier('order-1', {
        supplierOrderId: '12345',
      });

      const callData = prisma.order.update.mock.calls[0][0].data;
      expect(callData.supplierOrderId).toBe('12345');
      expect(callData).not.toHaveProperty('supplierUrl');
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

    it('should update product with supplierUrl', async () => {
      const updated = { id: 'prod-1', supplierUrl: 'https://aliexpress.com/item/123.html' };
      prisma.product.update.mockResolvedValue(updated);

      const result = await service.updateProduct('prod-1', {
        supplierUrl: 'https://aliexpress.com/item/123.html',
      });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { supplierUrl: 'https://aliexpress.com/item/123.html' },
      });
      expect(result).toEqual(updated);
    });

    it('should clear supplierUrl when set to null', async () => {
      prisma.product.update.mockResolvedValue({ id: 'prod-1', supplierUrl: null });

      await service.updateProduct('prod-1', { supplierUrl: undefined });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'prod-1' },
        data: { supplierUrl: undefined },
      });
    });
  });
});
