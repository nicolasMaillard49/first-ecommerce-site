import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const totalOrders = await this.prisma.order.count();
    const paidOrders = await this.prisma.order.count({
      where: { status: 'PAID' },
    });
    const totalRevenue = await this.prisma.order.aggregate({
      where: {
        status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] },
      },
      _sum: { total: true },
    });
    const recentOrders = await this.prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });

    return {
      totalOrders,
      paidOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
    };
  }

  async getOrders(page = 1, limit = 20) {
    const orders = await this.prisma.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });
    const total = await this.prisma.order.count();
    return { orders, total, page, totalPages: Math.ceil(total / limit) };
  }

  async updateOrderStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async getProduct() {
    return this.prisma.product.findFirst();
  }
}
