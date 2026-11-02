import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Book from './pages/books.tsx';
import Genre from './pages/genres.tsx';
import Author from './pages/authors.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/books" element={<Book />} />
        <Route path="/genres" element={<Genre />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
