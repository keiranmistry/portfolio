import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Keiran Mistry - Portfolio",
  description: "Data Science student at University of Waterloo interested in machine learning, data analysis, and full-stack development.",
  keywords: "data science, machine learning, University of Waterloo, software development, portfolio, data analysis, Python, JavaScript, React, Keiran Mistry",
  authors: [{ name: "Keiran Mistry" }],
  creator: "Keiran Mistry",
  publisher: "Keiran Mistry",
  robots: "index, follow",
  openGraph: {
    title: "Keiran Mistry - Portfolio",
    description: "Data Science student at University of Waterloo interested in machine learning, data analysis, and full-stack development.",
    type: "website",
    locale: "en_US",
    siteName: "Keiran Mistry's Portfolio",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh'
        }}
      >
        {children}
      </body>
    </html>
  );
}
