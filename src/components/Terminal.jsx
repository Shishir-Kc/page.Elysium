import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const lines = [
  { text: '$ elysium log', color: 'text-1' },
  { text: '', color: '' },
  { text: '✦ E.L.Y.S.I.U.M daily check-in', color: 'accent' },
  { text: '──────────────────────────────', color: 'text-3' },
  { text: 'What did you build today?', color: 'text-2' },
  { text: '> Built the plugin registry for elysium_additionals', color: 'text-1' },
  { text: '', color: '' },
  { text: 'How are you feeling? (1-10): 7', color: 'text-2' },
  { text: '', color: '' },
  { text: '✦ Logged. Keep building.', color: 'accent' },
  { text: '', color: '' },
  { text: '$ elysium run --model gemini-2.0-flash', color: 'text-1' },
  { text: '✦ Model loaded: gemini-2.0-flash [OpenRouter]', color: 'accent' },
  { text: '✦ Ready.', color: 'accent' },
];

const colorMap = {
  'text-1': 'var(--text-1)',
  'text-2': 'var(--text-2)',
  'text-3': 'var(--text-3)',
  'accent': 'var(--accent)',
  '': 'transparent',
};

const blinkKeyframes = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

export default function Terminal() {
  const [ref, isInView] = useInView();
  const started = useRef(false);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineColor, setCurrentLineColor] = useState('text-2');
  const [done, setDone] = useState(false);

  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    setCurrentLineColor(lines[0].color);

    intervalRef.current = setInterval(() => {
      const li = lineIndex.current;
      if (li >= lines.length) {
        clearInterval(intervalRef.current);
        setCurrentLineText('');
        setDone(true);
        return;
      }

      const currentLine = lines[li];

      // Empty lines: push immediately, advance
      if (currentLine.text === '') {
        setDisplayedLines(prev => [...prev, { text: '', color: currentLine.color }]);
        setCurrentLineText('');
        lineIndex.current += 1;
        if (lineIndex.current < lines.length) {
          setCurrentLineColor(lines[lineIndex.current].color);
        }
        return;
      }

      const ci = charIndex.current;

      if (ci < currentLine.text.length) {
        charIndex.current += 1;
        setCurrentLineText(currentLine.text.slice(0, ci + 1));
      } else {
        // Line complete
        setDisplayedLines(prev => [...prev, { text: currentLine.text, color: currentLine.color }]);
        setCurrentLineText('');
        charIndex.current = 0;
        lineIndex.current += 1;
        if (lineIndex.current < lines.length) {
          setCurrentLineColor(lines[lineIndex.current].color);
        }
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isInView]);

  return (
    <section
      style={{
        width: '100%',
        background: 'var(--bg-2)',
        padding: '120px 0',
      }}
    >
      <style>{blinkKeyframes}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          ELYSIUM IN ACTION
        </p>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 5vw, 4rem)',
            color: 'var(--text-1)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          See it run.
        </h2>
      </div>

      {/* Terminal window */}
      <div
        ref={ref}
        style={{
          maxWidth: 740,
          margin: '0 auto',
          padding: '0 40px',
        }}
        className="max-[640px]:!px-6"
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: '1px solid var(--border-2)',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: '#1a1714',
              height: 44,
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#27c93f',
                }}
              />
            </div>
            {/* Center title */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 400,
                fontSize: 12,
                color: 'var(--text-3)',
                letterSpacing: '0.05em',
              }}
            >
              elysium — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              background: '#0a0908',
              padding: '28px 32px',
              minHeight: 340,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              lineHeight: 1.9,
              color: 'var(--text-2)',
            }}
          >
            {/* Already-typed lines */}
            {displayedLines.map((line, i) => (
              <div key={i} style={{ color: colorMap[line.color] || 'var(--text-2)' }}>
                {line.text === '' ? '\u00A0' : line.text}
              </div>
            ))}

            {/* Currently typing line */}
            {!done && currentLineText !== '' && (
              <div style={{ color: colorMap[currentLineColor] || 'var(--text-2)' }}>
                {currentLineText}
              </div>
            )}

            {/* Blinking cursor after done */}
            {done && (
              <div>
                <span
                  style={{
                    color: 'var(--accent)',
                    animation: 'blink 1.1s ease-in-out infinite',
                  }}
                >
                  █
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
