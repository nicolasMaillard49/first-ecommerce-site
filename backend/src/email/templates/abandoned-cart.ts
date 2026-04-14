export interface AbandonedCartEmailData {
  orderNumber: number;
  customerName: string;
  customerEmail: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

export function abandonedCartTemplate(data: AbandonedCartEmailData): string {
  const orderNum = `GS-${String(data.orderNumber).padStart(5, '0')}`;
  const itemsHtml = data.items
    .map(
      (i) =>
        `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 15px;">${i.name}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 15px; text-align: center;">x${i.quantity}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 15px; text-align: right; font-weight: 600;">${i.price.toFixed(2)}&euro;</td>
        </tr>`,
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f59e0b, #f97316); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 8px;">🛒</div>
      <h1 style="color: white; margin: 0; font-size: 22px;">Vous avez oublie quelque chose ?</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 15px;">Commande ${orderNum}</p>
    </div>

    <!-- Body -->
    <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px;">
      <p style="color: #374151; font-size: 16px; margin-top: 0;">
        Bonjour <strong>${data.customerName}</strong>,
      </p>
      <p style="color: #6b7280; font-size: 15px;">
        Nous avons remarque que votre commande <strong>${orderNum}</strong> n'a pas ete finalisee.
        Pas de souci, votre panier vous attend !
      </p>

      <!-- Items recap -->
      <div style="margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          ${itemsHtml}
        </table>
        <div style="text-align: right; margin-top: 12px;">
          <span style="font-size: 18px; font-weight: 700; color: #111827;">${data.total.toFixed(2)}&euro;</span>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 32px 0 16px;">
        <a href="https://clipbag.shop" style="display: inline-block; background: #f59e0b; color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Finaliser ma commande
        </a>
      </div>

      <p style="color: #9ca3af; font-size: 13px; text-align: center; margin: 24px 0 0;">
        Livraison offerte &middot; Paiement 100% securise &middot; Retour sous 30 jours
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">ClipBag</p>
      <p style="margin: 4px 0 0;">
        <a href="https://clipbag.shop" style="color: #f59e0b; text-decoration: none;">clipbag.shop</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
