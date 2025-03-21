import Message from "./Message";

const MessageList = ({ messages, username }) => {
    return (
        <ul className="message-list">
            {messages.map((msg, index) => (
                <Message key={index} message={msg} isMyMessage={msg.sender === username} />
            ))}
        </ul>
    );
};

export default MessageList;
