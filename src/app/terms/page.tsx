import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Hydra Pool Services. Review the terms governing our pool maintenance, repair, and related services.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsOfServicePage() {
  return (
    <article className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-light">
          Last updated: March 28, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate">
          {/* ── Agreement ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              1. Agreement to Terms
            </h2>
            <p className="mt-3">
              By accessing or using the website at{" "}
              <Link
                href="/"
                className="font-medium text-hydra-600 hover:underline"
              >
                www.hydrapoolservices.com
              </Link>{" "}
              or engaging Hydra Pool Services (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) for pool maintenance,
              repair, or related services, you agree to be bound by these Terms
              of Service. If you do not agree, please do not use our website or
              services.
            </p>
          </section>

          {/* ── Services ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              2. Services Provided
            </h2>
            <p className="mt-3">
              Hydra Pool Services provides residential and commercial pool
              maintenance, pool repair, bead blasting, chemical-only service,
              and pool education (Pool School) in the Dallas-Fort Worth area of
              Texas. Our services are available in Frisco, Plano, McKinney,
              Prosper, Little Elm, The Colony, Allen, Celina, Murphy,
              Richardson, and surrounding areas.
            </p>
            <p className="mt-3">
              Service availability, scheduling, and scope may vary depending on
              your location, pool type, and current demand. We reserve the right
              to modify, suspend, or discontinue any service at any time with
              reasonable notice.
            </p>
          </section>

          {/* ── Service Area ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              3. Service Area Limitations
            </h2>
            <p className="mt-3">
              Our services are limited to the North DFW metroplex area. We may
              decline service requests outside our coverage area. If you are
              unsure whether your location is within our service area, please{" "}
              <Link
                href="/contact"
                className="font-medium text-hydra-600 hover:underline"
              >
                contact us
              </Link>{" "}
              to confirm before scheduling.
            </p>
          </section>

          {/* ── Scheduling & Access ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              4. Scheduling & Property Access
            </h2>
            <p className="mt-3">
              By subscribing to a service plan, you agree to provide our
              technicians with reasonable access to your pool and equipment on
              your scheduled service day. If access is not available (e.g.,
              locked gates, aggressive pets, construction), we will attempt to
              notify you and reschedule. Repeated access issues may result in
              service interruption.
            </p>
            <p className="mt-3">
              In the event of severe weather or unsafe conditions, we may
              reschedule your visit within the same service week when possible.
            </p>
          </section>

          {/* ── Payment Terms ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">5. Payment Terms</h2>
            <p className="mt-3">
              Service plans are billed monthly. Payment is due upon receipt of
              invoice. We accept credit cards and ACH payments processed
              securely through our{" "}
              <Link
                href="/payments"
                className="font-medium text-hydra-600 hover:underline"
              >
                payment portal
              </Link>
              , powered by Stripe.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                Prices are as listed on our{" "}
                <Link
                  href="/plans"
                  className="font-medium text-hydra-600 hover:underline"
                >
                  plans page
                </Link>{" "}
                at the time of enrollment. We reserve the right to adjust
                pricing with 30 days written notice.
              </li>
              <li>
                All chemicals needed for standard service are included in plan
                pricing.
              </li>
              <li>
                Add-on services, repairs, and one-time services are quoted
                separately and billed upon completion.
              </li>
              <li>
                Late payments may result in service suspension until the balance
                is resolved.
              </li>
            </ul>
          </section>

          {/* ── Cancellation ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              6. Cancellation & Refund Policy
            </h2>
            <p className="mt-3">
              There are no long-term contracts. You may cancel your service plan
              at any time with 30 days written notice by contacting us via
              phone, email, or our{" "}
              <Link
                href="/contact"
                className="font-medium text-hydra-600 hover:underline"
              >
                contact page
              </Link>
              .
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                Service will continue through the end of the current billing
                period after notice is received.
              </li>
              <li>
                Refunds for services already rendered are not available.
              </li>
              <li>
                Prepaid amounts for undelivered future services will be refunded
                on a prorated basis.
              </li>
              <li>
                One-time service fees (repairs, bead blasting, etc.) are
                non-refundable once the work has been performed.
              </li>
            </ul>
          </section>

          {/* ── Customer Responsibilities ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              7. Customer Responsibilities
            </h2>
            <p className="mt-3">As a customer, you agree to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Provide accurate information about your pool, equipment, and
                property.
              </li>
              <li>
                Maintain safe access to your pool area for our technicians.
              </li>
              <li>
                Notify us promptly of any issues, changes to your pool system,
                or concerns about service.
              </li>
              <li>
                Not add chemicals to your pool between service visits unless
                instructed to do so by our team, as this may interfere with
                water balance.
              </li>
            </ul>
          </section>

          {/* ── Liability ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              8. Limitation of Liability
            </h2>
            <p className="mt-3">
              Hydra Pool Services strives to deliver excellent service, but we
              cannot guarantee specific results. To the fullest extent permitted
              by law:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                We are not liable for pre-existing pool conditions, equipment
                failures due to age or wear, or damage caused by acts of nature
                (storms, flooding, extreme temperatures).
              </li>
              <li>
                Our liability for any claim arising from our services is limited
                to the amount you paid for the specific service giving rise to
                the claim.
              </li>
              <li>
                We are not liable for indirect, incidental, or consequential
                damages, including but not limited to property damage not
                directly caused by our negligence, loss of use, or other
                losses.
              </li>
              <li>
                We carry general liability insurance. If you believe our
                technicians caused damage to your property during a service
                visit, please contact us immediately so we can investigate and
                resolve the issue.
              </li>
            </ul>
          </section>

          {/* ── Warranty ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              9. Service Warranty
            </h2>
            <p className="mt-3">
              Repair work performed by Hydra Pool Services is warranted for 30
              days from the date of completion. If the same issue recurs within
              the warranty period, we will re-inspect and address it at no
              additional charge. This warranty does not cover issues caused by
              third-party modifications, misuse, or normal wear and tear.
            </p>
          </section>

          {/* ── Website Use ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">10. Website Use</h2>
            <p className="mt-3">
              You agree to use our website for lawful purposes only. You may
              not:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Interfere with or disrupt the website or its servers.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the website.
              </li>
              <li>
                Use the website to transmit harmful, fraudulent, or offensive
                content.
              </li>
              <li>
                Scrape, copy, or reproduce website content without written
                permission.
              </li>
            </ul>
          </section>

          {/* ── Intellectual Property ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              11. Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website — including text, images, logos,
              graphics, and design — is the property of Hydra Pool Services and
              is protected by applicable intellectual property laws. You may not
              reproduce, distribute, or use any content without our prior
              written consent.
            </p>
          </section>

          {/* ── Governing Law ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              12. Governing Law
            </h2>
            <p className="mt-3">
              These Terms of Service are governed by and construed in accordance
              with the laws of the State of Texas, without regard to its
              conflict of law provisions. Any disputes arising from these terms
              or our services shall be resolved in the courts of Collin County,
              Texas.
            </p>
          </section>

          {/* ── Changes ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">
              13. Changes to These Terms
            </h2>
            <p className="mt-3">
              We reserve the right to update these Terms of Service at any time.
              Changes will be posted on this page with an updated &ldquo;Last
              updated&rdquo; date. Continued use of our website or services
              after changes are posted constitutes acceptance of the revised
              terms.
            </p>
          </section>

          {/* ── Contact ── */}
          <section>
            <h2 className="text-lg font-bold text-navy">14. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about these Terms of Service, please
              contact us:
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
