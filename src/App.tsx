import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => { 
    document.title = "Test task";
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
};

export default App;
