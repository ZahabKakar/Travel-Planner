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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createPlan = async () => {
    setLoading(true);
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
    const allPlansString = window.localStorage.getItem("plans");
    if (!allPlansString) return;
    let plans = JSON.parse(allPlansString);

    plans.push(plan);
    window.localStorage.setItem("plans", JSON.stringify(plans));
    setLoading(false);
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
              placeholder="Type city name here..."
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
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-100 animate-spin fill-gray-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                          
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                          
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                      
                </svg>
              ) : (
                <SendHorizonal size={30} />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
