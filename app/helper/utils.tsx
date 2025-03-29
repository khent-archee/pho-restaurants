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

export const mainCategories = ["Features", "Dining", "Accessibility", "others"];
export const features = [
  "Popular for",
  "Atmosphere",
  "Amenities",
  "Offerings",
  "Payments",
  "Pets",
  "Planning",
];
export const dining = [
  "Service options",
  "Dining options",
  "Highlights",
  "Offerings",
];
export const accessibility = [
  "Accessibility",
  "Parking",
  "Crowd",
];
export const others = [...features, ...dining, ...accessibility];

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Atmosphere: <Users className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    Offerings: <Coffee className="h-4 w-4" />,
    Crowd: <Users className="h-4 w-4" />,
    Children: <Baby className="h-4 w-4" />,
    Payments: <CreditCard className="h-4 w-4" />,
    Amenities: <Toilet className="h-4 w-4" />,
    Highlights: <Star className="h-4 w-4" />,
    Pets: <PawPrint className="h-4 w-4" />,
    Planning: <Calendar className="h-4 w-4" />,
    Accessibility: <Accessibility className="h-4 w-4" />,
    "From the business": <Handshake className="h-4 w-4" />,
    "Dining options": <UtensilsCrossed className="h-4 w-4" />,
    "Service options": <Utensils className="h-4 w-4" />,
    "Popular for": <Star className="h-4 w-4" />,
  };
  return icons[category] || <Ellipsis className="h-4 w-4" />;
};
