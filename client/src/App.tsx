import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Toaster } from './components/ui/toaster';
import { Blogs } from './pages/Blogs';

function App() {
  return (

    <Router>
      <div className="min-h-screen bg-gradient-to-t  from-stone-500 to-zinc-700">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;