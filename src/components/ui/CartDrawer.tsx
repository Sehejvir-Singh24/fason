"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ArrowRight, ShieldCheck, Check, Sparkles } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const discountRate = discountApplied ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;
  const freeShippingThreshold = 200;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoCode.trim().toUpperCase() === "FASON" ||
      promoCode.trim().toUpperCase() === "RELIEF15" ||
      promoCode.trim().toUpperCase() === "KINETIC"
    ) {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-[#07090e] border-l border-white/10 flex flex-col justify-between shadow-2xl relative z-10">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e52328]" />
              <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                FASON® TRANSACTION BAG ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close Shopping Bag"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 border-b border-white/10 text-[11px] sm:text-xs font-mono">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-neutral-300">
                {subtotal >= freeShippingThreshold
                  ? "✓ FREE GLOBAL SECURE SHIPPING UNLOCKED"
                  : `ADD $${(freeShippingThreshold - subtotal).toFixed(2)} FOR FREE SHIPPING`}
              </span>
              <span className="text-[#ccff00] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e52328] via-[#ccff00] to-cyan-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checkout Complete Overlay */}
          {checkoutComplete ? (
            <div className="p-8 flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e52328]/20 border border-[#e52328] flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-[#e52328]" />
              </div>
              <h4 className="text-xl font-black text-white font-sans uppercase mb-2">
                FASON® ORDER CONFIRMED
              </h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-xs mb-6">
                Your order #FSN-9942 has been confirmed. Feel the relief soon!
              </p>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  closeCart();
                }}
                className="px-6 py-3 rounded-xl bg-[#ccff00] text-black font-mono font-bold text-xs"
              >
                RETURN TO STORE
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="p-4 sm:p-6 flex-grow overflow-y-auto space-y-3.5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-4 font-mono">
                      0
                    </div>
                    <p className="font-mono text-xs text-neutral-400 mb-6 uppercase">
                      YOUR BAG IS CURRENTLY EMPTY
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-[#ccff00] hover:text-black font-mono text-xs text-white transition-colors"
                    >
                      EXPLORE RECOVERY SLIDES
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-2xl glass-panel border-white/10 flex gap-3.5 items-center"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-black/50 rounded-xl border border-white/10 shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-white truncate font-sans uppercase">
                          {item.name}
                        </h4>
                        <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-2 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: item.colorway.hex }}
                          />
                          <span>{item.colorway.name.split("/")[0]}</span>
                          <span>|</span>
                          <span>US M {item.size}</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-[#ccff00] mt-1">
                          ${item.price}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-lg px-2 py-0.5 font-mono text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-neutral-400 hover:text-white px-1 py-0.5"
                          >
                            -
                          </button>
                          <span className="text-white min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-neutral-400 hover:text-white px-1 py-0.5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 space-y-3.5">
                  {/* Promo Input */}
                  <form onSubmit={applyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. FASON)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-mono text-xs text-white"
                    >
                      APPLY
                    </button>
                  </form>
                  {discountApplied && (
                    <div className="text-[10px] font-mono text-[#ccff00] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>15% FASON RELIEF DISCOUNT APPLIED</span>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>SUBTOTAL</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-[#ccff00]">
                        <span>DISCOUNT (15%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-400">
                      <span>ESTIMATED TAX</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10 text-white">
                      <span>TOTAL</span>
                      <span className="text-[#ccff00] text-base">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
                  >
                    {isCheckingOut ? (
                      <span>TRANSMITTING ORDER...</span>
                    ) : (
                      <>
                        <span>PROCEED TO CHECKOUT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>FASON® SECURE 256-BIT ENCRYPTION</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
