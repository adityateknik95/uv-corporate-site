"use client";

import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">

        {/* BRAND */}
        <a href="#home" className="brand">
          <span className="brand-mark">TS</span>

          <span>Technology Services</span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="main-nav">

          <a href="#who-we-are">
            Who We Are
          </a>

          <button
            type="button"
            onClick={() => setMegaOpen((value) => !value)}
            aria-expanded={megaOpen}
          >
            <span>What We Do</span>

            <ChevronDown
              className={`nav-arrow ${
                megaOpen ? "nav-arrow-open" : ""
              }`}
              size={15}
            />
          </button>

          <a href="#insights">
            Insights
          </a>

          <a href="#careers">
            Careers
          </a>

          <a href="#contact">
            Contact
          </a>

          <button
            type="button"
            className="search-button"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* DESKTOP MEGA MENU */}
      <MegaMenu open={megaOpen} />

      {/* MOBILE MENU */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}