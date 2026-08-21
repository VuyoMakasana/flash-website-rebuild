import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import InlineForm from '../components/InlineForm';
import { CONTACT_CHANNELS } from '../data/contactContent';
import './ContactPage.css';
import { usePageMeta } from '../hooks/usePageMeta';

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General enquiry' },
  { value: 'customer-support', label: 'Customer support' },
  { value: 'seller-enquiry', label: 'Seller enquiry' },
  { value: 'driver-enquiry', label: 'Driver enquiry' },
  { value: 'investment', label: 'Investment' },
  { value: 'press', label: 'Press' },
];

export default function ContactPage() {
  usePageMeta(
    "Contact Flash — Get in Touch | Port Elizabeth, South Africa",
    "Get in touch with the Flash team for customer support, seller enquiries, driver applications, investor questions, or press requests."
  );

  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="Get in Touch"
        title="We'd love to hear from you."
        lede="Whether you're a customer with a question, a seller wanting to join, or a press enquiry — there's a right channel for you below."
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-channels">
            {CONTACT_CHANNELS.map((channel, i) => (
              <Reveal key={channel.title} delay={i * 70} className="contact-channels__item">
                <h3>{channel.title}</h3>
                <p>{channel.body}</p>
                <a href={`mailto:${channel.email}`}>{channel.email}</a>
              </Reveal>
            ))}

            <Reveal delay={210} className="contact-channels__item">
              <h3>Seller Enquiries</h3>
              <p>Want to sell on Flash? Start your application.</p>
              <a href="/stores">Apply to Sell</a>
            </Reveal>

            <Reveal delay={280} className="contact-channels__item">
              <h3>Driver Applications</h3>
              <p>Ready to drive with Flash? Apply now.</p>
              <a href="/drivers">Apply to Drive</a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Send Us a Message</Reveal>
          <div style={{ marginTop: 'var(--space-10)' }}>
            <InlineForm
              endpoint="contact"
              submitLabel="Send Message"
              successMessage="Thanks — your message has been received. We typically respond within one business day."
              selectField="subject"
              selectLabel="Subject"
              selectOptions={SUBJECT_OPTIONS}
            />
          </div>
        </div>
      </section>
    </>
  );
}
