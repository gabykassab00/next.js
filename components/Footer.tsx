import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import '../styles/footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <Link href="/" className="footer-logo">
            <Image src="/logo.png" alt="logo" width={74} height={29} />
          </Link>
          <div className="footer-links">
            {FOOTER_LINKS.map((columns) => (
              <Footercolumn title={columns.title}>
                <ul className="footer-column-list">
                  {columns.links.map((link) => (
                    <Link href="/" key={link} className="footer-link">
                      {link}
                    </Link>
                  ))}
                </ul>
              </Footercolumn>
            ))}
            <div className="footer-contact">
              <Footercolumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="footer-contact-link"
                  >
                    <p className="footer-contact-label">{link.label}:</p>
                    <p className="footer-contact-value">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </Footercolumn>
            </div>
            <div className="footer-socials">
              <Footercolumn title={SOCIALS.title}>
                <ul className="footer-socials-list">
                  {SOCIALS.links.map((link) => (
                    <Link href="/" key={link} className="footer-social-link">
                      <Image src={link} alt="logo" width={24} height={24} />
                    </Link>
                  ))}
                </ul>
              </Footercolumn>
            </div>
          </div>
        </div>
        <div className="footer-divider" />
        <p className="footer-bottom-text">
          2025 AIPRO | all rights reserved
        </p>
      </div>
    </footer>
  );
};

type Footercolumnprops = {
  title: string;
  children: React.ReactNode;
};

const Footercolumn = ({ title, children }: Footercolumnprops) => {
  return (
    <div className="footer-column">
      <h4 className="footer-column-title">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
