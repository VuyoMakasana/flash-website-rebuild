import { Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Splash from './components/Splash';
import Layout from './components/Layout';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DriverPartnersPage from './pages/DriverPartnersPage';
import MerchantPartnersPage from './pages/MerchantPartnersPage';
import InvestorsPage from './pages/InvestorsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import SecurityPage from './pages/SecurityPage';
import AccessibilityPage from './pages/AccessibilityPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AudioProvider src="/audio/background.m4a">
      {/* Splash is a decorative overlay (role="presentation", aria-hidden) —
          it never blocks screen-reader or keyboard access to real content.
          Mounted once here, above the router, so it never re-triggers on
          route changes. */}
      <Splash />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/stores" element={<MerchantPartnersPage />} />
          <Route path="/drivers" element={<DriverPartnersPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AudioProvider>
  );
}
