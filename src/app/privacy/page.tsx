import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Hydra Pool Services. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-light">
          Last updated: March 28, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate">
          {/* ── Introduction ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">1. Introduction</h2>
            <p className="mt-3">
              Hydra Pool Services (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is a pool maintenance and repair company based
              in the Dallas-Fort Worth area of Texas. We are committed to
              protecting the privacy of our customers and website visitors. This
              Privacy Policy explains how we collect, use, share, and protect
              your personal information when you visit{" "}
              <Link
                href="/"
                className="font-medium text-hydra-600 hover:underline"
              >
                www.hydrapoolservices.com
              </Link>{" "}
              or use our services.
            </p>
          </section>

          {/* ── Information We Collect ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              2. Information We Collect
            </h2>

            <h3 className="mt-4 font-semibold text-navy">
              2.1 Information You Provide
            </h3>
            <p className="mt-2">
              When you interact with our website or services, you may provide us
              with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Contact information:</strong> name, email address, phone
                number, and mailing address submitted through our contact forms,
                quote request tool, or inquiry forms.
              </li>
              <li>
                <strong>Service information:</strong> pool size, pool type,
                service preferences, property address, and scheduling details.
              </li>
              <li>
                <strong>Payment information:</strong> billing address and payment
                card details submitted through our{" "}
                <Link
                  href="/payments"
                  className="font-medium text-hydra-600 hover:underline"
                >
                  payments page
                </Link>
                . Card details are processed and stored securely by Stripe, our
                third-party payment processor. We do not store your full credit
                card number on our servers.
              </li>
              <li>
                <strong>Communications:</strong> messages, emails, or phone call
                details when you contact us for support or service inquiries.
              </li>
            </ul>

            <h3 className="mt-4 font-semibold text-navy">
              2.2 Information Collected Automatically
            </h3>
            <p className="mt-2">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Browser type, operating system, and device information.
              </li>
              <li>IP address and approximate geographic location.</li>
              <li>
                Pages visited, time spent on pages, and referring URLs.
              </li>
              <li>
                Cookies and similar tracking technologies used for website
                analytics and functionality.
              </li>
            </ul>
          </section>

          {/* ── How We Use Your Information ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              3. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use the information we collect to:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Provide, schedule, and manage pool maintenance, repair, bead
                blasting, chemical service, and pool school services.
              </li>
              <li>
                Respond to your inquiries and send service quotes.
              </li>
              <li>Process payments and manage billing.</li>
              <li>
                Send service-related communications such as appointment
                confirmations, visit reports, and billing notices.
              </li>
              <li>
                Improve our website, services, and customer experience.
              </li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3 font-medium">
              We will never send you promotional content, marketing messages, or
              unsolicited communications via email or text. Your information is
              only used to deliver the services you requested.
            </p>
          </section>

          {/* ── Information Sharing ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              4. Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information. We may
              share information with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Stripe:</strong> our payment processor, for secure
                payment handling.
              </li>
              <li>
                <strong>Formspree:</strong> for processing contact form
                submissions.
              </li>
              <li>
                <strong>Email service providers:</strong> for sending
                service-related emails such as quotes and confirmations.
              </li>
              <li>
                <strong>Legal authorities:</strong> when required by law, court
                order, or to protect our legal rights.
              </li>
            </ul>
          </section>

          {/* ── Data Security ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">5. Data Security</h2>
            <p className="mt-3">
              We take reasonable measures to protect your personal information,
              including encryption of data in transit (HTTPS), secure payment
              processing through Stripe, and restricted access to personal data.
              However, no method of internet transmission or electronic storage
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* ── Cookies ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">6. Cookies</h2>
            <p className="mt-3">
              Our website may use cookies and similar technologies to improve
              your browsing experience and analyze site traffic. You can control
              cookie settings through your browser preferences. Disabling
              cookies may limit some features of our website.
            </p>
          </section>

          {/* ── Your Rights ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">7. Your Rights</h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Request access to the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of any future communications.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us using the information
              below.
            </p>
          </section>

          {/* ── Service Areas ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">8. Service Areas</h2>
            <p className="mt-3">
              This policy applies to customers and website visitors in our
              service areas: Frisco, Plano, McKinney, Prosper, Little Elm, The
              Colony, Allen, Celina, Murphy, and Richardson, Texas, and
              surrounding areas in the Dallas-Fort Worth metroplex.
            </p>
          </section>

          {/* ── Children's Privacy ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              9. Children&rsquo;s Privacy
            </h2>
            <p className="mt-3">
              Our website and services are not directed at individuals under the
              age of 18. We do not knowingly collect personal information from
              children. If you believe we have collected information from a
              child, please contact us and we will promptly delete it.
            </p>
          </section>

          {/* ── Changes ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              10. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated &ldquo;Last updated&rdquo;
              date. We encourage you to review this page periodically.
            </p>
          </section>

          {/* ── Contact ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">11. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="text-hydra-600 hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-hydra-600 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <strong>Address:</strong> {siteConfig.address}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
