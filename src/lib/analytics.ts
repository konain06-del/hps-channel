import { sendGTMEvent } from "@next/third-parties/google";

// GA4-recommended event names (generate_lead, etc.) so the events show up
// under the canonical reports without extra config in GA4 / GTM.

type LeadSource =
  | "home_quote_form"
  | "chat_pool_quote"
  | "chat_repair_inquiry"
  | "chat_question_inquiry";

export function trackLead(params: {
  source: LeadSource;
  value?: number;
  currency?: string;
}) {
  sendGTMEvent({
    event: "generate_lead",
    lead_source: params.source,
    value: params.value,
    currency: params.currency ?? "USD",
  });
}

type ClickSurface =
  | "navbar"
  | "navbar_mobile"
  | "footer"
  | "home_hero"
  | "home_cta"
  | "contact_page"
  | "blog";

export function trackPhoneClick(surface: ClickSurface) {
  sendGTMEvent({ event: "phone_call_click", click_surface: surface });
}

export function trackEmailClick(surface: ClickSurface) {
  sendGTMEvent({ event: "email_click", click_surface: surface });
}
