import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import FAQContent from "@/components/FAQ";
import { defaultUrl } from "./layout";
import Image from "next/image";

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
  title: `Best Vietnamese Restaurants by State | ${defaultUrl}`,
  description: "Find the Best Vietnamese Restaurants by State.",
};

export default async function RestaurantPage() {
  const statesData = await fetchStates();

  if (!statesData) {
    return notFound();
  }

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
              Best Vietnamese Restaurant Near You
            </h1>
            <h3 className="text-white text-lg font-thin md:text-xl max-w-3xl">
              Discover the best Vietnamese restaurants near you, serving
              authentic dishes made with fresh ingredients and traditional
              recipes. Enjoy classic favorites like pho, banh mi, and spring
              rolls. Find your next favorite Vietnamese spot today!
            </h3>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 max-w-7xl w-full">
        <h2 className="text-3xl font-bold">Vietnamese Restaurants by State</h2>
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
      </section>
      <section className=" max-w-7xl w-full">
        <FAQContent />
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
