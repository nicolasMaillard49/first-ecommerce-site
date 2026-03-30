import { Controller, Get, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';
import { UpdateOrderSupplierDto } from './dto/update-order-supplier.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('orders')
  getOrders(@Query('page') page: string) {
    return this.adminService.getOrders(Number(page) || 1);
  }

  @Put('orders/:id/status')
  updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.adminService.updateOrderStatus(id, dto.status);
  }

  @Put('orders/:id/tracking')
  updateOrderTracking(@Param('id') id: string, @Body() dto: UpdateOrderTrackingDto) {
    return this.adminService.updateOrderTracking(id, dto);
  }

  @Put('orders/:id/supplier')
  updateOrderSupplier(@Param('id') id: string, @Body() dto: UpdateOrderSupplierDto) {
    return this.adminService.updateOrderSupplier(id, dto);
  }

  @Delete('orders/:id')
  deleteOrder(@Param('id') id: string) {
    return this.adminService.deleteOrder(id);
  }

  @Get('product')
  getProduct() {
    return this.adminService.getProduct();
  }

  @Put('product/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.adminService.updateProduct(id, dto);
  }
}
