import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Post from "./Pages/Post";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import Setting from "./Pages/Setting";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={setUsername} />} />

        <Route
          path="/signup"
          element={<Signup onSignup={setUsername} />}
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              username={username}
              onSignOut={() => setUsername("")}
            />
          }
        >
          <Route index element={<Home username={username} />} />

          <Route path="post" element={<Post />} />

          <Route path="chat" element={<Chat />} />

          <Route path="account" element={<Account username={username} />} />

          <Route
            path="setting"
            element={
              <Setting
                username={username}
                onUsernameChange={setUsername}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;