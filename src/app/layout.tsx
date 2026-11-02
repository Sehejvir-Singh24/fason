import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FASON® // Feel The Relief | Futuristic Kinetic Recovery Footwear",
  description:
    "FASON® engineers zero-gravity additive lattice footwear designed for post-exertion recovery and immediate plantar relief. Feel The Relief.",
  keywords: [
    "FASON",
    "Feel The Relief",
    "recovery slides",
    "3D printed slides",
    "kinetic footwear",
    "plantar fasciitis relief",
    "futuristic slippers",
  ],
  authors: [{ name: "FASON® Biomechanical Labs" }],
  openGraph: {
    title: "FASON® // Feel The Relief",
    description: "Additive lattice architecture engineered for zero-gravity plantar relief.",
    type: "website",
    siteName: "FASON®",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f7f4] text-[#14161a]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
