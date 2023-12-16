import { useNavigate } from "react-router-dom";
import "./homeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("aonToken");
  };

  return (
    <div className="home-screen">
      <div>Home Screen From Comp</div>{" "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
