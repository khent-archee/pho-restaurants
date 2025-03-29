"use client";

import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Restaurant } from "./types/reastaurant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);

      let query = supabase
        .from("restaurants")
        .select("*")
        .or(`name.ilike.%${searchTerm}%, full_address.ilike.%${searchTerm}%`);

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setRestaurants(data || []);
      }
      setIsLoading(false);
    };

    fetchRestaurants();
  }, [searchTerm]);

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Find Your Next Meal
        </h1>

        <div className="max-w-7xl mx-auto mb-12 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for restaurants, location..."
              className="pl-10 py-6 text-lg max-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <Link
                  href={`/restaurants/${restaurant.id}`}
                  key={restaurant.id}
                  passHref
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    {/* Image Section */}
                    <div className="relative h-20 w-full overflow-hidden rounded-t-xl">
                      <img
                        src={restaurant.photo}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Title Section */}
                    <CardHeader className="p-4">
                      <CardTitle>{restaurant.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <p>No restaurants found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
