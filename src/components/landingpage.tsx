"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link"; // Ensure this is used correctly

import FaRegStar from "public/logos/navbar-logos/FaRegStar.svg";
import IoBookOutline from "public/logos/navbar-logos/IoBookOutline.svg";
import LuTable from "public/logos/navbar-logos/LuTable.svg";
import IoCubeOutline from "public/logos/navbar-logos/IoCubeOutline.svg";

import NavLink from "./nav-link";
import { MenuIcon, X } from "lucide-react";

// Navigation links
const navLinks = [
  { id: "about", label: "About Us", Icon: IoBookOutline, href: "/dashboard" },
  { id: "projects", label: "Projects", Icon: LuTable, href: "/projects" },
  { id: "domains", label: "Domains", Icon: IoCubeOutline, href: "/domains" },
  { id: "alumni", label: "Alumni", Icon: FaRegStar, href: "/alumni" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function handleToggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  return (
    <nav className="top-0 left-0 right-0 bg-black text-white py-4 px-4 sm:px-8 border-b-[1px] border-[#21262D] sticky">
      <div className="mx-auto flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden mr-4 p-[2px] border-[1px] rounded-[6px] border-slate-600"
              onClick={handleToggleNavbar}
            >
              <MenuIcon className="text-slate-200 p-[2px]" />
            </button>

            {/* Logo */}
            <Image src="/git.webp" width={35} height={34} alt="Logo" className="flex-shrink-0" />
            <span className="text-[#C9D1D9] text-center font-[400] text-2xl leading-[30px] font-sans-code">
              csivitu
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="#home" className="text-[#F0F6FC] font-sans-code text-[20px] font-semibold leading-[21px]">
              Home
            </Link>
            <Link href="#faqs" className="text-[#F0F6FC] font-sans-code text-[20px] font-semibold leading-[21px]">
              FAQs
            </Link>
            <Image src="/giticon.webp" width={44} height={45} alt="FAQs Icon" className="flex-shrink-0" />
          </div>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden sm:flex flex-row gap-4 md:gap-8 mt-4 text-center ml-4 text-[#C9D1D9] font-sans-code text-[16px] font-normal leading-[30px]">
          {navLinks.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <NavLink
                id={item.id}
                label={item.label}
                Icon={item.Icon}
                href={item.href}
                isActive={activeLink === item.id}
                onLinkClick={() => setActiveLink(item.id)}
              />
              {item.id === "domains" && (
                <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[rgba(110,118,129,0.4)] text-[#C9D1D9] text-[12px] font-[500] leading-[18px] font-['Noto_Sans'] text-center">
                  4
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`sm:hidden fixed top-0 left-0 w-1/2 h-screen bg-[#151b23] z-50 
          transform transition-transform duration-300 ease-in-out
          border-r-[1px] border-t-[1px] border-b-[1px] rounded-r-3xl border-slate-600
          ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={handleToggleNavbar}
            className="mb-8 p-[2px] border-[1px] rounded-[6px] border-slate-600"
          >
            <X className="text-slate-200 p-[2px]" />
          </button>

          {/* Mobile Links */}
          <nav className="space-y-6 mb-auto">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 mb-2 items-center font-light">
                <Image src="/giticon.webp" width={50} height={50} alt="FAQs Icon" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto" />
                <span>Username</span>
              </div>
              <Link href="#home" className="font-semibold text-lg mb-2">
                Home
              </Link>
              <Link href="#faqs" className="font-semibold text-lg mb-2">
                FAQs
              </Link>
            </div>

            {navLinks.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                Icon={item.Icon}
                href={item.href}
                isActive={activeLink === item.id}
                onLinkClick={() => {
                  setActiveLink(item.id);
                  setIsNavbarOpen(false);
                }}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Background Overlay */}
      {isNavbarOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleToggleNavbar} />
      )}
    </nav>
  );
};

export default Navbar;
