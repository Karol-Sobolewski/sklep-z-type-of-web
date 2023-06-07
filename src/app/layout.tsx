import { CartStateContextProvider } from "@/components/common/Cart/CartContext";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-100 dark:bg-slate-800 flex flex-col min-h-screen dark:text-white antialiased">
        <CartStateContextProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow w-full mx-auto">{children}</main>
            <Footer />
          </div>
        </CartStateContextProvider>
      </body>
    </html>
  );
}
