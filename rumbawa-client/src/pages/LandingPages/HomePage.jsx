import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import projects from '../../data/projects';

const HomePage = () => {
    const publishedProjects = projects
        .filter((project) => String(project.status).toLowerCase() === 'published')
        .slice(0, 3);

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Introduction Section */}
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="ml-10">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Introduction
                        </p>
                        <h1 className="max-w-xl text-2xl font-bold leading-tight text-zinc-700 sm:text-2xl">
                            Hi, I'm Sarah Kaye Rumbawa. Welcome to my Personal Portfolio
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Student developer creating clean and responsive websites.
                        </p>
                        <div className="mt-6">
                            <Button to="/about" variant="primary">
                                About Me
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end items-center mr-20">
                        <img
                            src="/Information-Technology.jpg"
                            alt="Profile"
                            className="h-60 w-auto object-cover rounded-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Portfolio Highlights Section */}
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Portfolio Highlights
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        A Quick Look at My Work
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">10+</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Project Completed
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">15+</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Tools Used
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">13+</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            UI Design
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">04</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Skills
                        </p>
                    </div>
                </div>
            </section>

            {/* My Projects Section (Hardcoded) */}
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        My Projects
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Some of my recent works
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {publishedProjects.map((project) => (
                        <article
                            key={project.id}
                            className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
                        >
                            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover rounded-[1.25rem]"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                                {project.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-600">
                                {project.description}
                            </p>
                            <Link to={`/articles/${project.name}`}>
                                <Button className="mt-4" variant="primary">
                                    View More
                                </Button>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
            >
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Contact Me
                    </p>

                    <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
                        Feel free to reach out for collaborations, school projects, or web development inquiries.
                    </p>

                    <div className="mt-6 space-y-2 text-zinc-900">
                        <p className="text-sm sm:text-base">
                            <span className="font-semibold">Phone:</span> 09192019284
                        </p>
                        <p className="text-sm sm:text-base">
                            <span className="font-semibold">Email:</span> kaye.rumbawa@gmail.com
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;