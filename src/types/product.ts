export interface Colorway {
  id: string;
  name: string;
  hex: string;
  modelColor: string; // Hex tint or material accent
  accentColor: string;
  badge: string;
  stock: number;
}

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface ProductSpec {
  label: string;
  value: string;
  detail: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  specs: ProductSpec[];
  colorways: Colorway[];
  hotspots: Hotspot[];
  modelPath: string;
  fallbackImage: string;
  sizes: number[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  colorway: Colorway;
  size: number;
  quantity: number;
  image: string;
}
