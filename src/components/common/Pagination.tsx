export type Props = {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number | null | undefined;
  minPageLimit: number;
  maxPageLimit: number;
};

export default function Pagination({
  currentPage,
  paginate,
  totalPages,
  minPageLimit,
  maxPageLimit,
}: Props) {
  const pageNumbers = [];
  if (totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  const handleDecrease = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    } else return;
  };

  const handleIncrease = () => {
    if (totalPages) {
      if (currentPage < totalPages) {
        paginate(currentPage + 1);
      } else return;
    }
  };

  return (
    <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
      <li className={currentPage === 1 ? "hidden" : "flex"}>
        <a
          href="#"
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          onClick={() => handleDecrease()}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>

      {pageNumbers.map((number) => {
        if (number <= maxPageLimit && number > minPageLimit) {
          return (
            <li key={number}>
              <a
                href="#"
                className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8 hover:border-red-800  ${
                  currentPage === number ? `  border-red-800 text-red-800` : ``
                }`}
                key={number}
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          );
        } else return null;
      })}

      <li className={currentPage === totalPages ? "hidden" : "flex"}>
        <a
          href="#"
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          onClick={() => handleIncrease()}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  );
}
