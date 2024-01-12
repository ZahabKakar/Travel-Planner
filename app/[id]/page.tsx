"use client";

import Sidebar from "@/components/layout/sidebar";
import Main from "@/components/layout/main";
import React, { useEffect, useState } from "react";
import { Plan } from "@/types";

export default function Plan({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const allPlansString = window.localStorage.getItem("plans");
    if (!allPlansString) return;
    const allPlans = JSON.parse(allPlansString);
    const plan = allPlans.filter((item: Plan) => item.id == params.id);
    setPlan(plan[0]);
  }, []);
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <Main data={plan} noSearch={true} />
    </div>
  );
}
