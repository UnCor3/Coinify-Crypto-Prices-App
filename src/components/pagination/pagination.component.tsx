import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default ({  currentPage }: any) => {
  const router = useRouter();
  const { rows } = router.query;
  const safeRows = typeof rows === "string" ? parseInt(rows) : false;
  const defaultedValues = [10, 25, 50];

  if (safeRows) {
    const isAvailable = defaultedValues.find((item) => item === safeRows);
    if (!isAvailable) defaultedValues.push(safeRows);
  }

  const handleRow = (e : ChangeEvent<HTMLSelectElement>) =>
    router.push(`/?rows=${e.target.value}&page=${currentPage}`);

  const handlePage = () => {
    router.push(`/?rows=${rows ? rows : 10}&page=${currentPage + 1}`);
  }

  return (
    <div className="pagination-container">
      <div className="page-controller">
        <button
          className="prev-page"
          disabled={currentPage === 1 ? true : false}
          onClick={() => {
            router.push(`/?rows=${rows}&page=${currentPage - 1}`);
          }}
        >
          {"<"}
        </button>
        <div className="current-page">{currentPage}</div>
        <div
          className="next-page"
          onClick={handlePage}
        >
          {">"}
        </div>
      </div>
      <div className="row-controller">
        <span>Show rows of</span>
        <select
          className="tooltip"
          onChange={handleRow}
        >
          {defaultedValues.map((item,i) => {
            return (
              <option
                value={ typeof rows === "string"
                    ? parseInt(rows) === item ? item : undefined
                    : undefined}
                key={i}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <hr />
    </div>
  );
};
