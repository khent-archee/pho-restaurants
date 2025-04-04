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
    title: `Contact - ${WEBSITE_NAME}`,
    description:
      "Get in touch with us for inquiries or feedback. Reach out via phone, email.",
  };
};

export default function Contact() {
  return (
    <main className="flex flex-col gap-10 p-5 mt-10 max-w-5xl w-full shadow-sm">
      <Card className="px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>Contact</h1>
          <h2 className={textStyles.h2}>Content to be populated</h2>
        </CardContent>
      </Card>
    </main>
  );
}
