import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="bg-[#f7f8fc] min-h-screen overflow-x-hidden">

            <Navbar />

            {/* HERO */}
            <section className="pt-36 pb-28 relative">

                {/* soft premium background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-pink-50"></div>

                <div className="relative max-w-5xl mx-auto text-center px-6">

                    <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
                        Connect. Learn. <span className="text-violet-600">Succeed.</span>
                    </h1>

                    <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
                        A modern placement and alumni engagement platform built to empower
                        students with real opportunities and mentorship.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-violet-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition duration-300"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="bg-white border border-violet-600 text-violet-600 px-8 py-3 rounded-xl shadow hover:bg-violet-50 transition duration-300"
                        >
                            Explore Platform
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
                    {[
                        { num: "847+", label: "Students Placed" },
                        { num: "156+", label: "Hiring Partners" },
                        { num: "12.5L", label: "Average Package" },
                        { num: "45L", label: "Highest Package" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white border p-8 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
                        >
                            <h2 className="text-3xl font-bold text-violet-600">
                                {item.num}
                            </h2>
                            <p className="text-gray-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-14 text-gray-800">
                        Platform Features
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            "Job Opportunities",
                            "Alumni Network",
                            "Mentorship",
                            "Campus Drives",
                            "Analytics",
                            "Success Stories",
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-2xl border bg-white hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                            >
                                <h3 className="font-semibold text-lg mb-3 text-violet-600">
                                    {f}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Helping students and alumni connect for meaningful career growth.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-24 bg-violet-600 text-white shadow-inner">
                <h2 className="text-4xl font-bold mb-6">
                    Ready to Shape Your Future?
                </h2>

                <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold shadow hover:scale-105 transition">
                    Create Account
                </button>
            </section>

            {/* FOOTER */}
            <footer className="text-center py-8 text-gray-500 bg-white">
                © 2026 Campus Connect. All rights reserved.
            </footer>
        </div>
    );
}