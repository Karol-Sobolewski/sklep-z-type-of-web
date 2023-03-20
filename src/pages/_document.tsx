import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-gray-100 dark:bg-slate-800 flex flex-col min-h-screen dark:text-white antialiased">
        <Header />
        <div className="max-w-md mx-auto w-full flex-grow px-4 py-2">
          <Main />
        </div>
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
