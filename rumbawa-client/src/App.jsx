import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import Homepage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;