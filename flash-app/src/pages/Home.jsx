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
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta(
    'FLASH — Same-Day Clothing Delivery | Port Elizabeth, South Africa',
    'FLASH is a same-day clothing delivery platform launching in Gqeberha, Port Elizabeth. Local sellers, local drivers, delivered today. Coming soon.'
  );

  return (
    <>
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
