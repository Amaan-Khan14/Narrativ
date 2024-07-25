import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Toaster } from './components/ui/toaster';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { Publish } from './pages/Publish';
import { Profile } from './pages/Profile';

function App() {
  return (

    <Router>
      <div className="min-h-screen bg-gradient-to-t  from-stone-500 to-zinc-700">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;