import React from "react";
import StaticPage from "../components/StaticPage";
import { aboutContent } from "../data/siteData";

export default function About() {
  return (
    <StaticPage
      title={aboutContent.title}
      sections={aboutContent.sections}
    />
  );
}
