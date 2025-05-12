import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileAwareLayout from "@/components/mobileAwareLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Angel Tamang ",
  description:
    "Portfolio of Angel Tamang, showcasing projects in Full-Stack Development and Machine Learning.",
  keywords: [
    "Full-Stack Developer",
    "Machine Learning",
    "ML/AI Engineer",
    "AI",
    "Data Science",
    "Data Scientist",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileAwareLayout>{children}</MobileAwareLayout>
      </body>
    </html>
  );
}
