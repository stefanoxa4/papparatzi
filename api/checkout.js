export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Papparatzi Premium',
            description: 'Onbeperkt vragen, gesprekken bewaren, zindelijkheidstracker & tandjeskaart',
          },
          unit_amount: 399,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/?premium=true`,
      cancel_url: `${req.headers.origin}/`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
