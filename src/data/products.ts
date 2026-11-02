import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "fason-orbit-01",
    slug: "orbit-slide-01",
    name: "FASON® Orbit Relief // 01",
    code: "FSN-OR01-RELIEF",
    tagline: "Feel The Relief: Dynamic Zero-G Plantar Recovery",
    price: 185,
    originalPrice: 220,
    rating: 4.96,
    reviewsCount: 412,
    description:
      "Engineered by FASON® Biomechanical Research. The Orbit Relief // 01 incorporates our proprietary Ortho-Kinetic additive void matrix to decompress the plantar fascia, dissipate heel shock, and deliver instant, soothing relief after demanding athletic exertion.",
    features: [
      "FASON® Ortho-Kinetic Arch Cradle (Instant Plantar Decompression)",
      "Dynamic Dual-Density Bio-Foam Matrix",
      "Cryo-Weave Thermoregulating Forefoot Shroud",
      "Hydrophobic Nanotech Dirt & Liquid Barrier",
      "Omni-Directional Cyber-Grip Sole Pods",
      "100% Recyclable Bio-Circular Polyurethane Chassis"
    ],
    specs: [
      { label: "Plantar Relief Index", value: "98.4%", detail: "Immediate tension reduction" },
      { label: "Lattice Density", value: "84.2%", detail: "Progressive compression gradient" },
      { label: "Kinetic Return", value: "+32.4%", detail: "Energy redirection coefficient" },
      { label: "Total Unit Weight", value: "148g", detail: "Featherlight (US Men's 9.0)" },
      { label: "Drop Geometry", value: "4.0mm", detail: "Natural posture realignment" }
    ],
    colorways: [
      {
        id: "sage-mist",
        name: "Pastel Sage / Alabaster",
        hex: "#8fad88",
        modelColor: "#c2d1be",
        accentColor: "#62925b",
        badge: "SIGNATURE RECOVERY",
        stock: 32
      },
      {
        id: "powder-cerulean",
        name: "Powder Blue / Vapor",
        hex: "#82b2d8",
        modelColor: "#b8d2e5",
        accentColor: "#528ebf",
        badge: "SERENITY DROP",
        stock: 18
      },
      {
        id: "dusty-terracotta",
        name: "Terracotta Rose / Clay",
        hex: "#e58282",
        modelColor: "#e5b3b3",
        accentColor: "#c85d5d",
        badge: "EARTHEN EDITION",
        stock: 14
      },
      {
        id: "cashmere-sand",
        name: "Cashmere Oat / Sand",
        hex: "#d4a373",
        modelColor: "#dfc7ad",
        accentColor: "#a77341",
        badge: "MINIMALIST LAB",
        stock: 24
      }
    ],
    hotspots: [
      {
        id: "sole",
        title: "Ortho-Kinetic Relief Sole",
        description:
          "Compressible cellular voids absorb 84% of vertical impact force, providing immediate relief from plantar strain.",
        position: [0, -0.6, 0.4],
        cameraPosition: [0, -1.2, 2.5],
        cameraTarget: [0, -0.4, 0]
      },
      {
        id: "upper",
        title: "Cryo-Weave Shroud",
        description:
          "Ventilated elastomer strap dissipates thermal buildup while conforming gently to dorsal tendon contours.",
        position: [0, 0.6, 0.1],
        cameraPosition: [0, 1.8, 1.8],
        cameraTarget: [0, 0.3, 0]
      },
      {
        id: "heel",
        title: "Deep Calcaneal Heel Cup",
        description:
          "Ergonomic cradle aligns the heel bone and Achilles tendon to eliminate pronation fatigue.",
        position: [-0.8, 0.1, -0.5],
        cameraPosition: [-2.2, 0.8, -1.2],
        cameraTarget: [-0.6, 0.1, -0.3]
      }
    ],
    modelPath: "/models/slipper-main.glb",
    fallbackImage: "/images/slipper-fallback.jpg",
    sizes: [7, 8, 9, 10, 11, 12, 13]
  },
  {
    id: "fason-strata-02",
    slug: "strata-runner-02",
    name: "FASON® Strata Mule // 02",
    code: "FSN-SM02-EXO",
    tagline: "Feel The Relief: All-Terrain Monolithic Recovery Clog",
    price: 210,
    originalPrice: 245,
    rating: 4.89,
    reviewsCount: 198,
    description:
      "A protective recovery mule designed for pre- and post-trail relief. Continuous unibody shell with high-rebound cushioning that shields feet from environmental stress.",
    features: [
      "Monolithic Protective Cast Shield",
      "Detachable Thermal Recovery Bootie",
      "Instant Magnetic Heel Latch",
      "High-Traction All-Weather Outsole"
    ],
    specs: [
      { label: "Plantar Relief", value: "96.2%", detail: "Full enclosure impact reduction" },
      { label: "Water Resistance", value: "IPX-7", detail: "Immersion-rated protection" },
      { label: "Dry Weight", value: "192g", detail: "Single unit (US Men's 9.0)" }
    ],
    colorways: [
      {
        id: "chalk-alabaster",
        name: "Chalk Alabaster",
        hex: "#e8e6df",
        modelColor: "#e0dcd3",
        accentColor: "#8fad88",
        badge: "CORE MONOLITH",
        stock: 19
      },
      {
        id: "sage-lichen",
        name: "Pastel Sage / Lichen",
        hex: "#9bb595",
        modelColor: "#c2d1be",
        accentColor: "#62925b",
        badge: "NORDIC LAB",
        stock: 11
      }
    ],
    hotspots: [],
    modelPath: "/models/slipper-main.glb",
    fallbackImage: "/images/slipper-fallback.jpg",
    sizes: [8, 9, 10, 11, 12]
  },
  {
    id: "fason-pulse-03",
    slug: "pulse-sandal-03",
    name: "FASON® Pulse Slide // 03",
    code: "FSN-PS03-AERO",
    tagline: "Feel The Relief: Ultralight Rapid-Drain Coastal Platform",
    price: 165,
    rating: 4.92,
    reviewsCount: 114,
    description:
      "Engineered for coastal athletes and warm-weather decompression. Open channels evacuate water and sand in seconds while delivering cloud-like arch relief.",
    features: [
      "Zero-Retention Water Drainage Conduits",
      "Featherlight 118g Monocoque Platform",
      "Marine-Grade Anti-Slip Tread Compound",
      "UV-Stabilized Hydro-Polymer"
    ],
    specs: [
      { label: "Drainage Speed", value: "2.4s", detail: "Instant liquid clearance" },
      { label: "Plantar Relief", value: "94.8%", detail: "Dynamic arch support" },
      { label: "Dry Weight", value: "118g", detail: "Featherweight class" }
    ],
    colorways: [
      {
        id: "coastal-celeste",
        name: "Celeste Sky / Breeze",
        hex: "#90c5cf",
        modelColor: "#bddfe6",
        accentColor: "#4f98a5",
        badge: "COASTAL RECOVERY",
        stock: 22
      },
      {
        id: "blush-peach",
        name: "Pastel Peach / Coral",
        hex: "#f0a89a",
        modelColor: "#fad2cb",
        accentColor: "#d67866",
        badge: "SUMMER DROP",
        stock: 16
      }
    ],
    hotspots: [],
    modelPath: "/models/slipper-main.glb",
    fallbackImage: "/images/slipper-fallback.jpg",
    sizes: [7, 8, 9, 10, 11, 12]
  }
];

export const FLAGSHIP_PRODUCT = PRODUCTS[0];
