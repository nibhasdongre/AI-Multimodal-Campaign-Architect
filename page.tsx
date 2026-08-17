import { Hero } from "@/components/Hero";
import { DemoGifPanel } from "@/components/DemoGifPanel";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { DemoGrid } from "@/components/DemoGrid";
import { ByokPanel } from "@/components/ByokPanel";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
        <DemoGifPanel />
        <FeatureCarousel />
      </section>

      <DemoGrid />
      <ByokPanel />

      <Footer />
    </main>
  );
}