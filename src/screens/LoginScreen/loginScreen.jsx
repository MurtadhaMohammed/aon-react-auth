import { useState } from "react";
import "./loginScreen.css";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useAppStore();

  const handleLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username,
      password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3000/api/v1/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setIsLogin(true);
          localStorage.setItem("aonToken", result.token);
          navigate("/");
        } else {
          alert(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-screen">
      <div className="form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginScreen;
