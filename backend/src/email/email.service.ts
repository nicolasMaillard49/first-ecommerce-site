import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { orderConfirmationTemplate } from './templates/order-confirmation';
import { shippingNotificationTemplate } from './templates/shipping-notification';

export interface OrderEmailData {
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country?: string;
  };
}

export interface ShippingEmailData {
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  trackingNumber: string;
  trackingUrl?: string;
}

@Injectable()
export class EmailService {
  private resend: Resend;
  private from: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('RESEND_API_KEY');
    this.resend = new Resend(apiKey || 'missing_key');
    this.from = this.configService.get('EMAIL_FROM') || 'ClipBag <onboarding@resend.dev>';
  }

  async sendOrderConfirmation(data: OrderEmailData) {
    try {
      const result = await this.resend.emails.send({
        from: this.from,
        to: data.customerEmail,
        subject: `Commande confirmee #GS-${String(data.orderNumber).padStart(5, '0')}`,
        html: orderConfirmationTemplate(data),
      });
      this.logger.log(`Order confirmation sent to ${data.customerEmail} (${result.data?.id})`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to send order confirmation to ${data.customerEmail}`, error);
    }
  }

  async sendShippingNotification(data: ShippingEmailData) {
    try {
      const result = await this.resend.emails.send({
        from: this.from,
        to: data.customerEmail,
        subject: `Votre commande #GS-${String(data.orderNumber).padStart(5, '0')} a ete expediee !`,
        html: shippingNotificationTemplate(data),
      });
      this.logger.log(`Shipping notification sent to ${data.customerEmail} (${result.data?.id})`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to send shipping notification to ${data.customerEmail}`, error);
    }
  }
}
