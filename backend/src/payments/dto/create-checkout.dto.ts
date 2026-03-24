export class CreateCheckoutDto {
  productId: string;
  quantity: number;
  variant?: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
