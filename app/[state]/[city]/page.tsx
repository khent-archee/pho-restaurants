import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/app/types/reastaurant";

async function fetchRestaurants(
  state: string,
  city: string
): Promise<Restaurant[] | null> {
  const supabase = await createClient();
  const { data: retaurants, error } = await supabase
    .from("restaurants")
    .select()
    .ilike("us_state", `${state}`)
    .ilike("city", `${city}`);

  if (error || !retaurants) {
    console.error(error);
    return null;
  }

  return retaurants;
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const dataList = await fetchRestaurants(state, city);

  if (!dataList) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div>
        <h1>Restaurants</h1>
        {dataList.map((data, key) => (
          <div key={key}>
            <Link href={`/${state}/${city}/${data.id}`}>
              <Card>
                <CardTitle>{data.name}</CardTitle>
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
  const { data: cityState, error } = await supabase
    .from("restaurants")
    .select("us_state, city");

  if (error || !cityState) {
    console.error(error);
    return [];
  }

  const uniqueCityState = Array.from(
    new Set(cityState.map((row) => `${row.us_state}-${row.city}`))
  ).map((combined) => {
    const [state, city] = combined.split("-");
    return { state, city };
  });

  return uniqueCityState.map((data) => ({
    state: data.state,
    city: data.city,
  }));
}
