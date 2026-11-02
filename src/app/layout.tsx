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
  themeColor: "#07090e",
  colorScheme: "dark",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        {/* Preload the 3D model so it's in cache before the Canvas mounts */}
        <link
          rel="preload"
          href="/models/slipper-main.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090e] text-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
