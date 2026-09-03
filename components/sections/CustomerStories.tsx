import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { customerStories } from "@/content/customerStories";

export function CustomerStories() {
  return (
    <Section id="customer-stories" className="customer-stories">
      <Container>
        <div className="customer-stories-header">
          <div>
            <p className="text-label customer-stories-label">
              CUSTOMER STORIES
            </p>

            <h2 className="customer-stories-title">
              Built around
              <br />
              real-world needs.
            </h2>
          </div>

          <p className="text-body-lg customer-stories-intro">
            We work across technology, operations and industry to solve
            practical problems and deliver meaningful outcomes.
          </p>
        </div>

        <div className="customer-stories-grid">
          {customerStories.map((story) => (
            <article
              key={story.id}
              className="customer-story-card"
            >
              <div className="customer-story-image">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="customer-story-content">
                <p className="text-label customer-story-category">
                  {story.category}
                </p>

                <h3>{story.title}</h3>

                <p className="text-body">
                  {story.summary}
                </p>

                <span className="customer-story-link">
                  READ STORY ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}