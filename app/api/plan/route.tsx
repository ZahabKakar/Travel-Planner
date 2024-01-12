import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { city, days } = await request.json();
  // const chatCompletion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content: `
  // 				 As a seasoned travel planner with a focus on city tours, you're set to provide a detailed, non-interactive travel plan. Your expertise will guide the user through each day of their visit, presenting a well-organized itinerary. Here's how the format should look:

  // Day 1:

  // Place to visit 1
  // Place to visit 2
  // Place to visit 3
  // Day 2:

  // Place to visit 1
  // Place to visit 2
  // Place to visit 3
  // ...and so on for each subsequent day. Each day should clearly list the recommended sites and activities using bullet points, ensuring the user has a comprehensive guide to make their trip memorable and seamless. After the itinerary for each day, ensure there's a double line break before starting the next day's plan.
  // 				 `,
  //     },
  //     {
  //       role: "user",
  //       content: `I want to visit ${city} for ${days} days.`,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo",
  // });

  return NextResponse.json({
    plan: "chatCompletion.choices[0].message.content,",
  });
}
