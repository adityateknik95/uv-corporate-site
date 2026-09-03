import { Container } from "@/components/layout/Container";
import { footerColumns } from "@/content/footer";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="footer-logo-mark">TS</span>
              <span>Technology Services</span>
            </a>

            <p>
              Building what comes next through technology,
              operations, automation, telecommunications and
              education delivery.
            </p>
          </div>

          <div className="footer-columns">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.title}>
                <h3>{column.title}</h3>

                <nav aria-label={column.title}>
                  {column.links.map((link) => (
                    <a href={link.href} key={link.label}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Technology Services.
            All rights reserved.
          </p>

          <a href="#home" className="footer-back-top">
            BACK TO TOP ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}