"use client";

import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

type Surface =
  | "navbar"
  | "navbar_mobile"
  | "footer"
  | "home_hero"
  | "home_cta"
  | "contact_page"
  | "blog";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  kind: "phone" | "email";
  surface: Surface;
}

export function TrackedContactLink({
  href,
  kind,
  surface,
  children,
  onClick,
  ...rest
}: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (kind === "phone") trackPhoneClick(surface);
    else trackEmailClick(surface);
    onClick?.(e);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
