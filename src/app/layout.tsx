import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";

export const metadata: Metadata = {
  title: "Multi Cart",
  description: "Developed by Vishal Prajapati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <StoreProvider>
            <InitUser/> 
            {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
