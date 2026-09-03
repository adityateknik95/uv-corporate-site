import { companyTimeline } from "@/content/whoWeAre";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RotatingMoon } from "@/components/decor/RotatingMoon";

export default function WhoWeAre() {
  return (
    <Section id="who-we-are" className="who-we-are">
      <RotatingMoon className="who-we-are-moon" />
      <div className="who-we-are-scrim" aria-hidden="true" />

      <Container>
        <div className="who-we-are-intro">
          <div>
            <p className="text-label who-we-are-label">
              Who We Are
            </p>

            <h2 className="who-we-are-title">
              Built through
              <br />
              continuous evolution.
            </h2>
          </div>

          <p className="text-body-lg who-we-are-description">
            Our journey has grown from outsourced operations into a broader
            technology services business spanning robotics, automation,
            telecommunications and education delivery.
          </p>
        </div>

        <div className="timeline">
          {companyTimeline.map((item, index) => (
            <article
              key={item.id}
              className="timeline-item"
            >
              <div className="timeline-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="timeline-year">
                {item.year}
              </div>

              <div className="timeline-content">
                <h3 className="timeline-title">
                  {item.title}
                </h3>

                <p className="timeline-description">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}