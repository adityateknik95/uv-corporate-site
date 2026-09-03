"use client";

import { ChevronRight } from "lucide-react";

type MegaMenuProps = {
  open: boolean;
};

export function MegaMenu({ open }: MegaMenuProps) {
  if (!open) return null;

  const items = [
    {
      label: "Automation",
      href: "#what-we-do",
    },
    {
      label: "Technology Services",
      href: "#what-we-do",
    },
    {
      label: "Telecom",
      href: "#what-we-do",
    },
    {
      label: "Education Delivery",
      href: "#what-we-do",
    },
  ];

  return (
    <div className="mega-menu">
      <div className="mega-menu-inner">
        <div>
          <p className="text-label" style={{ marginBottom: "1rem" }}>
            What We Do
          </p>

          <p className="mega-menu-intro">
            Technology capabilities built for real-world needs.
          </p>
        </div>

        <div className="mega-menu-grid">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="mega-menu-item"
            >
              <span>{item.label}</span>
              <ChevronRight size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}