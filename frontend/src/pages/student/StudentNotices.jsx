import { useEffect, useState } from "react";
import API from "../../services/api";

import { useNavigate } from "react-router-dom";

function StudentNotices() {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {

      const res = await API.get(
        "/api/notice",
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

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Latest Notices</h2>

      {notices.map((notice) => (

        <div key={notice._id} style={styles.card}>

          {/* HEADER */}
          <div style={styles.header}>

            <div style={styles.profile}>

              <img
                src={
                  notice.createdBy?.photo
                    ? `http://localhost:3000/uploads/photos/${notice.createdBy.photo}`
                    : "/default-user.png"
                }
                alt="admin"
                style={styles.avatar}
                onClick={() => navigate(`/profile/${notice.createdBy?._id}`)}
              />

              <div>
                <p
                  style={styles.name}
                  onClick={() => navigate(`/profile/${notice.createdBy?._id}`)}
                >
                  {notice.createdBy?.name || "Admin"}
                </p>

                <p style={styles.date}>
                  {new Date(notice.createdAt).toLocaleString()}
                </p>
              </div>

            </div>

          </div>

          {/* TITLE */}
          <h3 style={styles.title}>{notice.title}</h3>

          {/* DESCRIPTION */}
          <p style={styles.description}>

            {expanded === notice._id
              ? notice.description
              : notice.description.slice(0, 120)}

            {notice.description.length > 120 && (
              <span
                style={styles.readMore}
                onClick={() =>
                  setExpanded(expanded === notice._id ? null : notice._id)
                }
              >
                {expanded === notice._id ? " Show less" : " ...Read more"}
              </span>
            )}

          </p>

        </div>

      ))}

    </div>
  );
}

export default StudentNotices;



const styles = {

  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "30px"
  },

  heading: {
    marginBottom: "25px",
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600"
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer"
  },

  name: {
    margin: 0,
    fontWeight: "600",
    cursor: "pointer"
  },

  date: {
    margin: 0,
    fontSize: "12px",
    color: "#777"
  },

  title: {
    marginTop: "10px",
    fontSize: "18px"
  },

  description: {
    marginTop: "10px",
    lineHeight: "1.6",
    color: "#444"
  },

  readMore: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500"
  }

};