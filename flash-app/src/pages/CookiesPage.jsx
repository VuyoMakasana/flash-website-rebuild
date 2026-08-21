import PageHeader from '../components/PageHeader';
import LegalBlocks from '../components/LegalBlocks';
import { cookiesContent } from '../data/legalContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CookiesPage() {
  usePageMeta(
    "Cookie Policy — Flash | Port Elizabeth, South Africa",
    "Flash's Cookie Policy — how we use cookies and similar tracking technologies on our website and app."
  );

  return (
    <>
      <PageHeader crumb="Cookie Policy" eyebrow="Legal" title="Cookie Policy" />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <LegalBlocks blocks={cookiesContent} />
        </div>
      </section>
    </>
  );
}
