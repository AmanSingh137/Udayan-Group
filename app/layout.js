"use client";
import { usePathname } from "next/navigation"; // Importing usePathname from next/navigation
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Check if the current URL is /jobs
  const isJobsPage = pathname === "/jobs";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {/* Conditionally render Navbar and Footer based on the route */}
          {!isJobsPage && <Navbar />}
          <main>{children}</main>
          {!isJobsPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
