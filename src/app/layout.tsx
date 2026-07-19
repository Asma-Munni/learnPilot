import type { Metadata } from "next";



import "./globals.css";
import QueryProvider from "./providers/query-provider";
import Navbar from "./components/shared/page";
import Footer from "./components/shared/footer";

export const metadata: Metadata = {
  title: "LearnPilot AI",
  description:
    "Agentic AI-powered learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}