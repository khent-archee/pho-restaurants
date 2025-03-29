import React from "react";

import { MapPin, Clock, Phone, Globe, DollarSign, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Restaurant } from "@/app/types/reastaurant";
import {
  accessibility,
  dining,
  features,
  getCategoryIcon,
  getRemainingFeatures,
  getTrueFeatures,
  mainCategories,
  others,
} from "@/app/helper/utils";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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

  const categories = Object.keys(restaurantData.about);

  return (
    <main className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          <img
            src={restaurantData.photo}
            alt={restaurantData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-4xl font-bold text-white">
              {restaurantData.name}
            </h1>
            <p className="text-xs text-white mb-2">
              {restaurantData.type}{" "}
              {restaurantData.subtypes && `( ${restaurantData.subtypes} )`}
            </p>
            <p className="text-white/90 text-lg">
              {restaurantData.description}
            </p>
          </div>
        </section>

        {/* Quick Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <address className="not-italic text-sm">
                <span className="text-muted-foreground">State:</span>{" "}
                {restaurantData.us_state}
              </address>
              <address className="not-italic text-sm">
                <span className="text-muted-foreground">City:</span>{" "}
                {restaurantData.city}
              </address>
              <address className="not-italic text-sm">
                <span className="text-muted-foreground">Street:</span>{" "}
                {restaurantData.street}
              </address>
              <address className="not-italic text-sm">
                <span className="text-muted-foreground">Postal:</span>{" "}
                {restaurantData.postal_code}
              </address>
              <address className="not-italic text-sm">
                <span className="text-muted-foreground">Full Address:</span>{" "}
                {restaurantData.full_address}
              </address>
            </CardContent>
          </Card>

          <Card>
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

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <CardTitle>Price Range & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Price Range
                </span>
                <Badge variant="secondary">{restaurantData.range ?? "$"}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${restaurantData.phone}`}
                  className="text-sm hover:underline"
                >
                  {restaurantData.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <a
                  href={restaurantData.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  Visit Website
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Map className="h-4 w-4" />
                <a
                  href={restaurantData.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  View on Map
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Information */}
        <section className="flex flex-col gap-4 mb-8">
          <h2 className="text-xl font-semibold ">Detailed Information</h2>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {mainCategories.map((category) => (
                <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="features">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {features.map((category) => (
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
                                <Badge key={item} variant="secondary">
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

            <TabsContent value="dining">
              <Card>
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
                                <Badge key={item} variant="secondary">
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
              <Card>
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
                                <Badge key={item} variant="secondary">
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
              <Card>
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
                              <Badge key={item} variant="secondary">
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
    state: restaurant.us_state.toString(),
    city: restaurant.city.toString(),
  }));
}
