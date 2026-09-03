import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { expertiseQuotes } from "@/content/expertise";

export function Expertise() {
  return (
    <Section id="expertise" className="expertise">
      <Container>
        <div className="expertise-header">
          <div>
            <p className="text-label expertise-label">EXPERTISE</p>

            <h2 className="expertise-title">
              Experience that
              <br />
              moves things forward.
            </h2>
          </div>

          <p className="text-body-lg expertise-intro">
            Our experience spans technology, operations and industry-led
            delivery, shaped by the practical needs of organisations and
            their people.
          </p>
        </div>

        <div className="expertise-quotes">
          {expertiseQuotes.map((item) => (
            <article className="expertise-quote" key={item.id}>
              <div className="expertise-quote-mark">“</div>

              <blockquote>{item.quote}</blockquote>

              <div className="expertise-quote-author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}