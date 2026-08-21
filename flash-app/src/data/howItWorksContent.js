// Extracted from how-it-works.html — no city references to correct here.

export const HOW_IT_WORKS_TRACKS = [
  {
    id: 'customers',
    label: 'For Customers',
    tagline: 'Shop. Order. Track. Receive.',
    cta: { label: 'Download Flash', href: '/#waitlist' },
    steps: [
      { title: 'Download the App', body: 'Get Flash on iOS or Android. Create your account in under two minutes \u2014 no credit card required to browse.' },
      { title: 'Browse Local Sellers', body: 'Discover curated clothing from verified local sellers in your city. Filter by style, size, and estimated delivery window.' },
      { title: 'Pay Securely', body: 'Check out with card or EFT. Your payment is held safely until the delivery is confirmed \u2014 you\u2019re protected throughout.' },
      { title: 'Track in Real Time', body: 'Watch your driver on the live map from pickup to your door. You\u2019ll know exactly when your order arrives.' },
    ],
  },
  {
    id: 'sellers',
    label: 'For Sellers',
    tagline: 'List. Receive. Hand over. Get paid.',
    cta: { label: 'Become a Seller', href: '/stores' },
    steps: [
      { title: 'Apply & List', body: 'Apply to become a Flash seller. Once approved, list your clothing items with photos, descriptions, and same-day availability.' },
      { title: 'Receive Order Alerts', body: 'The moment a customer orders, you\u2019re notified instantly via the seller dashboard. No manual checking required.' },
      { title: 'Pack & Hand Over', body: 'Pack the item and wait for the Flash driver to collect from your location. No drop-offs, no scheduling \u2014 the driver comes to you.' },
      { title: 'Get Paid', body: 'Payment is released to your seller wallet once delivery is confirmed. Withdraw to your bank account at any time.' },
    ],
  },
  {
    id: 'drivers',
    label: 'For Drivers',
    tagline: 'Accept. Collect. Deliver. Earn.',
    cta: { label: 'Start Driving', href: '/drivers' },
    steps: [
      { title: 'Sign Up & Verify', body: 'Register as a Flash driver, submit your licence and vehicle details, and pass a quick background check.' },
      { title: 'Go Online', body: 'Open the driver app and set yourself as available. Orders in your area are matched to you automatically in real time.' },
      { title: 'Collect & Deliver', body: 'Navigate to the seller\u2019s address, collect the parcel, and deliver it to the customer. The app guides you every step of the way.' },
      { title: 'Confirm & Earn', body: 'Confirm delivery in the app. Your earnings are credited instantly to your Flash wallet \u2014 withdraw whenever you like.' },
    ],
  },
];
