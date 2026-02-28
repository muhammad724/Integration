import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      // ✅ Axios POST request
      const res = await axios.post("http://localhost:3000/ask", {
        prompt,
      });

      setResponse(res.data.answer);
    } catch (error) {
      console.error(error);
      setResponse(
        error.response?.data?.error || "Error connecting to server."
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Gemini AI Chat</h1>

      <textarea
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={askAI} style={styles.button}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div style={styles.response}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: "50px auto", textAlign: "center", fontFamily: "Arial" },
  textarea: { width: "100%", height: 100, padding: 10, marginBottom: 10 },
  button: { padding: "10px 20px", cursor: "pointer" },
  response: { marginTop: 20, textAlign: "left", background: "#f4f4f4", padding: 15, borderRadius: 8 },
};

export default App;