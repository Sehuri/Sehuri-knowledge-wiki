import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Knowledge Wiki",
  description: "一个本地、可追溯、可关联的个人知识花园。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
