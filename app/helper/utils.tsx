import { Car, Clock, Coffee, Users, Utensils } from "lucide-react";

export const getTrueFeatures = (obj: { [key: string]: boolean }) => {
  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key]) => key);
};

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Atmosphere: <Users className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    Offerings: <Coffee className="h-4 w-4" />,
    "Service options": <Utensils className="h-4 w-4" />,
    "Popular for": <Clock className="h-4 w-4" />,
  };
  return icons[category] || <Users className="h-4 w-4" />;
};
