import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { insights } from "@/content/insights";

export function Insights() {
  return (
    <Section id="insights" className="insights">
      <Container>
        <div className="insights-header">
          <div>
            <p className="text-label insights-label">INSIGHTS</p>

            <h2 className="insights-title">
              Ideas that
              <br />
              move industries.
            </h2>
          </div>

          <p className="text-body-lg insights-intro">
            Perspectives, ideas and practical thinking shaped by our
            experience across technology and industry.
          </p>
        </div>

        <div className="insights-grid">
          {insights.map((item) => (
            <a
              href={item.href}
              className="insight-card"
              key={item.id}
            >
              <div className="insight-image">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                />
              </div>

              <div className="insight-content">
                <p className="insight-category">
                  {item.category}
                </p>

                <h3>{item.title}</h3>

                <p className="insight-description">
                  {item.description}
                </p>

                <span className="insight-link">
                  READ MORE ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}