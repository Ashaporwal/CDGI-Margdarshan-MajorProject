import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-10">
      
     
      <div className="flex items-center gap-2 font-bold text-lg">
        🎓 Campus Connect
      </div>

     
      <div className="flex items-center gap-8 text-gray-600">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>

 
      <Link
        to="/login"
        className="px-4 py-2 border rounded-lg text-blue-600 border-blue-600"
      >
        Login
      </Link>
    </nav>
  );
}