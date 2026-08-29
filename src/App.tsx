import { lazy, Suspense } from "react";
import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { GrainOverlay } from "./components/GrainOverlay";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Services } from "./components/Services";
import { Automation } from "./components/Automation";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { JsonLd } from "./components/JsonLd";

const ChatWidget = lazy(() =>
  import("./components/chat/ChatWidget").then((mod) => ({ default: mod.ChatWidget })),
);

export default function App() {
  return (
    <>
      <JsonLd />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <GrainOverlay />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Automation />
        <Process />
        <Work />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  );
}
