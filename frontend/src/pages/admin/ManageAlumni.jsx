import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

function ManageAlumni() {

  const [alumni, setAlumni] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchAlumni();
  }, [page]);

  const fetchAlumni = async () => {
    try {

      const res = await API.get(`/alumni/all?page=${page}`);

      setAlumni(res.data.profiles);
      setFiltered(res.data.profiles);
      setPages(res.data.pages);

    } catch (error) {
      toast.error("Failed to fetch alumni");
    }
  };

  /* SEARCH FILTER */

  useEffect(() => {

    let data = alumni;

    if (search) {
      data = data.filter((a) =>
        a.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.company?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (batch) {
      data = data.filter(
        (a) => String(a.userId?.graduationYear) === batch
      );
    }

    setFiltered(data);

  }, [search, batch, alumni]);

  /* STATUS UPDATE */

  const updateStatus = async (id, status) => {
    try {

      await API.patch(`/alumni/status/${id}`, { status });

      toast.success(`Alumni ${status}`);
      fetchAlumni();

    } catch {
      toast.error("Status update failed");
    }
  };

  /* DELETE */

  const deleteAlumni = async (id) => {

    if (!window.confirm("Delete this alumni?")) return;

    try {

      await API.delete(`/alumni/${id}`);

      toast.success("Alumni deleted");
      fetchAlumni();

    } catch {
      toast.error("Delete failed");
    }
  };

  return (

    <div className="p-6">

      {/* <h2 className="text-2xl font-bold mb-6"> */}
        <h2 className="text-2xl font-li mb-6">
        Alumni Management
        {/* <h6>Verify and manage alumni accounts</h6> */}
      </h2>

      {/* FILTERS */}

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search name or company"
          className="border p-2 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="">Batch</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="202">2022</option>
          <option value="202">2023</option>
          <option value="202">2024</option>
          <option value="202">2025</option>
          <option value="202">2026</option>
          
        </select>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100 text-gray-700">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Experience</th>
              <th>Batch</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((a) => (

              <tr
                key={a._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {a.userId?.name}
                </td>

                <td>{a.userId?.email}</td>

                <td>{a.company}</td>

                <td>{a.designation}</td>

                <td>{a.experienceYears} yrs</td>

                <td>{a.userId?.graduationYear}</td>

                {/* STATUS BADGE */}

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      a.status === "Verified"
                        ? "bg-green-500"
                        : a.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {a.status}
                  </span>

                </td>

                {/* ACTION ICONS */}

                <td>

                  <div className="flex justify-center gap-3">

                    {a.status === "Pending" && (

                      <>
                        <button
                          onClick={() =>
                            updateStatus(a._id, "Verified")
                          }
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheck size={18} />
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(a._id, "Rejected")
                          }
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          <FaTimes size={18} />
                        </button>
                      </>

                    )}

                    <button
                      onClick={() => deleteAlumni(a._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} / {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default ManageAlumni;


// import { useEffect, useState } from "react";
// import API from "../../services/api";

// function ManageAlumni() {

//   const [alumni, setAlumni] = useState([]);

// //   const fetchAlumni = async () => {
// //     try {
// //       const res = await API.get("/alumni/all");
// //       setAlumni(res.data);
// //     } catch (error) {
// //       console.log("Error fetching alumni:", error);
// //     }
// //   };
// const fetchAlumni = async () => {
//   try {
//     const res = await API.get("/alumni/all");
//     console.log("ALUMNI DATA:", res.data);   // 👈 add this
//     setAlumni(res.data);
//   } catch (error) {
//     console.log("Error fetching alumni:", error);
//   }
// };
//   useEffect(() => {
//     fetchAlumni();
//   }, []);

//   return (
//     <div>

//       <h2>All Alumni</h2>

//       {alumni.length === 0 ? (
//         <p>No Alumni Found</p>
//       ) : (
//         alumni.map((a) => (
//           <div key={a._id}>
//             <h3>{a.userId?.name}</h3>
//             <p>{a.userId?.email}</p>
//             <p>{a.company}</p>
//             <p>{a.designation}</p>
//           </div>
//         ))
//       )}

//     </div>
//   );
// }

// export default ManageAlumni;