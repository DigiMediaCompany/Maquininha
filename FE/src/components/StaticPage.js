// src/components/StaticPage.js
import React from "react";
import "../styles/StaticPage.css";

export default function StaticPage({ title, effectiveDate, welcome, sections }) {
  return (
    <div className="static-page-container">
      <h1 className="static-title">{title}</h1>

      {effectiveDate && <p className="static-date">{effectiveDate}</p>}
      {welcome && <p className="static-paragraph">{welcome}</p>}

      {sections?.map((sec, i) => (
        <section key={i} className="static-section">
          {sec.heading && <h2 className="static-heading">{sec.heading}</h2>}
          {sec.title && <h2 className="static-heading">{sec.title}</h2>}
          {sec.paragraph && <p className="static-paragraph">{sec.paragraph}</p>}
          {sec.content && <p className="static-paragraph">{sec.content}</p>}
          {sec.list && (
            <ul className="static-list">
              {sec.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
