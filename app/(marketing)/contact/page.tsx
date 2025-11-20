import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nivesh Elangovanraaj for data science consulting, collaboration, or opportunities.",
};

export default function ContactPage() {
  return <ContactClient />;
}
