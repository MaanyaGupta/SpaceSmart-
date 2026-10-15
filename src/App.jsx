import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

// Eager-load pages (small project — no need for code splitting)
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  // Handled per-page via useEffect(window.scrollTo)
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Skip to Main Content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header onOpenSearch={() => setSearchOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Category Routes */}
        <Route
          path="/small-bedroom-ideas"
          element={<CategoryPage categorySlug="small-bedroom-ideas" />}
        />
        <Route
          path="/storage-solutions"
          element={<CategoryPage categorySlug="storage-solutions" />}
        />
        <Route
          path="/decluttering"
          element={<CategoryPage categorySlug="decluttering" />}
        />
        <Route
          path="/budget-friendly-ideas"
          element={<CategoryPage categorySlug="budget-friendly-ideas" />}
        />

        {/* Blog Index */}
        <Route path="/blog" element={<Blog />} />

        {/* Individual Article */}
        <Route path="/article/:slug" element={<Article />} />

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {/* Search Modal — rendered at root level for proper z-index stacking */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
