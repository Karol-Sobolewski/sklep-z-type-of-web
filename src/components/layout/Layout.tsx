import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
