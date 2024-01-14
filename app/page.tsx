"use client";

import Main from "@/components/layout/main";
import Sidebar from "@/components/layout/sidebar";
import { useState } from "react";

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className="w-full h-screen flex bg-background2">
      <div
        className={`  ${
          sidebarVisible ? "block lg:block" : "hidden lg:block"
        } transition-transform duration-300 ease-in-out `}
      >
        <Sidebar />
      </div>
      <div
        className={`flex-1 ${
          sidebarVisible ? "hidden lg:block" : "block"
        } sm:ml-0 transition-opacity duration-300 ease-in-out`}
      >
        <Main />
      </div>
      {/* Menu SVG for toggling sidebar visibility */}

      <div className="lg:hidden fixed top-4 right-4 ">
        <svg
          className="w-6 h-6 cursor-pointer text-black"
          onClick={toggleSidebar}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0,0,256,256"
        >
          <g
            fill="#ffffff"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
          >
            <g transform="scale(5.12,5.12)">
              <path d="M0,9v2h50v-2zM0,24v2h50v-2zM0,39v2h50v-2z"></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
