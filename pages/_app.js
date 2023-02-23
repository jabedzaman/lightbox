import Header from "@/components/Header";
import "@/styles/globals.css";
//import space mono from next font
import { Space_Mono } from "@next/font/google";

const SpaceMono = Space_Mono({
  subsets: ["latin"],
  // weights: [400, 700],
  display: "swap",
  weight: ["400","700"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={SpaceMono.className}>
      <Header/>
      <Component {...pageProps} />
    </main>
  );
}
