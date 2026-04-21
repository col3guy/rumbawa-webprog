import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const projects = [
  {
    id: 1,
    name: "task-management-website",
    title: "Task Management Website",
    image: "/task-manager.png",
    description:
      "A simple productivity web app that allows users to create, update, and delete tasks. Designed with a clean interface to help users stay organized.",
  },
  {
    id: 2,
    name: "authentication-system",
    title: "Authentication System",
    image: "/authenticate.jpg",
    description:
      "A web application with login and user authentication features, focusing on secure access and user management.",
  },
  {
    id: 3,
    name: "online-clothing-merch",
    title: "Online Clothing Merch",
    image: "/clothing.png",
    description:
      "An online shopping platform offering official merchandise such as clothing and accessories.",
  },
  {
    id: 4,
    name: "food-ordering-ui",
    title: "Food Ordering UI",
    image: "/ordering.png",
    description:
      "A user-friendly interface for browsing food items and placing orders online with responsive design.",
  },
  // 6 new projects
 {
    id: 5,
    name: "restaurant-reservation",
    title: "Restaurant Booking Reservation",
    image: "/restaurant-reservation.webp",
    description:
      "A web app for users to reserve tables online and check availability, including admin management for restaurant staff.",
  },
  {
    id: 6,
    name: "blog-platform",
    title: "Travel Blog",
    image: "/travel-blog.webp",
    description:
      "A full-featured blog platform that allows users to create, edit, and manage posts with a clean and responsive UI.",
  },
  {
    id: 7,
    name: "weather-app",
    title: "Weather App",
    image: "/weather-app.png",
    description:
      "A simple weather application providing current weather updates, forecasts, and location-based data using API integration.",
  },
  {
    id: 8,
    name: "e-learning-platform",
    title: "E-Learning Platform",
    image: "/E-learning.png",
    description:
      "An interactive e-learning platform designed to deliver courses, track progress, and engage users with multimedia content.",
  },
  {
    id: 9,
    name: "fitness-tracker",
    title: "Fitness Tracker",
    image: "/fitness-tracker.avif",
    description:
      "A web and mobile application to track workouts, monitor health metrics, and provide insights for a healthier lifestyle.",
  },
  {
    id: 10,
    name: "image-gallery",
    title: "Image Gallery",
    image: "/image-gallery.avif",
    description:
      "A responsive image gallery application that allows users to upload, browse, and search images with smooth navigation and filtering.",
  },
];

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex justify-center">
        <div className="max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            My Work
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Project Case Studies
          </h1>

          <p className="mt-4 text-sm text-zinc-600 sm:text-base">
            A deeper look into my projects, including design decisions, tools used, and development process.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Frontend Developer • React • Tailwind
          </p>

          <div className="mt-6 flex justify-center">
            <Button to="/">Explore My Work</Button>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            My Portfolio
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Detailed Projects
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col h-full rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Case Study
              </p>

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {project.description}
              </p>

              <Link to={`/articles/${project.name}`} className="mt-auto inline-block">
                <Button>Read More</Button>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT I LEARNED */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 flex justify-center">
        <div className="max-w-2xl text-center">

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What I Learned
          </h2>

          <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
            Through these projects, I’ve developed skills in frontend development, UI/UX design, debugging, and working with modern frameworks. I continue to improve by building real-world applications and learning new technologies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;