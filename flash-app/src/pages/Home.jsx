import Hero from '../sections/Hero';
import WhyFlash from '../sections/WhyFlash';
import HowItWorks from '../sections/HowItWorks';
import Shopping from '../sections/Shopping';
import Delivery from '../sections/Delivery';
import Stores from '../sections/Stores';
import Drivers from '../sections/Drivers';
import Technology from '../sections/Technology';
import PortElizabeth from '../sections/PortElizabeth';
import Founder from '../sections/Founder';
import FinalCTA from '../sections/FinalCTA';
import { usePageMeta, SITE_URL } from '../hooks/usePageMeta';

// Organization structured data, homepage only. The LinkedIn URL is the
// company page linked from the original flashdelivery site's footer.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flash',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand/flash-logo.png`,
  sameAs: ['https://www.linkedin.com/company/flash-delivery-sa'],
  areaServed: [
    { '@type': 'City', name: 'Gqeberha' },
    { '@type': 'AdministrativeArea', name: 'Nelson Mandela Bay' },
  ],
};

export default function Home() {
  usePageMeta(
    'FLASH — Same-Day Clothing Delivery | Port Elizabeth, South Africa',
    'FLASH is a same-day clothing delivery platform launching in Gqeberha, Port Elizabeth. Local sellers, local drivers, delivered today. Coming soon.'
  );

  return (
    <>
      <script
        type="application/ld+json"
        // Static, hand-written object — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <Hero />
      <WhyFlash />
      <HowItWorks />
      <Shopping />
      <Delivery />
      <Stores />
      <Drivers />
      <Technology />
      <PortElizabeth />
      <Founder />
      <FinalCTA />
    </>
  );
}
