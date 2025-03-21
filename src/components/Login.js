import { useRef } from "react";

const Login = ({ onLogin }) => {
    const usernameRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = usernameRef.current.value.trim();
        if (username) {
            onLogin(username);
            usernameRef.current.value = "";
        }
    };

    return (
        <div id="username-page">
            <div className="username-page-container">
                <h1 className="title">Type your username to enter the Chatroom</h1>
                <form id="usernameForm" name="usernameForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            ref={usernameRef}
                            placeholder="Username"
                            autoComplete="off"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="accent username-submit">
                            Start Chatting
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
