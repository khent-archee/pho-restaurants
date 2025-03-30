import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";

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

export default async function RestaurantPage() {
  const statesData = await fetchStates();

  if (!statesData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background flex flex-col gap-4 p-5">
      <h1>States</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {statesData.map((state, key) => (
          <div key={key}>
            <Link href={`/${state.toLowerCase()}`}>
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <CardTitle>{state}</CardTitle>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
