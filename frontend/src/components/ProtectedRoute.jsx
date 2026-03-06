import { Navigate } from "react-router-dom";

function ProtectedRoute({ children,role }) {

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("logged user: ",user);

  if(!user){
    return <Navigate to="/login" />;

  }
  if(user.role !== role){
    return <Navigate to="/" />
  }
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return children;
}

export default ProtectedRoute;