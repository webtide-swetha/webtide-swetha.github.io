import { projects } from "../data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WorkVisual } from "./WorkVisual";

export function Work() {
  return (
    <section id="work" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Work"
            title="Work across Tamil Nadu"
            copy="Coimbatore painters, Tiruppur knitwear, Chennai practices — the same stack: a fast site, ads that land, and WhatsApp that actually replies."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy-700 bg-navy-800">
                <WorkVisual id={project.visual} label={project.thumbnailLabel} location={project.location} />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-teal-300">
                    {project.client} · {project.location}
                  </p>
                  <p className="font-display text-base font-semibold text-text-hi">{project.clientType}</p>
                  <p className="text-sm leading-relaxed text-text-lo">
                    <span className="text-text-hi">Problem. </span>
                    {project.problem}
                  </p>
                  <p className="text-sm leading-relaxed text-text-lo">
                    <span className="text-text-hi">What was done. </span>
                    {project.whatWasDone}
                  </p>
                  <p className="mt-auto border-t border-navy-700 pt-3 text-sm text-text-lo">
                    <span className="text-text-hi">Outcome. </span>
                    {project.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
