import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('❌ Error contacting server.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Image */}
      <img
        src="/Background.jpg"
        alt="Doraemon Fullscreen"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Chat UI */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '30px',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <h1>🤖Ding-dong! Doraemon here!</h1>

        <textarea
          rows="4"
          placeholder="Ask Doraemon..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#00b894',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          {loading ? 'Thinking...' : 'Ask Doraemon'}
        </button>

        <div
          className="response-box"
          style={{
            marginTop: '10px',
            background: '#f1f2f6',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          <h3>Doraemon says:</h3>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
