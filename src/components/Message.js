import Avatar from "./Avatar";
import { getAvatarColor } from "./Avatar";

const Message = ({ message, isMyMessage }) => {
    if (message.type === "JOIN" || message.type === "LEAVE") {
        return (
            <li className="event-message">
                {message.sender === "You"
                    ? `You ${message.type === "JOIN" ? "joined!" : "left!"}`
                    : `${message.sender} ${message.type === "JOIN" ? "joined!" : "left!"}`}
            </li>
        );
    }

    return (
        <li className={isMyMessage ? "my-message" : "other-message"}>
            {isMyMessage ? (
                <div className="my-message-container" style={{ backgroundColor: getAvatarColor(message.sender), color: "white" }}>
                    <p>{message.content}</p>
                </div>
            ) : (
                <div className="other-message-container">
                    <Avatar sender={message.sender} />
                    <span className="username">{message.sender}</span>
                    <p>{message.content}</p>
                </div>
            )}
        </li>
    );
};

export default Message;
