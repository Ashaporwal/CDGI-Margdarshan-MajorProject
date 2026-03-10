// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";
// import { FaEye, FaCheck } from "react-icons/fa";

// function ManageAlumni() {

//   const [alumni, setAlumni] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [batch, setBatch] = useState("");

//   const [selected, setSelected] = useState(null);

//   /* ================= FETCH DATA ================= */

//   const fetchAlumni = async () => {
//     try {

//       const res = await API.get("/api/admin/pending-alumni");

//       setAlumni(res.data);
//       setFiltered(res.data);

//     } catch (error) {
//       toast.error("Failed to fetch alumni");
//     }
//   };

//   useEffect(() => {
//     fetchAlumni();
//   }, []);

//   /* ================= FILTER ================= */

//   useEffect(() => {

//     let data = alumni;

//     if (search) {
//       data = data.filter((a) =>
//         a.name?.toLowerCase().includes(search.toLowerCase()) ||
//         a.company?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (batch) {
//       data = data.filter(
//         (a) => String(a.batch) === batch
//       );
//     }

//     setFiltered(data);

//   }, [search, batch, alumni]);

//   /* ================= VERIFY ================= */

//   const verifyAlumni = async (userId) => {

//     try {

//       await API.put(`/api/admin/verify-alumni/${userId}`);

//       toast.success("Alumni verified ");

//       fetchAlumni();

//     } catch {
//       toast.error("Verification failed");
//     }
//   };

//   /* ================= STATS ================= */

//   const total = alumni.length;

//   const verified = alumni.filter(
//     (a) => a.status === "Verified"
//   ).length;

//   const pending = alumni.filter(
//     (a) => a.status === "Pending"
//   ).length;

//   /* ================= UI ================= */

//   return (

//     <div className="p-6">

//       {/* TITLE */}

//       <h2 className="text-2xl font-semibold mb-2">
//         Alumni Management
//       </h2>

//       <p className="text-gray-500 mb-6">
//         Verify and manage alumni accounts
//       </p>

//       {/* ================= STATS ================= */}

//       <div className="grid grid-cols-4 gap-6 mb-6">

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Total Alumni</p>
//           <h3 className="text-2xl font-bold">{total}</h3>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Verified</p>
//           <h3 className="text-2xl font-bold text-green-600">
//             {verified}
//           </h3>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Pending</p>
//           <h3 className="text-2xl font-bold text-yellow-600">
//             {pending}
//           </h3>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Jobs Posted</p>
//           <h3 className="text-2xl font-bold">--</h3>
//         </div>

//       </div>

//       {/* ================= SEARCH ================= */}

//       <div className="flex gap-4 mb-6">

//         <input
//           type="text"
//           placeholder="Search by name or company"
//           className="border p-2 rounded w-72"
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-2 rounded"
//           onChange={(e) => setBatch(e.target.value)}
//         >
//           <option value="">All Batches</option>
//           <option value="2018">2018</option>
//           <option value="2019">2019</option>
//           <option value="2020">2020</option>
//           <option value="2021">2021</option>
//           <option value="2022">2022</option>
//           <option value="2023">2023</option>
//         </select>

//       </div>

//       {/* ================= TABLE ================= */}

//       <div className="bg-white rounded-xl shadow overflow-x-auto">

//         <table className="min-w-full">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="p-4 text-left">Name</th>

//               <th>Company</th>

//               <th>Designation</th>

//               <th>Department</th>

//               <th>Batch</th>

//               <th>Status</th>

//               <th className="text-center">Actions</th>

//             </tr>

//           </thead>

//           <tbody>

//             {filtered.map((a) => (

//               <tr
//                 key={a.id}
//                 className="border-t hover:bg-gray-50"
//               >

//                 {/* NAME */}

//                 <td className="p-4">

//                   <p className="font-medium">
//                     {a.name}
//                   </p>

//                   <p className="text-gray-500 text-sm">
//                     {a.email}
//                   </p>

//                 </td>

//                 {/* COMPANY */}

//                 <td>{a.company}</td>

//                 {/* DESIGNATION */}

//                 <td>{a.designation}</td>

//                 {/* DEPARTMENT */}

//                 <td>{a.department}</td>

//                 {/* BATCH */}

//                 <td>{a.batch}</td>

//                 {/* STATUS */}

//                 <td>

//                   <span
//                     className={`px-3 py-1 rounded-full text-xs text-white
//                     ${
//                       a.status === "Verified"
//                         ? "bg-green-500"
//                         : "bg-yellow-500"
//                     }`}
//                   >
//                     {a.status}
//                   </span>

//                 </td>

//                 {/* ACTIONS */}

//                 <td className="flex justify-center gap-4 p-4">

//                   {/* VIEW */}

//                   <button
//                     onClick={() => setSelected(a)}
//                     className="text-gray-600 hover:text-black"
//                   >
//                     <FaEye />
//                   </button>

//                   {/* VERIFY */}

//                   {a.status === "Pending" && (

//                     <button
//                       onClick={() => verifyAlumni(a.userId)}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <FaCheck />
//                     </button>

//                   )}

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* ================= MODAL ================= */}

//       {selected && (

//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

//           <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">

//             <h2 className="text-xl font-bold mb-2">
//               {selected.name}
//             </h2>

//             <p className="text-gray-500 text-sm mb-4">
//               {selected.email}
//             </p>

//             <div className="space-y-2 text-sm">

//               <p><b>Company:</b> {selected.company}</p>

//               <p><b>Position:</b> {selected.designation}</p>

//               <p><b>Department:</b> {selected.department}</p>

//               <p><b>Batch:</b> {selected.batch}</p>

//               <p><b>Experience:</b> {selected.experienceYears} years</p>

//             </div>

//             <div className="flex justify-end gap-3 mt-6">

//               <button
//                 onClick={() => setSelected(null)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default ManageAlumni;

import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaEye, FaCheck } from "react-icons/fa";

function ManageAlumni() {

  const [alumni, setAlumni] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");

  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1);

  const limit = 5;

  /* ================= FETCH DATA ================= */

  const fetchAlumni = async () => {

    try {

      const res = await API.get("/api/admin/pending-alumni");

      setAlumni(res.data);
      setFiltered(res.data);

    } catch {

      toast.error("Failed to fetch alumni");

    }

  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {

    let data = alumni;

    if (search) {
      data = data.filter((a) =>
        a.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.company?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (batch) {
      data = data.filter(
        (a) => String(a.batch) === batch
      );
    }

    if (department) {
      data = data.filter(
        (a) => a.department === department
      );
    }

    setFiltered(data);
    setPage(1);

  }, [search, batch, department, alumni]);

  /* ================= PAGINATION ================= */

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = filtered.slice(start, end);

  const pages = Math.ceil(filtered.length / limit);

  /* ================= VERIFY ================= */

  const verifyAlumni = async (userId) => {

    try {

      await API.put(`/api/admin/verify-alumni/${userId}`);

      toast.success("Alumni verified successfully");

      fetchAlumni();

    } catch {

      toast.error("Verification failed");

    }

  };

  /* ================= STATS ================= */

  const total = alumni.length;

  const verified = alumni.filter(
    (a) => a.status === "Verified"
  ).length;

  const pending = alumni.filter(
    (a) => a.status === "Pending"
  ).length;

  return (

    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-2">
        Alumni Management
      </h2>

      <p className="text-gray-500 mb-6">
        Verify and manage alumni accounts
      </p>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Alumni</p>
          <h3 className="text-2xl font-bold">{total}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Verified</p>
          <h3 className="text-2xl font-bold text-green-600">{verified}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-600">{pending}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Jobs Posted</p>
          <h3 className="text-2xl font-bold">--</h3>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search name or company"
          className="border p-2 rounded w-72"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="">All Batches</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="Information Technology (IT)">IT</option>
          <option value="Mechanical">Mechanical</option>
        </select>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Batch</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {paginatedData.map((a) => (

              <tr key={a.id} className="border-t hover:bg-gray-50">

                <td className="p-4">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-gray-500 text-sm">{a.email}</p>
                </td>

                <td>{a.company}</td>
                <td>{a.designation}</td>
                <td>{a.department}</td>
                <td>{a.batch}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white
                    ${
                      a.status === "Verified"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {a.status}
                  </span>

                </td>

                <td className="flex justify-center gap-4 p-4">

                  <button
                    onClick={() => setSelected(a)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaEye />
                  </button>

                  {a.status === "Pending" && (

                    <button
                      onClick={() => verifyAlumni(a.userId)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaCheck />
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}

      <div className="flex justify-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} / {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Next
        </button>

      </div>

      {/* ================= MODAL ================= */}

      {selected && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

          <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>

            <p className="text-gray-500 text-sm mb-4">{selected.email}</p>

            <div className="space-y-2 text-sm">

              <p><b>Company:</b> {selected.company}</p>
              <p><b>Position:</b> {selected.designation}</p>
              <p><b>Department:</b> {selected.department}</p>
              <p><b>Batch:</b> {selected.batch}</p>
              <p><b>Experience:</b> {selected.experienceYears} years</p>

            </div>

            <div className="flex justify-end mt-6">

              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );

}

export default ManageAlumni;