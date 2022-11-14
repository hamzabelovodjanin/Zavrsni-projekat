import { useEffect, useState } from "react";
import HomePage from "./components/Pages/HomePage/HomePage";
import "../src/App.css";
import Login from "./components/Pages/LoginPage/Login";

function App() {
  const [loged, setLoged] = useState(false);

  const valueOfTokenInLocal = localStorage.getItem("token");

  useEffect(() => {
    if (valueOfTokenInLocal) {
      setLoged(valueOfTokenInLocal);
    } else {
      setLoged(false);
    }
  }, [valueOfTokenInLocal]);
  if (valueOfTokenInLocal) {
    return (
      <div className="main">
        <HomePage isLoged={loged} logedFunc={(e) => setLoged(e)} />
      </div>
    );
  }

  return (
    <div className="main">
      <Login logedFunc={(e) => setLoged(e)} />
    </div>
  );
}

export default App;
