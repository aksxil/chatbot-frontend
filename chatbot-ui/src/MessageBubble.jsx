export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? "#2563eb" : "#e5e7eb",
        color: isUser ? "#fff" : "#000",
        padding: "8px 12px",
        borderRadius: "12px",
        marginBottom: "6px",
        maxWidth: "80%",
        fontSize: "14px"
      }}
    >
      {content}
    </div>
  );
}
