import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

const PACK_CONFIG: Record<string, { qty: number; totalCents: number }> = {
  solo: { qty: 1, totalCents: 2999 },
  duo: { qty: 2, totalCents: 4999 },
  equipe: { qty: 5, totalCents: 9999 },
};

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

    const pack = dto.packType ? PACK_CONFIG[dto.packType] : undefined;

    let totalCents: number;
    let stripeUnitAmount: number;
    let stripeQuantity: number;
    let displayName: string;

    if (pack) {
      if (dto.quantity !== pack.qty) {
        throw new BadRequestException(
          `Pack "${dto.packType}" requires quantity ${pack.qty}, got ${dto.quantity}`,
        );
      }
      totalCents = pack.totalCents;
      stripeUnitAmount = pack.totalCents;
      stripeQuantity = 1;
      displayName = pack.qty > 1 ? `${product.name} x ${pack.qty}` : product.name;
    } else {
      totalCents = Math.round(product.price * dto.quantity * 100);
      stripeUnitAmount = Math.round(product.price * 100);
      stripeQuantity = dto.quantity;
      displayName = product.name;
    }

    const total = totalCents / 100;
    const unitPrice = total / dto.quantity;

    const order = await this.prisma.order.create({
      data: {
        customerEmail: '',
        customerName: '',
        shippingAddress: {},
        total,
        items: {
          create: {
            productId: product.id,
            quantity: dto.quantity,
            price: unitPrice,
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
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: displayName,
              description: product.description,
              images: (() => {
                const img = product.stripeImage || product.images[0];
                if (!img) return [];
                const url = img.startsWith('http') ? img : `${this.configService.get('FRONTEND_URL')}${img}`;
                return [url];
              })(),
            },
            unit_amount: stripeUnitAmount,
          },
          quantity: stripeQuantity,
        },
      ],
      metadata: { orderId: order.id, sport: dto.sport || '' },
      success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel?session_id={CHECKOUT_SESSION_ID}`,
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
      const eventSession = event.data.object as Stripe.Checkout.Session;

      // Re-fetch full session to get all fields (shipping_details, collected_information)
      const session = await this.stripe.checkout.sessions.retrieve(eventSession.id);

      // Try multiple sources for shipping address
      const shipping = session.collected_information?.shipping_details
        || session.shipping_details
        || (session as any).shipping;

      await this.prisma.order.update({
        where: { stripeSessionId: session.id },
        data: {
          status: 'PAID',
          stripePaymentId: session.payment_intent as string,
          customerEmail: session.customer_details?.email || '',
          customerName: shipping?.name || session.customer_details?.name || '',
          customerPhone: session.customer_details?.phone || '',
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

  async cancelOrder(sessionId: string) {
    const order = await this.prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });
    if (order && order.status === 'PENDING') {
      await this.prisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELLED' },
      });
    }
    return { cancelled: true };
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
