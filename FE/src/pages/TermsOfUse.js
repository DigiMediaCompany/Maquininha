// src/pages/TermsOfUse.js
import React from "react";
import StaticPage from "../components/StaticPage";
import { termsOfUseContent } from "../data/siteData";

export default function TermsOfUse() {
  // ✅ Gọi trực tiếp content từ termsOfUseContent (không còn siteData)
  const content = termsOfUseContent;

  return (
    <StaticPage
      title={content.title}
      effectiveDate={content.effectiveDate}
      welcome={content.welcome}
      sections={content.sections}
    />
  );
}
