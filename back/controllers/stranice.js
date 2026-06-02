function Stranice(page, totalPages) {
  let representingPages = 5;
  let firstPage;
  let lastPage;

  if (totalPages <= representingPages) {
    return Array.from({ length: totalPages }, (_, i) => {
      console.log(i + 1)
    })
  }

  lastPage = totalPages;

  if (page <= 3) {
    firstPage = 1;
    const firstFive = Array.from({ length: 5 }, (_, i) => {
      console.log(firstPage + i);
    });
    console.log('...' + lastPage);
  } else if (page >= totalPages - 3) {
    firstPage = totalPages - 4;
    console.log('...1');
    const firstFive = Array.from({ length: 5 }, (_, i) => {
      console.log(firstPage + i);
    });
  } else {
    firstPage = page - 2;
    console.log('...1');
    const firstFive = Array.from({ length: 5 }, (_, i) => {
      console.log(firstPage + i);
    });
    console.log('...' + lastPage);
  }
}

Stranice(2, 5)