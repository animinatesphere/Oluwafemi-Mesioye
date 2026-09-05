import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Ticker from "./components/Ticker.jsx";
import About from "./components/About.jsx";
import Practice from "./components/Practice.jsx";
import Work from "./components/Work.jsx";
import Outcomes from "./components/Outcomes.jsx";
import Credentials from "./components/Credentials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import { reduced } from "./lib/motion.js";

export default function App() {
  const [ready, setReady] = useState(() => reduced());

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <>
      {!reduced() && <Loader onDone={() => setReady(true)} />}
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero ready={ready} />
        <Ticker />
        <About />
        <Practice />
        <Work />
        <Outcomes />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
