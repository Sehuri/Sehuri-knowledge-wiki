import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knowledge Wiki · 产品经理 Wiki",
  description: "一个可追溯、可关联的个人知识花园，包含产品经理方法、技术通识、市场与实践思考。",
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
