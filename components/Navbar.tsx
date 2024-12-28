"use client"
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { use, useState } from "react";
import Button from "./Button";

const Navbar = ({handleshowlogin}:{handleshowlogin:()=>void}) => {
  const [isMenuOpen,setIsMenuopen] = useState(false);
  const toggleMenu = () => {
    setIsMenuopen(!isMenuOpen);
  }
  return (
    <nav className=" flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={74} height={29}></Image>
      </Link>
      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex lg:flex-row flex-col items-center h-full gap-6 lg:gap-12 mt-4 lg:mt-0`}>
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="lg:flexCenter  hidden">
        <Button
        type="button"
        title="login"
        icon="/user.svg"
        variant="btn_blue"
        onClick={handleshowlogin}
        ></Button>
      </div>

      <Image src="/menu.svg" alt="menu" width={32} height={32} className="inline-block cursor-pointer lg:hidden" onClick={toggleMenu}></Image>
    </nav>
  );
};

export default Navbar;
