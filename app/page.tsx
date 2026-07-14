import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.description,
  alternates: {
    canonical: "/ru",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootPage() {
  redirect("/ru");
}
