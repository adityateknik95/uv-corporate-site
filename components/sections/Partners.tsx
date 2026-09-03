import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { partners } from "@/content/partners";

const partnerLogos: Record<string, string> = {
  Tata: "/images/logos/tata.png",
  "Jio Communications": "/images/logos/Jio-Logo.wine.png",
  "GreyCells18 Media": "/images/logos/greycells18.png",
};

export function Partners() {
  return (
    <Section id="partners" className="partners">
      <Container>
        <div className="partners-header">
          <div>
            <p className="text-label partners-label">
              PARTNERS
            </p>

            <h2 className="partners-title">
              Built with
              <br />
              strong
              <br />
              partners.
            </h2>
          </div>

          <p className="text-body-lg partners-intro">
            We work alongside organisations that share our
            commitment to practical technology, reliable delivery
            and meaningful outcomes.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.href}
              className="partner-card"
            >
              <div className="partner-logo">
                <img
                  src={
                    partnerLogos[partner.name] ||
                    partner.logo
                  }
                  alt={`${partner.name} logo`}
                />
              </div>

              <div className="partner-divider" />

              <div className="partner-bottom">
                <span className="partner-name">
                  {partner.name}
                </span>

                <span className="partner-arrow">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}