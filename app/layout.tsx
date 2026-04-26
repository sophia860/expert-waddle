import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClawSite OS — Turn Any GitHub Repo Into a Money Machine",
  description:
    "Deploy a beautiful storefront in 47 seconds. Powered by autonomous OpenClaw agents that write copy, set prices, and close sales while you sleep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
