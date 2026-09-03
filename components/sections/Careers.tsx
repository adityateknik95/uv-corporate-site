import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { careerCards } from "@/content/careers";

export function Careers() {
  return (
    <Section id="careers" className="careers">
      <Container>
        <div className="careers-header">
          <div>
            <p className="text-label careers-label">CAREERS</p>

            <h2 className="careers-title">
              Build what
              <br />
              comes next.
            </h2>
          </div>

          <p className="text-body-lg careers-intro">
            Join a team working across technology, operations and
            delivery to create practical solutions for organisations
            and their people.
          </p>
        </div>

        <div className="careers-grid">
          {careerCards.map((card) => (
            <a
              href={card.href}
              className="career-card"
              key={card.id}
            >
              <div className="career-card-top">
                <span className="career-eyebrow">
                  {card.eyebrow}
                </span>

                <span className="career-arrow">↗</span>
              </div>

              <div className="career-card-content">
                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>

              <span className="career-link">
                EXPLORE ↗
              </span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}