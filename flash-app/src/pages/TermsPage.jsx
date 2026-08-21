import PageHeader from '../components/PageHeader';
import LegalBlocks from '../components/LegalBlocks';
import { termsContent } from '../data/legalContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function TermsPage() {
  usePageMeta(
    "Terms & Conditions — Flash | Port Elizabeth, South Africa",
    "Flash Terms and Conditions — the rules governing use of the Flash platform for customers, sellers, and drivers."
  );

  return (
    <>
      <PageHeader crumb="Terms & Conditions" eyebrow="Legal" title="Terms & Conditions" />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <LegalBlocks blocks={termsContent} />
        </div>
      </section>
    </>
  );
}
