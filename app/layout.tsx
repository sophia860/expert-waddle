import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClawSite OS — Turn Any GitHub Repo Into a $497–$1,997 Money Machine in 47 Seconds",
  description:
    "Deploy a high-converting storefront in 47 seconds. ClawSite OS turns any GitHub repo into a launch-ready offer with pricing, checkout, and automation included.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
