import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    cartSubtotal,
    formatPrice,
    voucherCode,
    setVoucherCode,
    isVoucherApplied,
    applyVoucher,
    showToast,
    setCurrentPage
  } = useStore();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [giftWrapEnabled, setGiftWrapEnabled] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // Address form fields with realistic defaults matching Screen 3
  const [formData, setFormData] = useState({
    email: 'julian.vance@bloomsbury-society.org',
    firstName: 'Julian',
    lastName: 'Vance',
    street: '48 Great Russell Street',
    suite: 'Apt 2',
    city: 'London',
    postalCode: 'WC1B 3BA',
    territory: 'UK'
  });

  // Calculate free shipping progress (Target: $96 for Worldwide Courier)
  const courierThreshold = 96.0;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / courierThreshold) * 100));
  const remainingForFree = Math.max(0, courierThreshold - cartSubtotal);

  // Estimated Tax: 8%
  const estimatedTax = cartSubtotal * 0.08;
  const totalAmount = cartSubtotal + estimatedTax;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    applyVoucher(voucherCode);
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      showToast('Your bag is currently empty.');
      return;
    }
    setOrderComplete(true);
    showToast('Order #98-7402 registered for Bloomsbury dispatch.');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pb-12">
        {/* Step Tracker (Breadcrumb Rhythm) */}
        <div className="py-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f4f2fd] px-6 border border-[#eeedf7]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#9d4229] font-bold">
              Collation Desk
            </span>
            <span className="text-[#77767b] text-sm">/</span>
            <span className="font-headline text-xl text-[#1a1b22]">
              Order Registry #98-7402
            </span>
          </div>

          {/* Progress Track Steps */}
          <nav aria-label="Checkout Progress" className="flex items-center gap-4 text-xs">
            <div
              onClick={() => setActiveStep(1)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-[#000000] text-white font-bold text-[10px]">
                1
              </span>
              <span
                className={`uppercase tracking-wider font-semibold ${
                  activeStep === 1 ? 'text-[#1a1b22]' : 'text-[#77767b]'
                }`}
              >
                Bag Review
              </span>
            </div>
            <div className="w-8 h-[2px] bg-[#9d4229]"></div>
            <div
              onClick={() => setActiveStep(2)}
              className="flex items-center gap-2 cursor-pointer text-[#47464b]"
            >
              <span
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                  activeStep === 2
                    ? 'bg-[#000000] text-white'
                    : 'bg-[#e8e7f1] text-[#47464b]'
                }`}
              >
                2
              </span>
              <span className="uppercase tracking-wider font-semibold">Shipping</span>
            </div>
            <div className="w-8 h-[2px] bg-[#e8e7f1]"></div>
            <div
              onClick={() => setActiveStep(3)}
              className="flex items-center gap-2 cursor-pointer text-[#77767b]"
            >
              <span
                className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                  activeStep === 3
                    ? 'bg-[#000000] text-white'
                    : 'bg-[#e8e7f1] text-[#77767b]'
                }`}
              >
                3
              </span>
              <span className="uppercase tracking-wider font-semibold">Payment</span>
            </div>
          </nav>
        </div>

        {/* Main Dual Layout: 8 col / 4 col (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Bag Contents & Details (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Free Shipping Target Visualizer */}
            <div className="p-6 bg-[#f4f2fd] relative overflow-hidden border border-[#eeedf7]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9d4229] text-[20px]">
                    local_shipping
                  </span>
                  <p className="text-sm text-[#1a1b22]">
                    {remainingForFree > 0 ? (
                      <>
                        Add{' '}
                        <span className="font-bold text-[#9d4229]">
                          {formatPrice(remainingForFree)}
                        </span>{' '}
                        more to unlock{' '}
                        <span className="font-medium">
                          Complimentary International Archival Courier
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-[#1a1b22]">
                        Complimentary Worldwide Courier Unlocked!
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-widest text-[#47464b] font-bold">
                  {progressPercent}% MET ({formatPrice(cartSubtotal)} / {formatPrice(courierThreshold)})
                </span>
              </div>

              {/* Animated Fill Meter */}
              <div className="w-full h-1.5 bg-[#e8e7f1] overflow-hidden">
                <div
                  className="h-full bg-[#9d4229] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-[#77767b] font-medium">
                <span>Domestic Free ($50) ✓</span>
                <span>Worldwide Courier ($96)</span>
              </div>
            </div>

            {/* Bag Line Items List */}
            <section aria-labelledby="curated-items-title" className="flex flex-col">
              <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-[#eeedf7]">
                <h2 className="font-headline text-2xl text-[#1a1b22]" id="curated-items-title">
                  Curated Volumes in Bag
                </h2>
                <span className="text-[11px] uppercase tracking-wider text-[#77767b] font-semibold">
                  {cart.length} First Print Editions
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="p-12 text-center bg-[#f4f2fd] border border-[#eeedf7]">
                  <span className="material-symbols-outlined text-[#77767b] text-[36px] mb-2">
                    auto_stories
                  </span>
                  <h3 className="font-headline text-xl text-[#1a1b22]">Your library bag is empty</h3>
                  <p className="text-xs text-[#47464b] mt-1 mb-4">
                    Explore our seasonal compendium or rare monograph catalog.
                  </p>
                  <button
                    onClick={() => setCurrentPage('catalog')}
                    className="px-6 py-2.5 bg-[#000000] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <article
                      key={item.bookId}
                      className="p-6 bg-[#f4f2fd] transition-colors duration-150 flex flex-col sm:flex-row gap-6 items-start border border-[#eeedf7]"
                    >
                      <div className="w-28 sm:w-32 aspect-[3/4] flex-shrink-0 bg-[#e8e7f1] relative shadow-sm overflow-hidden">
                        <img
                          alt={item.title}
                          src={item.coverImage}
                          className="w-full h-full object-cover"
                        />
                        {item.formatTag && (
                          <span
                            className={`absolute top-2 left-2 text-[9px] uppercase px-1.5 py-0.5 tracking-wider font-bold shadow-xs ${
                              item.formatTag === 'Hardcover'
                                ? 'bg-[#9d4229] text-white'
                                : 'bg-[#000000] text-white'
                            }`}
                          >
                            {item.formatTag}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between h-full w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#9d4229] font-bold block mb-1">
                              {item.subCategory || 'Monograph & Poetics'}
                            </span>
                            <h3 className="font-headline text-xl text-[#1a1b22]">{item.title}</h3>
                            <p className="text-xs text-[#47464b]">
                              {item.author} · {item.publisher}, {item.year}
                            </p>
                            <p className="text-[10px] text-[#77767b] uppercase mt-1">
                              {item.format}
                            </p>
                          </div>
                          <div className="text-left sm:text-right mt-2 sm:mt-0">
                            <p className="text-lg font-semibold text-[#1a1b22] tabular-nums">
                              {formatPrice(item.price)}
                            </p>
                            <p className="text-[10px] text-[#77767b]">USD / item</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-3 bg-white px-3 py-2 border border-[#eeedf7]">
                          {/* Stepper */}
                          <div className="flex items-center bg-[#e8e7f1]">
                            {/* GITHUB_ISSUE #43: [Bug] Decrement stepper button increments cart item quantity instead of decrementing */}
                            <button
                              onClick={() => updateQuantity(item.bookId, 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#1a1b22] hover:bg-[#e3e1ec] transition-colors text-sm font-bold"
                              type="button"
                            >
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-[#1a1b22] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.bookId, 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#1a1b22] hover:bg-[#e3e1ec] transition-colors text-sm font-bold"
                              type="button"
                            >
                              +
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4 text-xs">
                            <button
                              onClick={() => toggleWishlist(item.bookId)}
                              className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#47464b] hover:text-[#000000] transition-colors font-medium"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                bookmark_border
                              </span>
                              <span>Move to Wishlist</span>
                            </button>
                            <button
                              onClick={() => removeFromCart(item.bookId)}
                              className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#47464b] hover:text-[#ba1a1a] transition-colors font-medium"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Archival Gift Presentation Accordion / Checkbox */}
            <section className="p-6 bg-[#eeedf7] border border-[#e3e1ec]">
              <div className="flex items-start gap-3">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={giftWrapEnabled}
                    onChange={(e) => setGiftWrapEnabled(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-none accent-[#000000] cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[#1a1b22] block">
                      Complimentary Archival Slipcase & Presentation Gift Wrapping
                    </span>
                    <p className="text-xs text-[#47464b] mt-1 leading-relaxed">
                      Encased in acid-free unbleached cotton wrap, sealed with hot wax seal and accompanied by a letterpress card printed on Somerset 300gsm paper.
                    </p>
                  </div>
                </label>
              </div>

              {/* Letterpress Note Drawer */}
              {giftWrapEnabled && (
                <div className="mt-4 pl-7 pt-2 animate-in fade-in">
                  <label
                    htmlFor="gift-note-text"
                    className="block text-[10px] uppercase tracking-wider text-[#1a1b22] font-bold mb-1"
                  >
                    Personalized Letterpress Message (Max 140 chars)
                  </label>
                  <textarea
                    id="gift-note-text"
                    rows={3}
                    maxLength={140}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g. For Arthur, on the quiet turning of forty years. With profound admiration."
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] placeholder:text-[#77767b] focus:outline-none focus:bg-[#fbf8ff] shadow-xs resize-none border border-[#c8c5cb]"
                  />
                  <div className="flex justify-between items-center text-[10px] text-[#77767b] mt-1">
                    <span>Somerset Deckled Card Included</span>
                    <span>{giftNote.length} / 140</span>
                  </div>
                </div>
              )}
            </section>

            {/* Express One-Click Dispatch Section */}
            <section className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#77767b] font-bold">
                  Express Digital Dispatch
                </span>
                <div className="flex-1 h-[1px] bg-[#e8e7f1]"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Apple Pay */}
                <button
                  onClick={handleProceedToPayment}
                  className="h-12 bg-[#000000] text-white flex items-center justify-center gap-2 hover:bg-[#1b1b1e] transition-colors shadow-xs"
                  type="button"
                >
                  <span className="text-[10px] uppercase tracking-widest text-[#a8a29e]">
                    Pay With
                  </span>
                  <span className="text-sm font-bold text-white flex items-center"> Pay</span>
                </button>

                {/* Google Pay */}
                <button
                  onClick={handleProceedToPayment}
                  className="h-12 bg-[#eeedf7] text-[#1a1b22] flex items-center justify-center gap-1.5 hover:bg-[#e8e7f1] transition-colors shadow-xs font-bold text-sm tracking-tight border border-[#c8c5cb]"
                  type="button"
                >
                  <span>G Pay</span>
                </button>

                {/* Shop Pay */}
                <button
                  onClick={handleProceedToPayment}
                  className="h-12 bg-[#5A31F4] text-white flex items-center justify-center gap-1 hover:opacity-95 transition-opacity shadow-xs text-sm font-bold"
                  type="button"
                >
                  <span className="italic font-bold">shop</span>
                  <span>Pay</span>
                </button>
              </div>
            </section>

            {/* Shipping & Consignee Registry Details */}
            <section
              aria-labelledby="consignee-title"
              className="p-6 bg-[#f4f2fd] flex flex-col gap-4 border border-[#eeedf7]"
            >
              <div className="flex items-baseline justify-between border-b border-[#eeedf7] pb-2">
                <h2 className="font-headline text-2xl text-[#1a1b22]" id="consignee-title">
                  Consignee & Courier Address
                </h2>
                <span className="text-[10px] uppercase tracking-wider text-[#77767b] font-semibold">
                  Step 2 of 3
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contact-email"
                  className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                >
                  Contact Email for Archival Tracking
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                />
              </div>

              {/* Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="first-name"
                    className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="last-name"
                    className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="delivery-address"
                  className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                >
                  Street Delivery Address
                </label>
                <input
                  id="delivery-address"
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                />
              </div>

              {/* Suite, City, Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="apt-suite"
                    className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                  >
                    Suite / Flat
                  </label>
                  <input
                    id="apt-suite"
                    type="text"
                    value={formData.suite}
                    onChange={(e) => setFormData({ ...formData, suite: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="city"
                    className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="postcode"
                    className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                  >
                    Postal / ZIP
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7]"
                  />
                </div>
              </div>

              {/* Country Selection */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="country-select"
                  className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold"
                >
                  Destination Territory
                </label>
                <div className="relative">
                  <select
                    id="country-select"
                    value={formData.territory}
                    onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                    className="w-full bg-white p-3 text-xs text-[#1a1b22] focus:outline-none border border-[#eeedf7] appearance-none pr-10 cursor-pointer"
                  >
                    <option value="UK">United Kingdom (Domestic London Hub)</option>
                    <option value="US">United States (Standard Archival Duty Paid)</option>
                    <option value="DE">Germany (European Free Circulation)</option>
                    <option value="FR">France (Paris Courier Desk)</option>
                    <option value="JP">Japan (Tokyo Handled Air Express)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#47464b] text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Save Preferences Checkbox */}
              <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded-none accent-[#000000] cursor-pointer"
                />
                <span className="text-xs text-[#47464b]">
                  Store profile details in encrypted vault for future Folio catalog releases
                </span>
              </label>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Direct Transaction (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 flex flex-col gap-6">
            {/* Summary Card */}
            <div className="p-6 bg-[#f4f2fd] shadow-md flex flex-col gap-4 border border-[#eeedf7]">
              <div className="flex items-baseline justify-between pb-2 border-b border-[#eeedf7]">
                <h2 className="font-headline text-2xl text-[#1a1b22]">Order Summary</h2>
                <span className="text-[10px] uppercase tracking-wider text-[#9d4229] font-bold">
                  Folio Direct
                </span>
              </div>

              {/* Line Breakdown */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#47464b]">Selected Volumes ({cart.length})</span>
                  <span className="text-[#1a1b22] font-semibold tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[#47464b]">Courier Delivery</span>
                    <span
                      className="material-symbols-outlined text-[14px] text-[#77767b]"
                      title="Insured tracked archival dispatch"
                    >
                      info
                    </span>
                  </div>
                  <span className="text-[#9d4229] font-semibold uppercase text-xs">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#47464b]">Museum Slipcase Wrapping</span>
                  <span className="text-[#1a1b22] font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#47464b]">Estimated VAT / Local Tax</span>
                  <span className="text-[#1a1b22] font-semibold tabular-nums">
                    {formatPrice(estimatedTax)}
                  </span>
                </div>
              </div>

              {/* Promo Code Input Group */}
              <div className="pt-2 border-t border-[#eeedf7]">
                <label
                  htmlFor="promo-input"
                  className="block text-[10px] uppercase tracking-wider text-[#1a1b22] font-bold mb-1"
                >
                  Voucher or Guild Code
                </label>
                <form onSubmit={handleApplyVoucher} className="flex">
                  <input
                    id="promo-input"
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="FOLIO25"
                    className="flex-1 bg-white px-3 py-2 text-xs text-[#1a1b22] uppercase tracking-wider placeholder:text-[#77767b] focus:outline-none shadow-xs border border-[#eeedf7]"
                  />
                  <button
                    type="submit"
                    className="bg-[#000000] hover:bg-[#1b1b1e] text-white px-4 py-2 text-[11px] uppercase tracking-wider font-semibold transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {isVoucherApplied && (
                  <p className="text-[11px] text-[#9d4229] mt-1.5 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Guild Code FOLIO25 active ($0.00 Delivery Fee Applied)</span>
                  </p>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 bg-white p-4 mt-1 border border-[#eeedf7]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-headline text-xl text-[#1a1b22]">Order Total</span>
                  <div className="text-right">
                    <span className="font-headline text-3xl text-[#1a1b22] font-normal tabular-nums">
                      {formatPrice(totalAmount)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#77767b] block font-semibold">
                      USD Net Total
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#47464b] leading-relaxed">
                  All customs duties and climate offset surcharges prepaid.
                </p>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={handleProceedToPayment}
                className="w-full h-12 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[12px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-md mt-1"
                type="button"
              >
                <span>Proceed to Secure Payment</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <p className="text-center text-[10px] text-[#77767b] uppercase tracking-wider">
                Safe 256-Bit SSL TLS Handshake Guaranteed
              </p>
            </div>

            {/* Trust Pledges & Institutional Credentials */}
            <div className="p-6 bg-[#eeedf7] flex flex-col gap-4 border border-[#e3e1ec]">
              <h3 className="text-[10px] uppercase tracking-widest text-[#1a1b22] font-bold">
                The Folio Custody Pledge
              </h3>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                  verified_user
                </span>
                <div>
                  <p className="text-xs text-[#1a1b22] font-semibold">
                    Archival Condition Guarantee
                  </p>
                  <p className="text-[11px] text-[#47464b] leading-relaxed">
                    Every volume leaves our London bindery vacuum-sealed in micro-climate barrier sleeves.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                  sync_alt
                </span>
                <div>
                  <p className="text-xs text-[#1a1b22] font-semibold">
                    30-Day Unconditional Return
                  </p>
                  <p className="text-[11px] text-[#47464b] leading-relaxed">
                    Prepaid return courier label included in every folio carton. Return within 30 days of arrival.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                  nature_people
                </span>
                <div>
                  <p className="text-xs text-[#1a1b22] font-semibold">
                    100% Carbon-Neutral Transit
                  </p>
                  <p className="text-[11px] text-[#47464b] leading-relaxed">
                    Offset certified through Bloomsbury Ancient Reforestation Trust (BART).
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Stamp Marker */}
            <div className="p-4 bg-[#e8e7f1] flex items-center justify-between border border-[#e3e1ec]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#9d4229] text-white flex items-center justify-center font-headline text-lg">
                  F
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-[#1a1b22]">
                    Press Seal #8812
                  </span>
                  <span className="text-xs text-[#47464b]">Hand-inspected in Bloomsbury</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#77767b] text-[20px]">
                workspace_premium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Order Confirmation Dialog */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in duration-200 border border-[#eeedf7]">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#9d4229]">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d4229] font-bold block">
                Collation Dossier Registered
              </span>
              <h3 className="font-headline text-3xl text-[#1a1b22]">Order #98-7402 Dispatched</h3>
              <p className="text-xs text-[#47464b] leading-relaxed max-w-sm mx-auto">
                Your archival editions have entered precision wrapping at our London bindery. Tracking credentials dispatched to <span className="font-semibold text-[#1a1b22]">{formData.email}</span>.
              </p>

              <div className="p-4 bg-[#f4f2fd] text-left text-xs space-y-1.5 border border-[#eeedf7] my-4">
                <div className="flex justify-between">
                  <span className="text-[#77767b]">Consignee:</span>
                  <span className="font-medium text-[#1a1b22]">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77767b]">Destination:</span>
                  <span className="font-medium text-[#1a1b22]">{formData.street}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77767b]">Volumes:</span>
                  <span className="font-medium text-[#1a1b22]">{cart.length} First Pressings</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-[#eeedf7] pt-1">
                  <span>Net Settled:</span>
                  <span className="text-[#9d4229]">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 bg-[#000000] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Return to Library Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
