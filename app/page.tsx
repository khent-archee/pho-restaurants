import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

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
    <main className="min-h-screen bg-background">
      <div>
        <h1>States</h1>
        {statesData.map((state, key) => (
          <div key={key}>
            <Link href={`/${state.toLowerCase()}`}>
              <p>{state}</p>
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
