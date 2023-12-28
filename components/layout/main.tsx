"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar as CalendaerCom } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarCheck } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function Main({
  noSearch = false,
  data,
}: {
  noSearch?: boolean;
  data?: any;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [city, setCity] = useState("");
  const router = useRouter();

  const createPlan = async () => {
    const planId = nanoid();
    var date1 = date?.from as any;
    var date2 = date?.to as any;
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const { data } = await axios.post("/api/plan", {
      city,
      days: diffDays,
    });

    const plan = {
      id: planId,
      prompt: `${diffDays} days trip to ${city}`,
      answer: data.plan,
    };
    const allPlansString = localStorage.getItem("plans");
    if (!allPlansString) return;
    let plans = JSON.parse(allPlansString);

    plans.push(plan);
    localStorage.setItem("plans", JSON.stringify(plans));
    router.push("/" + planId);
  };

  return (
    <div className="bg-background2 w-full h-full relative">
      <div className=" w-2/3 h-full pt-24  m-auto ">
        <p className="text-gray-400 text-lg">{data ? data.prompt : ""}</p>
        {data?.answer && (
          <div className="bg-background mt-6 p-4 rounded-xl text-white">
            <ScrollArea className="max-h-[80vh]">
              <p
                dangerouslySetInnerHTML={{
                  __html: data?.answer.replace(/\n/g, "<br />"),
                }}
              />
            </ScrollArea>
          </div>
        )}
      </div>
      {!noSearch && (
        <div className=" w-full   absolute bottom-5 right-0 left-0  h-20 ">
          <div className="flex  justify-center items-center bg-[#1f1e24]  w-2/3 m-auto   rounded-full  ">
            <Input
              placeholder="type here ...."
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="bg-[#1f1e24] text-white  h-16 border-none pl-5   rounded-full "
            />
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className="h-12 w-12 mr-3 rounded-full"
                  >
                    <CalendarCheck size={30} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendaerCom
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={() => createPlan()}
              className="h-12 w-12 mr-3 rounded-full"
            >
              <SendHorizonal size={30} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
