import React from "react";
import "../styles/pagination.css";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  // số trang hiển thị xung quanh current (ví dụ ±2)
  const RANGE = 1;

  // build unique pages set: always include 1 and totalPages and current ± RANGE
  const pagesSet = new Set();
  pagesSet.add(1);
  pagesSet.add(totalPages);

  for (let i = currentPage - RANGE; i <= currentPage + RANGE; i++) {
    if (i > 1 && i < totalPages) pagesSet.add(i);
  }

  const pages = Array.from(pagesSet).sort((a, b) => a - b);

  const go = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {/* render pages array, chèn "..." khi gap > 1 */}
      {pages.map((page, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = idx > 0 && page - prev > 1;

        return (
          <React.Fragment key={page}>
            {showEllipsis && <span className="dots">...</span>}
            <button
              className={`page-btn ${page === currentPage ? "active" : ""}`}
              onClick={() => go(page)}
            >
              {page}
            </button>
          </React.Fragment>
        );
      })}

      <button
        className="page-btn"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
}
