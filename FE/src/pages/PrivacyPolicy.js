import React from "react";
import StaticPage from "../components/StaticPage";
import { privacyPolicyContent } from "../data/siteData";

export default function PrivacyPolicy() {
  return (
    <StaticPage
      title={privacyPolicyContent.title}
      sections={privacyPolicyContent.sections}
    />
  );
}
