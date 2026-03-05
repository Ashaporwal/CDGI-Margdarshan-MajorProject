import { useEffect, useState } from "react";
import axios from "axios";

function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/notice/notice",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setNotices(res.data.notices);

    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Latest Notices</h2>

      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{notice.title}</h3>
            <p>{notice.description}</p>
            <small>
              {new Date(notice.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default StudentNotices;