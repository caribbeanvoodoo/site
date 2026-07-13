import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Escuchar } from "@/components/Escuchar";
import { Ver } from "@/components/Ver";
import { Lista } from "@/components/Lista";
import { Fechas } from "@/components/Fechas";
import { Nosotros } from "@/components/Nosotros";
import { Prensa } from "@/components/Prensa";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Escuchar />
        <Ver />
        <Lista />
        <Fechas />
        <Nosotros />
        <Prensa />
      </main>
      <Footer />
    </>
  );
}
