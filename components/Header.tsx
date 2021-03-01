import React from "react";
import { NextPage } from "next";
import Image from "next/image";

interface HeaderProps {}

export const Header: NextPage<HeaderProps> = ({}) => {
  return (
    <div className="header">
      <div className="navButton icon">
        <Image src="/hamburger.svg" width={48} height={48} layout="fixed" />
      </div>
      <div className="navLinks">
      <h5 className="black">WOMEN</h5>
      <h5 className="black">MEN</h5>
      <h5>KIDS</h5>
      <h5>GIFT</h5>
      </div>
      <div className="icons">
        <div className="icon search">
        <Image src="/search.svg" width={24} height={24} layout="fixed" />
        </div>
        <div className="icon cart">
        <Image src="/cart.svg" width={24} height={24} layout="fixed" />
        </div>
        <div className="icon profile">
        <Image src="/profile.svg" width={24} height={24} layout="fixed" />
        </div>
      </div>
    </div>
  );
};
