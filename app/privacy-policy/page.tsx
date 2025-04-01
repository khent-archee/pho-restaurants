import { Card, CardContent } from "@/components/ui/card";

const textStyles = {
  h1: "text-4xl font-bold mb-10 text-center text-primary",
  h2: "text-2xl font-bold mb-2 text-primary-light",
  p: "mb-4 ml-6",
  ul: "list-disc ml-16 mb-4",
};

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col gap-10 p-5 mt-10 max-w-5xl w-full shadow-sm">
      <Card className="px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>Privacy Policy</h1>
          <p className={textStyles.p}>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website. Please read this privacy policy carefully. If you
            do not agree with the terms of this privacy policy, please do not
            access the site.
          </p>
          <h2 className={textStyles.h2}>1. Information We Collect</h2>
          <p className={textStyles.p}>
            We may collect information about you in a variety of ways. The
            information we may collect on the site includes:
          </p>
          <ul className={textStyles.ul}>
            <li>
              <strong>Personal Data:</strong> Name, email address, phone number,
              and other contact information that you voluntarily provide when
              filling out forms on our website.
            </li>
            <li>
              <strong>Log Data:</strong> Information our servers automatically
              collect when you access the site, such as your IP address, browser
              type, device type, and usage data.
            </li>
            <li>
              <strong>Cookies:</strong> We may use cookies to enhance your
              experience and analyze site traffic.
            </li>
          </ul>

          <h2 className={textStyles.h2}>2. How We Use Your Information</h2>
          <p className={textStyles.p}>
            We use the information we collect for various purposes, including:
          </p>
          <ul className={textStyles.ul}>
            <li>To provide, operate, and maintain our website</li>
            <li>To improve and personalize your experience</li>
            <li>
              To communicate with you, including responding to your inquiries
            </li>
            <li>
              To send you updates and promotional materials (only if you opt-in)
            </li>
            <li>To monitor usage and prevent fraudulent activities</li>
          </ul>

          <h2 className={textStyles.h2}>3. Sharing Your Information</h2>
          <p className={textStyles.p}>
            We do not sell or rent your personal data to third parties. However,
            we may share your information with third parties in the following
            situations:
          </p>
          <ul className={textStyles.ul}>
            <li>
              With service providers who help us operate and maintain the
              website
            </li>
            <li>If required by law or to protect our legal rights</li>
            <li>
              As part of any business transfer in the event of a merger, sale,
              or asset transfer
            </li>
          </ul>

          <h2 className={textStyles.h2}>4. Security of Your Information</h2>
          <p className={textStyles.p}>
            We use administrative, technical, and physical security measures to
            protect your personal information. However, please be aware that no
            data transmission over the internet can be guaranteed to be 100%
            secure.
          </p>

          <h2 className={textStyles.h2}>5. Your Rights</h2>
          <p className={textStyles.p}>
            Depending on your location, you may have the right to request access
            to, correction of, or deletion of your personal data. You can
            contact us to exercise your rights, and we will comply with
            applicable privacy laws.
          </p>

          <h2 className={textStyles.h2}>6. Changes to This Privacy Policy</h2>
          <p className={textStyles.p}>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated date. Please check this
            page periodically for updates.
          </p>

          <h2 className={textStyles.h2}>7. Contact Us</h2>
          <p className={textStyles.p}>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className={textStyles.p}>
            <strong>Email:</strong> support@yourwebsite.com <br />
            <strong>Address:</strong> 1234 Your Street, Your City, Your State,
            Your Country
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
