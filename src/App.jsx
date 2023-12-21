import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import LoginScreen from "./screens/LoginScreen/loginScreen";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
  const [msg, setMsg] = useState("");
  const [msgRec, setMsgRec] = useState("");
  const [msgList, setMsgList] = useState([]);

  var socket = io("http://localhost:3000", {
    autoConnect: true,
  });

  useEffect(() => {
    let onConnect = () => {
      console.log("Connected");
    };

    let onEmit = (arg) => {
      setMsgRec(arg);
    };

    socket.on("reciveMsg", onEmit);

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("reciveMsg", onEmit);
    };
  }, []);

  useEffect(() => {
    if (msgRec) setMsgList([...msgList, msgRec]);
  }, [msgRec]);

  const handleSend = () => {
    socket.emit("message", msg);
    setMsg("")
  };

  return (
    <div>
      <p>Message </p>
      <ul>
        {msgList.map((el, i) => (
          <li key={i}>{el}</li>
        ))}
      </ul>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      {/* <Routes>
        <Route path="/" element={<ProtectedRoute comp={<HomeScreen />} />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes> */}
    </div>
  );
};

export default App;
