import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Project Case Studies        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A deeper look into my projects, including design decisions, tools used, and development process.
        </p>
        <div className="mt-6">
          <Button to="/">View Projects</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Detailed Project
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h- w-12 border-2 border-zinc-300 overflow-hidden rounded">
                <img
                  src="/task-manager.png" // replace with your image
                  alt="Icon"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Card 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Task Management Website
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A simple productivity web app that allows users to create, update, and delete tasks. Designed with a clean interface to help users stay organized and manage daily activities efficiently.                        </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Card 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Authentication System
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A web application that allows users to add students, mark attendance, and manage records efficiently.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Card 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Online Clothing Merch
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              An online shopping platform offering official National University merchandise such as clothing and accessories.            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Card 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Food Ordering UI            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A user-friendly interface for browsing food items and placing orders online. Focused on layout design, navigation, and responsive user experience.                        </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;