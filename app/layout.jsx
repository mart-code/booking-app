import { Inter } from "next/font/google";
import "@/assets/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "@/assets/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookit App",
  description: "Book a meeting or conference room",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 smpx-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <ToastContainer/>
      </body>
    </html>
  );
}
