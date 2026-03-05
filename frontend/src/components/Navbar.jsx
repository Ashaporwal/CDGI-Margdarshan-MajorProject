import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        {/* <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-semibold tracking-wide text-gray-900">
            CDGI
          </span>
          <span className="text-xl font-medium text-gray-500 group-hover:text-violet-600 transition duration-300">
            Margdarshan
          </span>
        </div> */}

        <div className="text-xl tracking-wide flex items-center gap-2 cursor-pointer group">
          <span className="font-bold text-gray-900">🎓 CDGI</span>

          <span className="font-semibold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm group-hover:drop-shadow-md transition duration-300">
            Margdarshan
          </span>
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