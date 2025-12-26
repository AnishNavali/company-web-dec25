import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
// import EDCSChatBot from "@/components/chatbot";
import Navbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equilibrate.AI",
  description: "Welcome to Equilibrate.AI",
    icons: {
    icon: "/round.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="absolute top-6 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>{" "}
        {/* <EDCSChatBot /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
