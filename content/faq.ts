import type { FAQCategory } from "./types";

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "general-01",
        question: "What does the company do?",
        answer:
          "The company has evolved from outsourced operations into areas including automation, telecommunications and education delivery.",
      },
      {
        id: "general-02",
        question: "Where does the company operate?",
        answer:
          "The company has supported education delivery through a central government project with coverage across India.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      {
        id: "services-01",
        question: "What capabilities does the company offer?",
        answer:
          "The current focus areas described in the supplied company information include automation, technology services, telecommunications and education delivery.",
      },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    items: [
      {
        id: "careers-01",
        question: "How can I learn about career opportunities?",
        answer:
          "Career information will be added once the client provides the relevant details.",
      },
    ],
  },
];