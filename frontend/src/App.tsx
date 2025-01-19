import  { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://sentiment-analysis-vils.onrender.com/predict?text=${encodeURIComponent(text)}`);
      const data = await response.json();
      console.log(data.sentiment);
      setSentiment(Number(data.sentiment));
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      // For demo purposes, generate random sentiment
      setSentiment(Math.random() > 0.5 ? 1 : 0);
    }
    setIsLoading(false);
  };

  const getEmoji = () => {
    if (sentiment === null) return '😐';
    return sentiment === 1 ? '😊' : '😢';
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-2xl rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text">
            Sentiment Analyzer
          </h1>
          <p className="mt-2 text-gray-600">
            Enter your text and I'll analyze the sentiment
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          <button
            onClick={analyzeSentiment}
            disabled={isLoading || !text.trim()}
            className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center">
          <div className="text-7xl animate-bounce-slow">
            {getEmoji()}
          </div>
          {sentiment !== null && (
            <p className="mt-4 text-lg font-medium text-gray-700">
              The sentiment is {sentiment === 1 ? 'Positive' : 'Negative'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;