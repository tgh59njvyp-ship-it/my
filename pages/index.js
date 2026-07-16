import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateCode = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Please enter a description");
      return;
    }

    setLoading(true);
    setError("");
    setCode("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const data = await response.json();
      setCode(data.code);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>⚡ Superserver Creator</h1>
        <p>Generate custom server code with AI</p>
      </header>

      <main className={styles.main}>
        <form onSubmit={generateCode} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="prompt">What server do you want to create?</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a REST API that returns a list of todos. Include GET and POST endpoints."
              rows="4"
              className={styles.textarea}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Generating..." : "Generate Code"}
          </button>
        </form>

        {error && <div className={styles.error}>❌ {error}</div>}

        {code && (
          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <h2>Generated Code</h2>
              <button
                onClick={copyToClipboard}
                className={styles.copyButton}
              >
                {copied ? "✓ Copied" : "Copy to Clipboard"}
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code>{code}</code>
            </pre>
            <div className={styles.instructions}>
              <h3>How to use:</h3>
              <ol>
                <li>Copy the code above</li>
                <li>Go to <a href="https://superserver.io" target="_blank" rel="noopener noreferrer">Superserver.io</a></li>
                <li>Paste the code and create your server</li>
                <li>Get your custom URL instantly! 🎉</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Built with Gemini AI × Superserver</p>
      </footer>
    </div>
  );
}
