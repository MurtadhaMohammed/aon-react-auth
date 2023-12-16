import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import LoginScreen from "./screens/LoginScreen/loginScreen";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ comp }) => {
  const { isLogin, setIsLogin } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("aonToken");
    if (token) setIsLogin(true);
    else setIsLogin(false);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading . . .</div>;

  return isLogin ? comp : <Navigate to={"/login"} />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute comp={<HomeScreen />} />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </div>
  );
};

export default App;
