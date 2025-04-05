export interface Restaurant {
  id: number;
  name: string;
  site: string;
  subtypes: string;
  type: string;
  phone: string;
  full_address: string;
  street: string;
  city: string;
  postal_code: string;
  us_state: string;
  photo: string;
  working_hours: {
    [key: string]: string;
  };
  about: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
  range: string;
  description: string;
  location_link: string;
  location_review_link: string,
  booking_appointment_link: string,
  rating: number,
  reviews: number,
  broth: boolean,
  chicken_pho: boolean,
  vegan_pho: boolean,
  brisket: boolean,
  oxtail: boolean,
  banh_mi: boolean,
  egg_rolls: boolean,
  spring_rolls: boolean,
  rice_vermicelli: boolean,
  boba: boolean,
  vietnamese_coffee: boolean,
  portion_sizes: boolean,
  spicy_options: boolean,
  prices: boolean,
  parking: boolean,

}