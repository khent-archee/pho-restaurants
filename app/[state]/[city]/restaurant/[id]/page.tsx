import React from "react";

import { MapPin, Clock, Phone, Globe, DollarSign, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Restaurant } from "@/app/types/reastaurant";
import {
  accessibility,
  dining,
  getCategoryIcon,
  getRemainingFeatures,
  getTrueFeatures,
  mainCategories,
  others,
} from "@/app/helper/utils";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { WEBSITE_NAME } from "@/app/cosntant";
import { convertSpaceToHyphen } from "@/lib/utils";
import Image from "next/image";

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

async function fetchRestaurants(id: string): Promise<Restaurant | null> {
  const supabase = await createClient();
  const { data: restaurantData, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !restaurantData) {
    console.error(error);
    return null;
  }

  return restaurantData;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const restaurantData = await fetchRestaurants(id);

  return {
    title: `${restaurantData?.name} - ${restaurantData?.type} in ${restaurantData?.city}, ${restaurantData?.us_state} - ${WEBSITE_NAME}`,
    description: `${restaurantData?.description}`,
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurantData = await fetchRestaurants(id);

  if (!restaurantData) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4 w-full">
      <article className="w-full flex flex-col justify-center items-center gap-4">
        {/* Hero Section */}
        <section className="relative h-96 w-full overflow-hidden mb-8">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60" />

          <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-4 justify-center items-center p-6 text-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {restaurantData.name}
              </h1>
              <h2 className="text-md text-white mb-2">
                {restaurantData.type} in {restaurantData.city},{" "}
                {restaurantData.us_state}{" "}
              </h2>
            </div>
            <div className="flex flex-row gap-2">
              {restaurantData.site && (
                <Button
                  asChild
                  className="border-primary-dark text-md md:text-lg"
                  size="lg"
                >
                  <a
                    target="_blank"
                    href={restaurantData.site}
                    className="flex gap-2"
                  >
                    View Website
                  </a>
                </Button>
              )}
              {restaurantData.location_link && (
                <Button
                  asChild
                  className="border-primary-dark text-primary bg-white hover:bg-white/80 text-md md:text-lg"
                  size="lg"
                >
                  <a
                    target="_blank"
                    href={restaurantData.location_link}
                    className="flex gap-2"
                  >
                    <MapPin />
                    Get Directions
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center mb-10 max-w-7xl w-full">
          <section className="-mt-[110px] h-28 w-full md:w-5/6 z-20 bg-primary-light flex justify-around items-center rounded-lg">
            <div className="flex flex-col justify-center items-center space-x-2">
              <div className="rounded-full bg-white dark:bg-black p-3 md:p-5">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-white dark:text-black">
                <span className="text-sm">Price Range: &nbsp;</span>
                {restaurantData.range ?? "$"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center space-x-2">
              <div className="rounded-full bg-white dark:bg-black  p-3 md:p-5">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <a
                href={`tel:${restaurantData.phone}`}
                className="text-sm hover:underline text-white dark:text-black"
              >
                Call: {restaurantData.phone}
              </a>
            </div>
          </section>
        </section>

        {/* Quick Info Section */}
        <section className="flex flex-col md:flex-row gap-6 max-w-7xl w-full">
          <div className="flex-1 flex flex-col p-5 gap-4">
            <h2 className="font-bold text-2xl md:text-3xl text-primary">
              About this restaurant
            </h2>
            <p className="text-md md:text-lg">
              {restaurantData.description !== null
                ? restaurantData.description
                : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
            </p>
            <br />
            <p className="md:text-md">
              <span className="text-muted-foreground">Address:&nbsp;</span>
              {restaurantData.full_address}
            </p>
          </div>

          <Card className="md:basis-1/3 overflow-hidden mx-2 md:mx-0">
            <div className="w-full h-2 bg-primary " />
            <CardHeader className="flex flex-row items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Hours Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm">
                {Object.entries(restaurantData.working_hours)
                  .sort(
                    ([dayA], [dayB]) =>
                      daysOrder.indexOf(dayA) - daysOrder.indexOf(dayB)
                  )
                  .map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Information */}
        <section className="flex flex-col gap-4 mb-8 max-w-7xl w-full px-2">
          <h2 className="text-xl font-semibold ">Detailed Information</h2>
          <Card className="p-5">
            <Tabs defaultValue="dining" className="w-full">
              <TabsList className="grid w-full grid-cols-3 !bg-transparent">
                {mainCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    className="data-[state=active]:!border-b-4 data-[state=active]:!border-primary data-[state=active]:!text-primary"
                    value={category.toLowerCase()}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="dining">
                <Card className="border-none">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {dining.map((category) => (
                        <div key={category}>
                          {getTrueFeatures(restaurantData.about[category])
                            .length > 0 && (
                            <>
                              <h3 className="font-semibold flex items-center gap-2 mb-3">
                                {getCategoryIcon(category)} {category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {getTrueFeatures(
                                  restaurantData.about[category]
                                ).map((item) => (
                                  <Badge
                                    key={item}
                                    variant="secondary"
                                    className="p-2 px-4"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessibility">
                <Card className="border-none">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {accessibility.map((category) => (
                        <div key={category}>
                          {getTrueFeatures(restaurantData.about[category])
                            .length > 1 && (
                            <>
                              <h3 className="font-semibold flex items-center gap-2 mb-3">
                                {getCategoryIcon(category)} {category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {getTrueFeatures(
                                  restaurantData.about[category]
                                ).map((item) => (
                                  <Badge
                                    key={item}
                                    variant="secondary"
                                    className="p-2 px-4"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="others">
                <Card className="border-none">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {getRemainingFeatures(restaurantData.about)
                        .filter((item) => !others.includes(item[0]))
                        .map((item) => (
                          <div key={item[0]}>
                            <h3 className="font-semibold flex items-center gap-2 mb-3">
                              {getCategoryIcon(item[0])} {item[0]}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {getTrueFeatures(item[1]).map((item) => (
                                <Badge
                                  key={item}
                                  variant="secondary"
                                  className="p-2 px-4"
                                >
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </section>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select("id, us_state, city");

  if (error || !restaurants) {
    console.error(error);
    return [];
  }

  return restaurants.map((restaurant) => ({
    id: restaurant.id.toString(),
    state: restaurant.us_state.toString().toLowerCase(),
    city: convertSpaceToHyphen(restaurant.city.toString().toLowerCase()),
  }));
}
