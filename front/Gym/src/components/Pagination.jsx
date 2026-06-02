import { useState } from 'react';
import styles from './Pagination.module.css';

export function Pagination({ page, totalPages, setPage }) {
  const [selectedButton, setSelectedButton] = useState(1);
  const windowPages = 5;
  let startPage;
  let endPage;

  const renderButton = (pageNumber) => (
    <button key={pageNumber} className={
      selectedButton === pageNumber ?
        `${styles['page-button']} ${styles['selected-button']}`
        : styles['page-button']
    }
      onClick={() => {
        setPage(pageNumber);
        setSelectedButton(pageNumber);

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
    >
      {pageNumber}
    </button>
  )

  if (totalPages <= windowPages) {
    return (
      <>
        {
          Array.from({ length: totalPages }, (_, index) => renderButton(index + 1))
        }
      </>
    );
  }

  endPage = totalPages;

  if (page <= 3) {
    startPage = 1;

    return (
      <>
        {
          Array.from({ length: windowPages }, (_, index) => (renderButton(startPage + index)))
        }
        ...
        {
          renderButton(endPage)
        }
      </>
    );
  } else if (page >= totalPages - 3) {
    startPage = totalPages - 4;

    return (
      <>
        {
          renderButton(1)
        }
        ...
        {
          Array.from({ length: windowPages }, (_, index) => (renderButton(startPage + index)))
        }
      </>
    )
  } else {
    startPage = page - 2;

    return (
      <>
        {
          renderButton(1)
        }
        ...
        {
          Array.from({ length: windowPages }, (_, index) => (renderButton(startPage + index)))
        }
        ...
        {
          renderButton(endPage)
        }
      </>
    );
  }
}