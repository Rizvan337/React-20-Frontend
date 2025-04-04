import React from "react";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/ping")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>React + Vite + TypeScript</h1>
      <p>Ping Response: {message}</p>
    </div>
  );
};

export default App;
