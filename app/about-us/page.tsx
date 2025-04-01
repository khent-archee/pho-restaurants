import { Card, CardContent } from "@/components/ui/card";
import { WEBSITE_NAME } from "../cosntant";

const textStyles = {
  h1: "text-4xl font-bold mb-10 text-center text-primary",
  h2: "text-2xl font-bold mb-2 text-primary-light",
  p: "mb-4 ml-6",
  ul: "list-disc ml-16 mb-4",
};

export const generateMetadata = () => {
  return {
    title: `About Us - ${WEBSITE_NAME}`,
    description:
      "Learn more about our mission, values, and the services we offer.",
    // keywords: ["About Us", "Company Info", "Our Mission"],
    // openGraph: {
    //   title: "About Us - Your Website Name",
    //   description: "Discover more about our company and what we stand for.",
    //   url: "https://yourwebsite.com/about",
    //   siteName: "Your Website Name",
    //   type: "website",
    // },
  };
};

export default function About() {
  return (
    <main className="flex flex-col gap-10 p-5 mt-10 max-w-5xl w-full shadow-sm">
      <Card className="px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>About Us</h1>
          <h2 className={textStyles.h2}>Content to be populated</h2>
        </CardContent>
      </Card>
    </main>
  );
}
