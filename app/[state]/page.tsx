import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

async function fetchCities(state: string): Promise<string[] | null> {
  const supabase = await createClient();
  const { data: cities, error } = await supabase
    .from("restaurants")
    .select("city")
    .filter("us_state", "ilike", state);

  if (error || !cities) {
    console.error(error);
    return null;
  }

  const uniqueCities = Array.from(new Set(cities.map((row) => row.city)));

  return uniqueCities;
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const citiesData = await fetchCities(state);

  if (!citiesData) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div>
        <h1>Cities</h1>
        {citiesData.map((city, key) => (
          <div key={key}>
            <Link href={`/${state}/${city.toLocaleLowerCase()}`}>
              <p>{city}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: states, error } = await supabase
    .from("restaurants")
    .select("us_state");

  if (error || !states) {
    console.error(error);
    return [];
  }

  const uniqueStates = Array.from(
    new Set(states.map((row) => row.us_state.toLowerCase()))
  );

  console.log(uniqueStates);

  return uniqueStates.map((state) => ({
    state: state,
  }));
}
