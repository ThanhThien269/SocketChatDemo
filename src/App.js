import { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";
import "./App.css";

function App() {
    const [username, setUsername] = useState(null);

    return (
        <div>
            {username ? (
                <Chat username={username} onLeave={() => setUsername(null)} />
            ) : (
                <Login onLogin={setUsername} />
            )}
        </div>
    );
}

export default App;
