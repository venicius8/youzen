import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

// App-wide SEO metadata (default title and description for all pages).
export const metadata: Metadata = {
  title: "YouZen",
  description: "Você, Zen.",
};

// Root layout: wraps every page with the shared <html>/<body> shell and global styles.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="font-serif bg-blue-100">
        {/* Persistent navigation rendered above every route's content. */}
        <Header />
        {/* Page content injected by Next.js based on the current route. */}
        {children}
      </body>
    </html>
  );
}
