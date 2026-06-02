import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";

import initialArticles from "../../data/articles"; // or your local data source

export default function DashArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles")) || initialArticles;
    const found = stored.find((a) => String(a.id) === id);
    setArticle(found);
  }, [id]);

  if (!article) return <h2>Article not found</h2>;

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

const handleSave = () => {
  const stored = JSON.parse(localStorage.getItem("articles")) || initialArticles;

  const updatedArticles = stored.map((a) =>
    a.id === article.id ? article : a
  );

  localStorage.setItem("articles", JSON.stringify(updatedArticles));

  alert("Saved!");
  navigate("/dashboard/articles");
};

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, bgcolor: "white" }}>
      <Typography variant="h5" mb={2}>
        Edit Article
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Slug"
          name="slug"
          value={article.slug}
          onChange={handleChange}
        />

        <TextField
          label="Title"
          name="title"
          value={article.title}
          onChange={handleChange}
        />

        <TextField
          label="Paragraphs"
          name="paragraphs"
          value={article.paragraphs}
          onChange={handleChange}
        />

        <TextField
          label="Preview"
          name="preview"
          multiline
          rows={3}
          value={article.preview}
          onChange={handleChange}
        />

        <TextField
          label="Status"
          name="status"
          value={article.status}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/articles")}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}