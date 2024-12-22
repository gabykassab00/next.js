import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex-between max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={74} height={29}></Image>
        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.label}
            </Link>
          ))}
        </ul>
      </Link>
    </nav>
  );
};

export default Navbar;
