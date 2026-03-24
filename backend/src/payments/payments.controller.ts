import { Controller, Post, Body, Headers, Req, Get, Query } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import type { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-checkout')
  createCheckout(@Body() dto: CreateCheckoutDto) {
    return this.paymentsService.createCheckoutSession(dto);
  }

  @Post('webhook')
  webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentsService.handleWebhook(req.rawBody!, signature);
  }

  @Get('session-status')
  getSessionStatus(@Query('session_id') sessionId: string) {
    return this.paymentsService.getSessionStatus(sessionId);
  }
}
