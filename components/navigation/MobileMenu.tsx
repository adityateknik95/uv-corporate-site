"use client";

import Link from "next/link";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="mobile-menu">
      <nav>
        <Link href="#home" onClick={onClose}>
          Home
        </Link>

        <Link href="#who-we-are" onClick={onClose}>
          Who We Are
        </Link>

        <Link href="#what-we-do" onClick={onClose}>
          What We Do
        </Link>

        <Link href="#insights" onClick={onClose}>
          Insights
        </Link>

        <Link href="#careers" onClick={onClose}>
          Careers
        </Link>

        <Link href="#contact" onClick={onClose}>
          Contact
        </Link>
      </nav>
    </div>
  );
}