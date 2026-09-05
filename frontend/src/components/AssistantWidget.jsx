import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, ChevronRight } from 'lucide-react';

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init',
      sender: 'assistant',
      text: 'Hi! I can help you with sustainable clothing choices.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What should I do with old jeans?",
    "Can I donate this shirt?",
    "Give me upcycling ideas for a T-shirt."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const message = textToSend || inputText.trim();
    if (!message || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: message
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          history: messages.slice(-4)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'assistant',
            text: data.reply || "I'm here to help you explore sustainable options for your clothing."
          }
        ]);
      } else {
        throw new Error('Chat API returned error');
      }
    } catch (err) {
      let fallbackReply = "You can extend garment life by repairing minor seams, donating wearable pieces, or upcycling worn cotton and denim into handy bags and cleaning cloths.";
      if (message.toLowerCase().includes("jeans") || message.toLowerCase().includes("denim")) {
        fallbackReply = "Old denim is durable! You can transform jeans into a sturdy tote bag, plant pot sleeve, or cut them into summer cutoff shorts.";
      } else if (message.toLowerCase().includes("donate")) {
        fallbackReply = "If the garment is clean, odor-free, and wearable, donation is a wonderful choice to help others in the community.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: fallbackReply
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside aria-label="ReThread Assistant" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Circular Launcher Button matching the mockup */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#527557] hover:bg-[#436247] text-white flex items-center justify-center shadow-[0_8px_30px_0_rgba(82,117,87,0.35)] transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Open ReThread Assistant"
        >
          <svg
            className="w-7 h-7 transition-transform group-hover:rotate-45 duration-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 10 11 12 12C14 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
            <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14 13 12 12C10 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" />
            <path d="M2 12C2 14.5 4 16.5 6.5 16.5C9 16.5 11 14 12 12C11 10 9 7.5 6.5 7.5C4 7.5 2 9.5 2 12Z" />
            <path d="M22 12C22 9.5 20 7.5 17.5 7.5C15 7.5 13 10 12 12C13 14 15 16.5 17.5 16.5C20 16.5 22 14.5 22 12Z" />
          </svg>
        </button>
      )}

      {/* Floating Chat Panel matching the mockup */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[340px] rounded-3xl glass-panel bg-white/95 backdrop-blur-2xl border border-white/95 shadow-[0_20px_60px_0_rgba(60,85,65,0.2)] flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#1F2E24]/10 bg-white/40">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#527557]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 10 11 12 12C14 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
                  <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14 13 12 12C10 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" />
                  <path d="M2 12C2 14.5 4 16.5 6.5 16.5C9 16.5 11 14 12 12C11 10 9 7.5 6.5 7.5C4 7.5 2 9.5 2 12Z" />
                  <path d="M22 12C22 9.5 20 7.5 17.5 7.5C15 7.5 13 10 12 12C13 14 15 16.5 17.5 16.5C20 16.5 22 14.5 22 12Z" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1F2E24]">ReThread Assistant</span>
                <span className="text-[10px] text-[#527557] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#527557]" />
                  Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#5A6E60] hover:text-[#1F2E24] hover:bg-black/5 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages & Suggestion Stack */}
          <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#527557] text-white rounded-br-none shadow-sm'
                      : 'bg-white/90 text-[#1F2E24] border border-[#1F2E24]/10 rounded-bl-none shadow-subtle'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Suggested Question Pills stacked vertically like mockup */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/70 hover:bg-white text-xs text-[#1F2E24] border border-[#1F2E24]/10 hover:border-[#527557] transition-all flex items-center justify-between group shadow-subtle"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5A6E60] group-hover:text-[#527557] transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-1.5 items-center text-[#5A6E60] text-xs pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#527557] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#527557] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#527557] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form at Bottom */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white/60 border-t border-[#1F2E24]/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 text-xs px-4 py-2.5 rounded-full bg-white/90 border border-[#1F2E24]/15 focus:outline-none focus:border-[#527557] text-[#1F2E24] placeholder:text-[#5A6E60]/60"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="w-8 h-8 rounded-full bg-[#527557] hover:bg-[#436247] disabled:opacity-40 text-white flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </aside>
  );
}
