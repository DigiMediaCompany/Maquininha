import React from 'react';
import '../styles/static-page.css';
import { aboutContent, contactContent, privacyPolicyContent, termsOfUseContent } from '../data/siteData';

const StaticPageLayout = ({ pageType }) => {
  const getPageData = () => {
    switch (pageType) {
      case 'about':
        return { data: aboutContent, title: 'Giới thiệu' };
      case 'contact':
        return { data: contactContent, title: 'Liên hệ' };
      case 'privacy':
        return { data: privacyPolicyContent, title: 'Chính sách bảo mật' };
      case 'terms':
        return { data: termsOfUseContent, title: 'Điều khoản sử dụng' };
      default:
        return { data: aboutContent, title: 'Giới thiệu' };
    }
  };

  const pageData = getPageData();

  const renderSection = (section, index) => (
    <section key={index} className="section mb-8 last:mb-0">
      {section.heading && (
        <h2 className="section-heading mb-6">
          {section.heading}
        </h2>
      )}
      
      {section.paragraph && (
        <div 
          className="section-paragraph mb-6"
          dangerouslySetInnerHTML={{ __html: processText(section.paragraph) }}
        />
      )}
      
      {section.list && (
        <ul className="section-list">
          {section.list.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: processText(item) }} />
          ))}
        </ul>
      )}
    </section>
  );

  const processText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="strong-text">$1</strong>')
      .replace(/contato@maquininha\.com\.br/g, '<a href="mailto:contato@maquininha.com.br" class="contact-email">$&</a>')
      .replace(/rocketmediatecnologia@gmail\.com/g, '<a href="mailto:rocketmediatecnologia@gmail.com" class="contact-email">$&</a>');
  };

  return (
    <div className="page-container">
      <header className="page-header text-center mb-16">
        <h1 className="page-title mb-4">{pageData.data.title}</h1>
        {pageData.data.effectiveDate && (
          <p className="effective-date">{pageData.data.effectiveDate}</p>
        )}
      </header>
      
      <main className="page-content max-w-4xl mx-auto">
        {pageData.data.sections?.map((section, index) => renderSection(section, index))}
      </main>
    </div>
  );
};

export default StaticPageLayout;