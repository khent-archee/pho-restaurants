import {
  Accessibility,
  Baby,
  Calendar,
  Car,
  Clock,
  Coffee,
  CreditCard,
  Ellipsis,
  Handshake,
  PawPrint,
  Star,
  Toilet,
  Users,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

export const getTrueFeatures = (obj: { [key: string]: boolean } | null) => {
  if (!obj) {
    return [];
  }

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key]) => key);
};

export const getRemainingFeatures = (
  obj: { [key: string]: { [key: string]: boolean } } | null
) => {
  if (!obj) {
    return [];
  }

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map((item) => item);
};

export const mainCategories = ["Features", "Dining", "Accessibility", "Others"];
export const features = [
  "Atmosphere",
  "Highlights",
  "Payments",
  "Pets",
  "Planning",
];
export const dining = [
  "Popular for",
  "Service options",
  "Dining options",
  "Offerings",
];
export const accessibility = [
  "Accessibility",
  "Amenities",
  "Parking",
  "Crowd",
];
export const others = [...features, ...dining, ...accessibility];

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Atmosphere: <Users className="h-4 w-4 text-orange-500" />,
    Parking: <Car className="h-4 w-4 text-orange-500" />,
    Offerings: <Coffee className="h-4 w-4 text-orange-500" />,
    Crowd: <Users className="h-4 w-4 text-orange-500" />,
    Children: <Baby className="h-4 w-4 text-orange-500" />,
    Payments: <CreditCard className="h-4 w-4 text-orange-500" />,
    Amenities: <Toilet className="h-4 w-4 text-orange-500" />,
    Highlights: <Star className="h-4 w-4 text-orange-500" />,
    Pets: <PawPrint className="h-4 w-4 text-orange-500" />,
    Planning: <Calendar className="h-4 w-4 text-orange-500" />,
    Accessibility: <Accessibility className="h-4 w-4 text-orange-500" />,
    "From the business": <Handshake className="h-4 w-4 text-orange-500" />,
    "Dining options": <UtensilsCrossed className="h-4 w-4 text-orange-500" />,
    "Service options": <Utensils className="h-4 w-4 text-orange-500" />,
    "Popular for": <Star className="h-4 w-4 text-orange-500" />,
  };
  return icons[category] || <Ellipsis className="h-4 w-4 text-orange-500" />;
};
