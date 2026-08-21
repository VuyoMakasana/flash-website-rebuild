import PageHeader from '../components/PageHeader';
import LegalBlocks from '../components/LegalBlocks';
import { accessibilityContent } from '../data/legalContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function AccessibilityPage() {
  usePageMeta(
    "Accessibility — Flash | Port Elizabeth, South Africa",
    "Flash's commitment to digital accessibility. Our accessibility statement and how to contact us with accessibility issues."
  );

  return (
    <>
      <PageHeader crumb="Accessibility" eyebrow="Inclusion" title="Accessibility Statement" />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <LegalBlocks blocks={accessibilityContent} />
        </div>
      </section>
    </>
  );
}
