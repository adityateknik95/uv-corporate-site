import type { NavItem } from "./types";

export const utilityNavigation = {
  searchLabel: "Search",
  contactLabel: "Contact",
  contactHref: "#contact",
  languageLabel: "EN",
};

export const primaryNavigation: NavItem[] = [
  {
    label: "Who We Are",
    href: "#who-we-are",
  },
  {
    label: "What We Do",
    children: [
      {
        label: "Automation",
        href: "#how-we-help",
      },
      {
        label: "Technology Services",
        href: "#how-we-help",
      },
      {
        label: "Telecom",
        href: "#how-we-help",
      },
      {
        label: "Education Delivery",
        href: "#how-we-help",
      },
    ],
  },
  {
    label: "Insights",
    href: "#insights",
  },
  {
    label: "Careers",
    href: "#careers",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];