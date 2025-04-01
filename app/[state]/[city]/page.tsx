import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/app/types/reastaurant";
import { capitalizeFirstLetter, convertHyphenToSpace } from "@/lib/utils";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { dining, getTrueFeatures } from "@/app/helper/utils";
import { Badge } from "@/components/ui/badge";
import { defaultUrl } from "@/app/layout";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;

  return {
    title: `Best Vietnamese Restaurants in ${convertHyphenToSpace(city)}, ${state} | ${defaultUrl}`,
    description: `Find the Best Vietnamese Restaurant in ${convertHyphenToSpace(city)}, ${state}`,
  };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const dataList = await fetchRestaurants(state, convertHyphenToSpace(city));

  if (!dataList) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col gap-6 p-5 mt-4 max-w-7xl w-full">
      <h1 className="text-3xl font-bold">
        Best Vietnamese Restaurants in
        <span className="text-primary">
          {capitalizeFirstLetter(convertHyphenToSpace(city))}
          {","}
        </span>{" "}
        <span className="text-primary">{capitalizeFirstLetter(state)}</span>
      </h1>
      <div className="flex flex-col  gap-6">
        {dataList.map((data, key) => (
          <div key={key}>
            <Card className="p-4 hover:shadow-lg transition-shadow h-full border-2 overflow-hidden">
              <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
              <CardContent className="flex flex-col gap-4 py-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-medium">{data.name}</h2>
                  <p className="text-xs text-muted-foreground">{data.type}</p>
                </div>
                <div className="w-full h-[2px] bg-primary" />
                <div className="flex flex-col gap-3">
                  <p className="text-xs">
                    {data.description ??
                      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
                  </p>
                  <p className="text-xs">
                    Restaurant Location:{" "}
                    <span className="text-muted-foreground">
                      {data.full_address}
                    </span>
                  </p>
                  <p className="text-black text-xs truncate">
                    <span className="text-muted-foreground">Price Range: </span>
                    {data.range}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {dining.map((category) =>
                    getTrueFeatures(data.about[category]).map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="px-4 w-fit"
                      >
                        {item}
                      </Badge>
                    ))
                  )}
                </div>
                <Button
                  size="sm"
                  asChild
                  className="bg-primary-light hover:bg-primary"
                >
                  <a
                    target="_blank"
                    href={data.location_link}
                    className="flex gap-2"
                  >
                    <MapPin className="h-4 w-6" />
                    Get Direction
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`/${state}/${city}/1/${data.id}`}
                    className="flex gap-2"
                  >
                    Check more details
                  </a>
                </Button>
              </CardContent>
            </Card>
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
