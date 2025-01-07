import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const [visibleRange, setVisibleRange] = useState([1, 5]); // Initial range [1, 5]

  useEffect(() => {
    setVisibleRange([1, totalPages > 5 ? 5 : totalPages])
  },[totalPages])

  useEffect(() => {
    // Reset range if totalPages or currentPage changes unexpectedly
    if (currentPage < visibleRange[0] || currentPage > visibleRange[1]) {
      setVisibleRange([
        Math.max(1, currentPage - 2),
        Math.min(totalPages, currentPage + 2),
      ]);
    }
  }, [totalPosts, postPerPage, currentPage, totalPages]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      paginate(nextPage);
  
      if (nextPage > visibleRange[1]) {
        setVisibleRange([
          Math.max(1, nextPage - 2),
          Math.min(nextPage + 2, totalPages),
        ]);
      }
    }
  };
  
  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      paginate(prevPage);
  
      if (prevPage < visibleRange[0]) {
        setVisibleRange([
          Math.max(1, prevPage - 2),
          Math.min(prevPage + 2, totalPages),
        ]);
      }
    }
  };
  

  const pageNumbers = Array.from(
    { length: visibleRange[1] - visibleRange[0] + 1 },
    (_, i) => visibleRange[0] + i
  );

  return (
    <div className="influ-pagi">
      <ul>
        <li>
          <a style={{ cursor: "pointer" }} onClick={handlePrev}>
            <MdArrowBackIosNew />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <a style={{ cursor: "pointer" }} onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
        <li>
          <a style={{ cursor: "pointer" }} onClick={handleNext}>
            <MdArrowForwardIos />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;



// import { useEffect } from "react";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { MdArrowForwardIos } from "react-icons/md";
// const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   useEffect(() => {
//     if (totalPosts < postPerPage && currentPage !== 1) {
//       paginate(1);
//     }
//   }, [totalPosts, postPerPage, currentPage, paginate]);
//   return (
//     <div className="influ-pagi">
//       <ul>
//         <li>
//           <a
//             style={{cursor: 'pointer'}}
//             onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//           >
//             <MdArrowBackIosNew />
//           </a>
//         </li>
//         {pageNumbers.map((number) => (
//           <li key={number} className={currentPage === number ? "active" : ""}>
//             <a style={{cursor: 'pointer'}} onClick={() => paginate(number)}>
//               {number}
//             </a>
//           </li>
//         ))}
//         <li>
//           <a
//             style={{cursor: 'pointer'}}
//             onClick={() =>
//               paginate(
//                 currentPage < pageNumbers.length
//                   ? currentPage + 1
//                   : pageNumbers.length
//               )
//             }
//           >
//             <MdArrowForwardIos />
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Pagination;
