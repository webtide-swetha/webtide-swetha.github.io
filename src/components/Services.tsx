import { alsoAvailable, services, type Service } from "../data/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";

const sizeClass: Record<Service["size"], string> = {
  hero: "md:col-span-6 lg:col-span-8 lg:row-span-2",
  mid: "md:col-span-3 lg:col-span-4",
  small: "md:col-span-2 lg:col-span-4",
};

export function Services() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Six ways to grow. One founder."
            copy="A bento of the work Swetha actually ships — not a menu of buzzwords. Automation is the wedge; the rest is the system around it."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-2">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 0.06}
              className={sizeClass[service.size]}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-text-lo">
            Also available
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {alsoAvailable.map((item) => (
              <li
                key={item}
                className="rounded-full border border-navy-700 bg-navy-800/60 px-3 py-1.5 text-xs text-text-lo"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
