import PageHeader from '../components/PageHeader';
import LegalBlocks from '../components/LegalBlocks';
import { privacyContent } from '../data/legalContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PrivacyPage() {
  usePageMeta(
    "Privacy Policy — Flash | Port Elizabeth, South Africa",
    "Flash's Privacy Policy — how we collect, use, and protect your personal information in compliance with POPIA and South African law."
  );

  return (
    <>
      <PageHeader crumb="Privacy Policy" eyebrow="Legal" title="Privacy Policy" />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <LegalBlocks blocks={privacyContent} />
        </div>
      </section>
    </>
  );
}
