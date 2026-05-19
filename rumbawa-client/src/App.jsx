import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layouts/Layout";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import Homepage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";

import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";

import DashLayout from "./layouts/DashLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";

import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  // 🌐 PUBLIC SITE
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },
    ],
  },

  // 🔐 AUTH
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },

  // 📊 DASHBOARD
  {
    path: "dashboard",
    element: <DashLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },

  // ❌ GLOBAL 404 (MUST BE LAST)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;