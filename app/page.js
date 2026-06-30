import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SignatureDishes from "@/components/SignatureDishes";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import siteData from "@/data/site.json";
import menuData from "@/data/menu.json";

export default function Home() {
  return (
    <>
      <Header restaurant={siteData.restaurant} />
      <Hero hero={siteData.hero} />
      <About about={siteData.about} />
      <SignatureDishes menu={menuData} />
      <MenuSection menu={menuData} />
      <Gallery gallery={siteData.gallery} />
      <Testimonials testimonials={siteData.testimonials} />
      <Reservation restaurant={siteData.restaurant} />
      <Contact restaurant={siteData.restaurant} />
      <Footer restaurant={siteData.restaurant} />
    </>
  );
}
