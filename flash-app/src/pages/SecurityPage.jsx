import PageHeader from '../components/PageHeader';
import LegalBlocks from '../components/LegalBlocks';
import { securityContent } from '../data/legalContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SecurityPage() {
  usePageMeta(
    "Security — Flash | Port Elizabeth, South Africa",
    "How Flash protects your data, payments, and account. Our security practices and commitment to your safety."
  );

  return (
    <>
      <PageHeader crumb="Security" eyebrow="Trust & Safety" title="Security at Flash" />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <LegalBlocks blocks={securityContent} />
        </div>
      </section>
    </>
  );
}
