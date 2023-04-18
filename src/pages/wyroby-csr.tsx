// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import Main from "@/components/layout/Main";
// import ProductBox from "@/components/common/ProductDetails";
// import { InferGetStaticPropsType } from "next";
// import { useQuery } from "@tanstack/react-query";
// import LoadingImages from "@/components/common/LoadingImages";
// import Pagination from "@/components/common/Pagination";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// export default function ProductsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageNumberLimit = 5;
//   const [maxPageLimit, setMaxPageLimit] = useState(5);
//   const [minPageLimit, setMinPageLimit] = useState(0);
//   const totalPages = 10;
//   const getProducts = async () => {
//     const res = await fetch(
//       `https://naszsklep-api.vercel.app/api/products?take=25&offset=${
//         (currentPage - 1) * 25
//       }`
//     );
//     const data: StoreApiResponse[] = await res.json();
//     return data;
//   };

//   const result = useQuery(["products"], getProducts);
//   result.data;
//   result.isLoading;
//   result.isError;

//   const paginate = (pageNumber: any) => {
//     setCurrentPage(pageNumber);
//     if (pageNumber < pageNumberLimit - 2) {
//       setMaxPageLimit(pageNumberLimit);
//     } else {
//       setMaxPageLimit(pageNumber + 2);
//     }
//     setMinPageLimit(pageNumber - 3);
//     result.refetch();
//   };

//   if (result.isLoading) {
//     return <LoadingImages />;
//   }

//   if (!result.data || result.error) {
//     return <div>Błąd</div>;
//   }

//   return (
//     <>
//       <Head>
//         <title>Nasze Wyroby</title>
//         <meta name="description" content="Nasze Wyroby CSR" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Main>
//         <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//           <div>
//             <h2 className="text-xl font-bold dark:text-gray-300 text-gray-900 sm:text-3xl">
//               Product Collection
//             </h2>

//             <p className="mt-4 max-w-md text-gray-500">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
//               praesentium cumque iure dicta incidunt est ipsam, officia dolor
//               fugit natus?
//             </p>
//           </div>

//           <div className="mt-8">
//             <p className="text-right text-sm dark:text-gray-100 text-gray-500">
//               <span> 4 </span> z 40
//             </p>
//           </div>

//           <ul className="mt-4 grid gap-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-4">
//             {result.data.map((item) => (
//               <li key={item.id}>
//                 <ProductBox data={item} />
//               </li>
//             ))}
//           </ul>

//           <Pagination
//             currentPage={currentPage}
//             paginate={paginate}
//             totalPages={totalPages}
//             minPageLimit={minPageLimit}
//             maxPageLimit={maxPageLimit}
//           />
//         </div>
//       </Main>
//     </>
//   );
// }

// export interface StoreApiResponse {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
//   category: Category;
// }

// export interface Category {
//   id: number;
//   name: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
// }
