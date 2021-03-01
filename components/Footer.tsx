import React from "react";
import { NextPage } from "next";
import Image from "next/image";

interface FooterProps {}

export const Footer: NextPage<FooterProps> = ({}) => {
  return (
    <div className="footer">
      <div className="top">
          <div className="line" />
        <div className="icon search">
          <Image src="/ig.svg" width={24} height={24} layout="fixed" />
        </div>
        <div className="icon cart">
          <Image src="/fb.svg" width={24} height={24} layout="fixed" />
        </div>
        <div className="icon profile">
          <Image src="/tw.svg" width={24} height={24} layout="fixed" />
        </div>
        <div className="line" />
      </div>
      <div className="bottom">
          <h6>Yolo © 2020. All rights reserved</h6>
      </div>
    </div>
  );
};
