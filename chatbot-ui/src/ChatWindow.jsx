import { useEffect, useState } from "react";
import { chatAPI } from "./api";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [context, setContext] = useState({});

  // Receive context from SDK
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data?.type === "INIT_CONTEXT") {
        setContext(event.data.payload || {});
      }
    });
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatAPI.post("/chat", {
        message: input,
        sessionId,
        context
      });

      setSessionId(res.data.sessionId);

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: res.data.reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>🐾 Vet Assistant</div>

      <div style={styles.chatArea}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
        {loading && <div style={{ fontSize: 12 }}>Typing...</div>}
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your pet..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold"
  },
  chatArea: {
    flex: 1,
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: "#f9fafb"
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    marginLeft: "8px",
    padding: "8px 12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
