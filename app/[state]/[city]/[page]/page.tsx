import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Restaurant } from "@/app/types/reastaurant";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils"; // utility to convert hyphen back to space
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dining, getTrueFeatures } from "@/app/helper/utils";
import { MapPin } from "lucide-react";
import { defaultUrl } from "@/app/layout";

async function fetchRestaurants(
  state: string,
  city: string
): Promise<Restaurant[] | null> {
  const supabase = await createClient();
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select()
    .ilike("us_state", state)
    .ilike("city", city);

  if (error || !restaurants) {
    console.error(error);
    return null;
  }

  return restaurants;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; page: string }>;
}): Promise<Metadata> {
  const { state, city, page } = await params;

  return {
    title: `Best Vietnamese Restaurants in ${convertHyphenToSpace(city)}, ${state} page ${page} | ${defaultUrl}`,
    description: `Find the Best Vietnamese Restaurant in ${convertHyphenToSpace(city)}, ${state}`,
  };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string; city: string; page: string }>;
}) {
  const { state, city, page } = await params;
  const decodedCity = convertHyphenToSpace(city);

  const dataList = await fetchRestaurants(state, decodedCity);

  if (!dataList) {
    return notFound();
  }

  const chunkSize = 10;
  const start = (parseInt(page) - 1) * chunkSize;
  const end = start + chunkSize;

  const pageData = dataList.slice(0, end);

  return (
    <main className="min-h-screen flex flex-col gap-6 p-5 mt-4 max-w-7xl w-full">
      <h1 className="text-3xl font-bold">
        Best Vietnamese Restaurants in{" "}
        <span className="text-primary">
          {capitalizeFirstLetter(convertHyphenToSpace(city))}
          {","}
        </span>{" "}
        <span className="text-primary">{capitalizeFirstLetter(state)}</span>
      </h1>
      <div className="flex flex-col gap-6">
        {pageData.map((data, key) => (
          <div key={key}>
            <Card className="p-4 hover:shadow-lg transition-shadow h-full border-2 overflow-hidden">
              <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
              <CardContent className="flex flex-col gap-4 py-6">
                <div className="flex flex-col gap-2">
                  <CardTitle>{data.name}</CardTitle>
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

      {pageData.length >= end && (
        <div className="mt-2 flex flex-1">
          <Button variant="link" asChild className="w-full">
            <Link href={`/${state}/${city}/${parseInt(page) + 1}`} passHref>
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

  // Generate pages for each city-state pair with pagination (chunks of 10 items)
  const staticParams = [];

  for (const { state, city } of uniqueCityState) {
    const restaurants = await fetchRestaurants(state, city);

    if (restaurants && restaurants.length > 0) {
      const chunkSize = 10;
      const chunks = Math.ceil(restaurants.length / chunkSize);

      // Generate a page for each chunk of restaurants (pagination)
      for (let page = 1; page <= chunks; page++) {
        staticParams.push({
          state,
          city: convertSpaceToHyphen(city), // Store city name in URL-safe format
          page: page.toString(), // Adding page parameter
        });
      }
    }
  }

  return staticParams;
}
