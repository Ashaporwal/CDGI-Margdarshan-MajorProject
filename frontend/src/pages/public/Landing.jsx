import Navbar from "../../components/Navbar";

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      
      <Navbar />

      {/* HERO */}
      <section className="text-center py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Connect. Learn. Succeed.
        </h1>
        <p className="text-lg mb-8">
          Your gateway to career success through placement and alumni networking
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
          <button className="border px-6 py-3 rounded-lg">
            Learn More
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 grid grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[
          { num: "847", label: "Students Placed" },
          { num: "156", label: "Partner Companies" },
          { num: "12.5L", label: "Average Package" },
          { num: "45L", label: "Highest Package" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold text-blue-600">{item.num}</h2>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Job Opportunities",
            "Alumni Network",
            "Mentorship",
            "Campus Drives",
            "Analytics",
            "Success Stories",
          ].map((f, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <h3 className="font-semibold mb-2">{f}</h3>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Campus Connect?
        </h2>

        <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-3">For Students</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✔ Access job opportunities</li>
              <li>✔ Connect with alumni</li>
              <li>✔ Track applications</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-3">For Alumni</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✔ Post jobs</li>
              <li>✔ Mentor students</li>
              <li>✔ Share stories</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold">
          Create Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Campus Connect
      </footer>

    </div>
  );
}