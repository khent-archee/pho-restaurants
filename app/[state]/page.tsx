import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { convertSpaceToHyphen } from "@/lib/utils";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params; // Access the state from params

  return {
    title: `Pho Restaurants in ${state}`,
    description: `Find the Best Pho Restaurant in ${state}`,
  };
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
    <main className="min-h-screen bg-background flex flex-col gap-10 p-5 mt-10">
      <h1 className="text-2xl font-medium">Pho Restaurants by City</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {citiesData.map((city, key) => (
          <div key={key}>
            <Link
              href={`/${state}/${convertSpaceToHyphen(city.toLocaleLowerCase())}/1`}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                <CardTitle>{city}</CardTitle>
              </Card>
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
