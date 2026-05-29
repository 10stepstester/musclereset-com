import { Nav } from "./components/Nav";
import { SectionDivider } from "./components/SectionDivider";
import { Hero } from "./sections/Hero";
import { Method } from "./sections/Method";
import { Practitioners } from "./sections/Practitioners";
import { About } from "./sections/About";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";

export function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <Method />
        <SectionDivider flipped />
        <Practitioners />
        <SectionDivider flipped />
        <About />
        <SectionDivider />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
