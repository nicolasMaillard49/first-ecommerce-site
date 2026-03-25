import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.getOrThrow('STRIPE_SECRET_KEY'));
  }

  async createCheckoutSession(dto: CreateCheckoutDto) {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: dto.productId },
    });

    const order = await this.prisma.order.create({
      data: {
        customerEmail: '',
        customerName: '',
        shippingAddress: {},
        total: product.price * dto.quantity,
        items: {
          create: {
            productId: product.id,
            quantity: dto.quantity,
            price: product.price,
          },
        },
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.images[0]],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: dto.quantity,
        },
      ],
      metadata: { orderId: order.id, sport: dto.sport || '' },
      success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.getOrThrow('STRIPE_WEBHOOK_SECRET'),
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const shipping = session.collected_information?.shipping_details;

      await this.prisma.order.update({
        where: { stripeSessionId: session.id },
        data: {
          status: 'PAID',
          stripePaymentId: session.payment_intent as string,
          customerEmail: session.customer_details?.email || '',
          customerName: shipping?.name || session.customer_details?.name || '',
          shippingAddress: shipping?.address ? {
            line1: shipping.address.line1 || '',
            line2: shipping.address.line2 || '',
            city: shipping.address.city || '',
            postalCode: shipping.address.postal_code || '',
            country: shipping.address.country || 'FR',
          } : {},
        },
      });
    }

    return { received: true };
  }

  async getSessionStatus(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    const order = await this.prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: { include: { product: true } } },
    });
    return { session, order };
  }
}
