import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import Avatar from "./Avatar";
import MessageList from "./MessageList";

const Chat = ({ username,onLeave }) => {

    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket, // Dùng SockJS làm WebSocket
            reconnectDelay: 5000, // Tự động kết nối lại sau 5 giây
            onConnect: () => {
                console.log("Connected to WebSocket");
                setIsConnected(true); // ✅ Cập nhật trạng thái kết nối

                stompClient.subscribe("/topic/public", (message) => {
                    setMessages((prev) => [...prev, JSON.parse(message.body)]);
                });

                stompClient.publish({
                    destination: "/app/chat.addUser",
                    body: JSON.stringify({ sender: username, type: "JOIN" }),
                });
            },
            onStompError: (frame) => {
                console.error("Broker error: " + frame.headers["message"]);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, [username]);

    const leaveChat = () => {
        if (client) {
            const chatMessage = {
                sender: username,
                type: "LEAVE",
            };

            client.publish({
                destination: "/app/chat.addUser",
                body: JSON.stringify(chatMessage),
            });

            client.deactivate();
            console.log('logout')
            onLeave();
        }
    };
    const sendMessage = (event) => {
        event.preventDefault();
        const messageContent = event.target.message.value.trim();
        if (messageContent && client?.connected) { // ✅ Kiểm tra client đã kết nối chưa
            const chatMessage = { sender: username, content: messageContent, type: "CHAT" };

            client.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(chatMessage),
            });

            event.target.message.value = "";
        }
    };

    return (
        <div id="chat-page">
            <div className="header">
                <Avatar sender={username} />
                <button id="exitButton" onClick={leaveChat} className="exit-btn">Exit group chat</button>
            </div>
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Spring WebSocket Chat Demo</h2>
                </div>
                {!isConnected && <div className="connecting">Connecting...</div>}  {/* ✅ Fix Connecting... */}
                <MessageList messages={messages} username={username} />
                <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control"/>
                            <button type="submit" className="primary">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
