import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import FAQContent from "@/components/FAQ";

async function fetchStates(): Promise<string[] | null> {
  const supabase = await createClient();
  const { data: states, error } = await supabase
    .from("restaurants")
    .select("us_state");

  if (error || !states) {
    console.error(error);
    return null;
  }

  const uniqueStates = Array.from(new Set(states.map((row) => row.us_state)));

  return uniqueStates;
}

export const metadata: Metadata = {
  title: "Pho Restaurants by State",
  description: "Find Pho Restaurants by State.",
};

export default async function RestaurantPage() {
  const statesData = await fetchStates();

  if (!statesData) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-10 p-5 mt-10">
      <h1 className="text-2xl font-medium">Pho Restaurants by State</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {statesData.map((state, key) => (
          <div key={key}>
            <Link href={`/${state.toLowerCase()}`}>
              <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                <CardTitle>{state}</CardTitle>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      <FAQContent />
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
