import React from "react";
import StaticPage from "../components/StaticPage";
import { contactContent } from "../data/siteData";

export default function Contact() {
  return (
    <StaticPage
      title={contactContent.title}
      sections={contactContent.sections}
    />
  );
}
