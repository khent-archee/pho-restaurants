import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import FAQContent from "@/components/FAQ";
import Image from "next/image";
import { convertSpaceToHyphen } from "@/lib/utils";
import { WEBSITE_NAME } from "./cosntant";

const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.VERCEL_URL}`
  : "http://localhost:3000";

async function fetchStates(): Promise<{
  states: string[];
  cities: string[];
} | null> {
  const supabase = await createClient();
  const { data: states, error } = await supabase
    .from("restaurants")
    .select("us_state, city");

  if (error || !states) {
    console.error(error);
    return null;
  }

  const uniqueStates = Array.from(new Set(states.map((row) => row.us_state)));
  const uniqueCities = Array.from(
    new Set(states.map((row) => `${row.city}, ${row.us_state}`))
  );

  return {
    states: uniqueStates,
    cities: uniqueCities,
  };
}

export const metadata: Metadata = {
  title: `Best Pho Restaurants Near You - ${WEBSITE_NAME}`,
  description: "Find the Best Pho Restaurants by State.",
};

export default async function RestaurantPage() {
  const data = await fetchStates();

  if (!data) {
    return notFound();
  }

  const getCityState = (val: string): { city: string; state: string } => {
    const parts = val.split(",").map((part) => part.trim());
    return {
      city: parts[0] || "",
      state: parts[1] || "",
    };
  };

  return (
    <main className="flex flex-col items-center gap-10 mb-10 w-full">
      <section className="h-96 w-full">
        <div className="aspect-w-16 aspect-h-9 relative w-full h-full">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Best Pho Restaurant Near You
            </h1>
            <p className="text-white text-md sm:text-lg font-thin md:text-xl max-w-3xl">
              Discover the best Pho restaurants near you, serving authentic
              dishes made with fresh ingredients and traditional recipes. Enjoy
              classic favorites like pho, banh mi, and spring rolls. Find your
              next favorite Pho spot today!
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
          Best Pho Restaurants in Popular Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data.cities.map((city, key) => {
            const { city: cityName, state } = getCityState(city);
            return (
              <div key={key}>
                <Link
                  href={`/${state.toLowerCase()}/${convertSpaceToHyphen(cityName.toLowerCase())}`}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                    <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                    <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                      {city}
                    </h3>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
          Pho Restaurants by State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data.states.map((state, key) => (
            <div key={key}>
              <Link href={`/${state.toLowerCase()}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                  <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                  <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                    {state}
                  </h3>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className=" max-w-7xl w-full p-4">
        <FAQContent />
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
