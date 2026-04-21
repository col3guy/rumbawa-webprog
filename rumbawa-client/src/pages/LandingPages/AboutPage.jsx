import Button from "../../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* HERO SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* LEFT SIDE (TEXT) */}
          <div className="lg:pl-20">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Me
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Hi, I’m Sarah Kaye — an aspiring web developer.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I build clean, responsive, and user-friendly web interfaces while continuously learning new technologies.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Projects</Button>
            </div>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div className="flex justify-end lg:pr-16">
            <img
              src="/formal.jpeg"
              alt="Project"
              className="w-full max-w-sm rounded-xl object-contain"
            />
          </div>

        </div>
      </section>

      {/* OVERVIEW */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick summary blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Projects", value: "05+" },
            { label: "Skills", value: "04+" },
            { label: "Tools", value: "10+" },
            { label: "Portfolio", value: "02+" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5"
            >
              <p className="text-2xl font-bold text-zinc-900">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT FLOW */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Section Flow
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Stacked content wireframe
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">About Me</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  I am continuously improving my skills by building real-world projects and exploring new technologies.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Experience</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Built personal projects including portfolios and small apps. Practiced responsive design, Git, and collaborative development on GitHub.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Skills & Tools</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  <span className="font-semibold">Technologies:</span> HTML, CSS, JavaScript, React, Tailwind CSS
                  <br />
                  <span className="font-semibold">Tools:</span> VS Code, Git, Chrome DevTools
                  <br />
                  Passionate about creating clean, responsive, and user-friendly interfaces.
                </p>
              </article>
            </div>
          </div>

          {/* VISUAL GRID */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              My Work Preview
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img src="/task-manager.png" className="h-full w-full object-cover" alt="Task Manager"/>
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img src="/ordering.png" className="h-full w-full object-cover" alt="Ordering App"/>
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img src="/authenticate.jpg" className="h-full w-full object-cover" alt="Authentication"/>
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img src="/clothing.png" className="h-full w-full object-cover" alt="Clothing"/>
              </div>
            </div>

            <Button className="mt-5">View Projects</Button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;