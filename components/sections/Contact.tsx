import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { contactContent } from "@/content/contact";

export function Contact() {
  return (
    <Section id="contact" className="contact">
      <Container>
        <div className="contact-content">
          <div>
            <p className="text-label contact-eyebrow">
              {contactContent.eyebrow}
            </p>

            <h2 className="contact-title">
              {contactContent.title}
            </h2>

            <p className="text-body-lg contact-description">
              {contactContent.description}
            </p>
          </div>

          <div className="contact-actions">
            <a
              href={contactContent.primaryAction.href}
              className="contact-primary"
            >
              {contactContent.primaryAction.label}
              <span>↗</span>
            </a>

            <a
              href={contactContent.secondaryAction.href}
              className="contact-secondary"
            >
              {contactContent.secondaryAction.label}
              <span>↗</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}