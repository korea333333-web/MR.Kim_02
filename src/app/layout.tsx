import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MouseEffect from "../components/MouseEffect";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 아티스트 김승욱의 포트폴리오",
  description: "음악과 AI가 만나는 곳 - AI 콘텐츠 제작, 사운드 디자인, 교육",
  keywords: ["AI", "아티스트", "김승욱", "포트폴리오", "사운드 디자인", "AI 교육"],
  authors: [{ name: "김승욱" }],
  openGraph: {
    title: "AI 아티스트 김승욱의 포트폴리오",
    description: "음악과 AI가 만나는 곳",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseEffect />
        {children}
      </body>
    </html>
  );
}
