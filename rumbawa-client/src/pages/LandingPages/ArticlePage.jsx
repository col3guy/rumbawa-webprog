import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import projects from "../../data/projects";

function ArticlePage() {
  const { id } = useParams();
  const article = projects.find((p) => {
    const requestedId = String(id).toLowerCase();
    return (
      String(p.status).toLowerCase() === "published" &&
      (String(p.id) === requestedId || String(p.name).toLowerCase() === requestedId)
    );
  });

  if (!article) {
    return (
      <div className="p-6">
        <h1>Article not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-zinc-900">{article.title}</h1>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border-2 border-zinc-900 shadow-lg">
        <img
          src={article.image}
          alt={article.title}
          className="block w-full object-cover"
        />
      </div>

      <div className="rounded-[1.5rem] border-2 border-zinc-900 bg-zinc-100 p-6">
        <p className="text-lg leading-8 text-zinc-700">
          {article.description}
        </p>
      </div>

      <Button to="/articles" variant="secondary">Back to Projects</Button>
    </div>
  );
}

export default ArticlePage;
