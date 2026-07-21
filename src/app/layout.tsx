import type { Metadata } from "next";



import "./globals.css";
import QueryProvider from "./providers/query-provider";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";

export const metadata: Metadata = {
  title: "LearnPilot AI",
  description:
    "Agentic AI-powered learning platform",
};



import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}