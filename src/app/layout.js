import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SearchProvider } from './context/SearchContext'
import { FavoritesProvider } from './context/FavoritesContext'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Recipe Finder',
  description: 'Find your favorite recipes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SearchProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
