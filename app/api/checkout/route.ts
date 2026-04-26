import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const TIERS = {
  starter: {
    name: "ClawSite OS - Starter Tier",
    description: "Starter package for ClawSite OS",
    unitAmount: 49700,
  },
  operator: {
    name: "ClawSite OS - Operator Tier",
    description: "Operator package for ClawSite OS",
    unitAmount: 99700,
  },
  empire: {
    name: "ClawSite OS - Empire Tier",
    description: "Empire package for ClawSite OS",
    unitAmount: 199700,
  },
} as const;

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const requestedTier = url.searchParams.get("tier");
    const tierKey =
      requestedTier === "starter" || requestedTier === "operator" || requestedTier === "empire"
        ? requestedTier
        : "operator";
    const tier = TIERS[tierKey];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || url.origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.unitAmount,
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
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
