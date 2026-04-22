import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from "./components/Navbar"
import Galaxy from "./components/Galaxy"
import PromptInput from "./components/PromptInput"
import ChatMessage from "./components/ChatMessage"
import SplitText from "./components/SplitText"
import TypingIndicator from "./components/TypingIndicator"

function App() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handlePromptSubmit = useCallback(async (prompt) => {
    if (!prompt.trim()) return;

    setIsChatMode(true);
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) throw new Error('Failed to fetch response from Elysium');

      const data = await response.json();
      const contentArray = data.message?.content || [];

      const thinkingPart = contentArray.find(part => part.type === 'thinking')?.thinking || null;
      const textPart = contentArray.find(part => part.type === 'text')?.text || "I'm sorry, I couldn't understand the response.";

      setMessages(prev => [...prev, { role: 'ai', content: textPart, thinking: thinkingPart }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "I'm sorry, I'm having trouble connecting to the Elysium backend right now. 🌌"
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-ivory transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: isChatMode ? '#000000' : '#0A0A0A' }}
    >
      {/* ── Galaxy Background — always mounted, fades out to avoid flash ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: isChatMode ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Galaxy
          mouseInteraction={false}
          mouseRepulsion={false}
          density={0.8}
          glowIntensity={0.1}
          saturation={0}
          hueShift={200}
          twinkleIntensity={0.1}
          rotationSpeed={0}
          repulsionStrength={3}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          paused={isChatMode}
        />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Greeting — fades out when chat starts ── */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
        style={{
          paddingBottom: '120px',   /* nudge text above the input */
          opacity: isChatMode ? 0 : 1,
          transition: 'opacity 0.45s ease',
        }}
      >
        <SplitText
          text="what's supp !"
          className="text-5xl md:text-7xl font-semibold text-center text-ivory tracking-tight"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="center"
        />
      </div>

      {/* ── Chat messages — fades in when chat starts ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{
          opacity: isChatMode ? 1 : 0,
          pointerEvents: isChatMode ? 'auto' : 'none',
          transition: 'opacity 0.5s ease 0.35s',
        }}
      >
        <div className="w-full flex-1 overflow-y-auto scrollbar-hide">
          <div className="w-full flex flex-col items-center">
            {/* Spacer to clear fixed navbar */}
            <div className="h-28 flex-shrink-0" />

            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
                thinking={msg.thinking}
              />
            ))}

            {isLoading && (
              <div className="mb-8 w-full max-w-3xl mx-auto px-6">
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
            {/* Padding so last message isn't hidden behind the fixed input */}
            <div className="h-28 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* ── Single PromptInput — slides from center → bottom ── */}
      <div
        className="absolute z-20 w-full px-4 flex justify-center"
        style={{
          bottom: isChatMode ? '0px' : '50%',
          transform: isChatMode ? 'translateY(0)' : 'translateY(70px)',
          paddingBottom: isChatMode ? '24px' : '0px',
          transition: [
            'bottom 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
            'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
            'padding-bottom 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
          ].join(', '),
        }}
      >
        <div className="w-full max-w-3xl">
          <PromptInput onSubmit={handlePromptSubmit} />
        </div>
      </div>
    </div>
  );
}

export default App