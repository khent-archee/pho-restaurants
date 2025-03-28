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
}