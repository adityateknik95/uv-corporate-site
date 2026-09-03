import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { capabilities } from "@/content/capabilities";

export default function Capabilities() {
  return (
    <Section id="what-we-do" className="capabilities">
      <Container>
        <div className="capabilities-header">
          <div>
            <p className="text-label capabilities-label">
              WHAT WE DO
            </p>

            <h2 className="capabilities-title">
              Technology
              <br />
              capabilities
              <br />
              built for real-
              <br />
              world needs.
            </h2>
          </div>

          <p className="text-body-lg capabilities-intro">
            We bring together technology, operations and industry
            experience to help organisations move forward.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <a
              key={capability.id}
              href={capability.href}
              className="capability-card"
            >
              <div className="capability-top">
                <span className="capability-number">
                  {capability.number}
                </span>

                <span className="capability-arrow">
                  ↗
                </span>
              </div>

              <div className="capability-bottom">
                <h3>{capability.title}</h3>

                <p className="text-body">
                  {capability.description}
                </p>

                <span className="capability-link">
                  LEARN MORE
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}