import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/app/types/reastaurant";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { WEBSITE_NAME } from "@/app/cosntant";

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
    title: `Best Pho in ${capitalizeFirstLetter(convertHyphenToSpace(city))}, ${capitalizeFirstLetter(state)} - ${WEBSITE_NAME}`,
    description: `Find the Best Pho Restaurant in ${convertHyphenToSpace(city)}, ${state}`,
  };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const dataList = await fetchRestaurants(state, convertHyphenToSpace(city));

  const end = 15;

  if (!dataList) {
    return notFound();
  }

  const pageData = dataList.slice(0, end);

  return (
    <main className="min-h-screen flex flex-col gap-6 p-2 md:p-5 mt-4 max-w-7xl w-full">
      <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
        Best Pho in{" "}
        <span className="text-primary">
          {capitalizeFirstLetter(convertHyphenToSpace(city))}
          {","}
        </span>{" "}
        <span className="text-primary">{capitalizeFirstLetter(state)}</span>
      </h1>
      <div className="flex flex-col gap-6">
        {pageData.map((data, key) => (
          <div key={key}>
            <Card className="p-2 md:p-4 hover:shadow-lg transition-shadow h-full border-2 overflow-hidden">
              <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-2 md:-mt-4 -mx-10" />
              <CardContent className="relative flex flex-col gap-4 py-6">
                {key < 10 && (
                  <div className="absolute top-4 right-0 w-6 h-6 rounded-full bg-primary flex justify-center items-center">
                    <p className="text-white">{key + 1}</p>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/${state}/${city}/restaurant/${data.id}`}
                    className="flex gap-2 hover:underline"
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold md:font-medium">
                      {data.name}
                    </h2>
                  </Link>
                  {data.full_address && (
                    <p className="text-xs md:text-sm">
                      Restaurant Address:{" "}
                      <span className="text-muted-foreground">
                        {data.full_address}
                      </span>
                    </p>
                  )}
                </div>
                <div className="w-full h-[2px] bg-primary" />
                <div className="flex flex-col gap-3">
                  <p className="text-md md:text-lg">
                    {data.description ??
                      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
                  </p>
                  {data.range && (
                    <p className="text-xs md:text-sm text-black truncate">
                      <span className="text-muted-foreground">
                        Price Range:{" "}
                      </span>
                      {data.range}{" "}
                    </p>
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
                    Get Directions
                  </a>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-primary-light hover:bg-primary"
                >
                  {data.phone && (
                    <a href={`tel:${data.phone}`} className="flex gap-2">
                      <Phone className="h-4 w-6" />
                      Call: {data.phone}
                    </a>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {dataList.length >= end && (
        <div className="mt-2 flex flex-1">
          <Button variant="link" asChild className="w-full">
            <Link href={`/${state}/${city}/2`} passHref>
              View more businesses
            </Link>
          </Button>
        </div>
      )}
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
    state: data.state.toLowerCase(),
    city: convertSpaceToHyphen(data.city.toLowerCase()),
  }));
}
