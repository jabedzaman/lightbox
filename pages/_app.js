import Header from "@/components/Header";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
//import space mono from next font
import { Bebas_Neue } from "@next/font/google";

const BebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${BebasNeue.className} bg-black min-h-screen`}>
      <Header/>
      <Component  {...pageProps} />
      <Footer/>
    </main>
  );
}
