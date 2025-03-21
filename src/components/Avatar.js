const colors = [
    "#2196F3", "#32c787", "#00BCD4", "#ff5652",
    "#ffc107", "#ff85af", "#FF9800", "#39bbb0"
];

export const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = 31 * hash + name.charCodeAt(i);
    }
    let index = Math.abs(hash % colors.length);
    return colors[index];
};

const Avatar = ({ sender }) => {
    return (
        <i className="avatar-icon" style={{ backgroundColor: getAvatarColor(sender) }}>
            {sender[0].toUpperCase()}
        </i>
    );
};

export default Avatar;
