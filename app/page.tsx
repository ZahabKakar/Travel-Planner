"use client";

import Main from "@/components/layout/main";
import Sidebar from "@/components/layout/sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen flex bg-background2">
      <Sidebar />
      <Main />
    </div>
  );
}
