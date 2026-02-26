import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        
        <div className="font-bold text-xl text-violet-600 tracking-wide">
          Campus Connect
        </div>

        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-violet-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-violet-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-violet-600 transition">
            Contact
          </a>
        </div>

        <Link
          to="/login"
          className="px-5 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}