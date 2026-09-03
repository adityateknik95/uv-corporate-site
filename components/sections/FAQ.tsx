import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { faqCategories } from "@/content/faq";

export function FAQ() {
  return (
    <Section id="faq" className="faq">
      <Container>
        <div className="faq-header">
          <div>
            <p className="text-label faq-label">FAQ</p>

            <h2 className="faq-title">
              Questions,
              <br />
              answered.
            </h2>
          </div>

          <p className="text-body-lg faq-intro">
            Find answers to common questions about our company,
            capabilities and career opportunities.
          </p>
        </div>

        <div className="faq-content">
          {faqCategories.map((category) => (
            <div className="faq-category" key={category.id}>
              <h3 className="faq-category-label">
                {category.label}
              </h3>

              <div className="faq-items">
                {category.items.map((item) => (
                  <details className="faq-item" key={item.id}>
                    <summary>
                      <span>{item.question}</span>
                      <span className="faq-icon">+</span>
                    </summary>

                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}