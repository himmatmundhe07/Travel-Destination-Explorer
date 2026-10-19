"use client";

import { usePathname } from "next/navigation";
import { headerNav, NavList } from "./nav-list";

export function NavLinks() {
  const pathname = usePathname();
  const active = headerNav.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return <NavList activeHref={active?.href} />;
}
