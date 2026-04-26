import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const TIERS = {
  starter: {
    name: "ClawSite OS - Starter",
    description: "Starter package for solo founders shipping one offer",
    unitAmount: 49700,
  },
  pro: {
    name: "ClawSite OS - Pro",
    description: "Pro package for growth-stage operators and product teams",
    unitAmount: 99700,
  },
  empire: {
    name: "ClawSite OS - Empire",
    description: "Empire package for agencies and multi-offer deployment",
    unitAmount: 199700,
  },
} as const;

export async function POST(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (request.headers.get("origin") ?? "http://localhost:3000");
  const requestUrl = new URL(request.url);
  const tierParam = requestUrl.searchParams.get("tier") ?? "pro";
  const tierKey = (tierParam in TIERS ? tierParam : "pro") as keyof typeof TIERS;
  const selectedTier = TIERS[tierKey];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedTier.name,
              description: selectedTier.description,
            },
            unit_amount: selectedTier.unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?tier=${tierKey}`,
      cancel_url: `${baseUrl}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
