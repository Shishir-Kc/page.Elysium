import { useState } from 'react';
import { motion } from 'framer-motion';
import Status from './Status';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const installCmd = 'curl -fsSL https://elysium.shishirkhatri.com.np/install.sh | sh';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      style={{
        height: '100svh',
        overflow: 'hidden',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {/* Layer 2: radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(224,108,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 3: dot grid */}
      <div
        className="dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 4: edge fade */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, #0d0c0b 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '100vh',
        }}
      >
        {/* 1. ELYSIUM heading */}
        <motion.div variants={itemVariants}>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: 'clamp(7rem, 14vw, 13rem)',
              letterSpacing: '0.08em',
              color: 'var(--text-1)',
              lineHeight: 1,
              margin: 0,
            }}
          >
            ELYSIUM
          </h1>
        </motion.div>

        {/* 4. Description */}
        <motion.div variants={itemVariants}>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '16px',
              color: 'var(--text-2)',
              maxWidth: '400px',
              margin: '20px auto 0 auto',
              lineHeight: 1.7,
            }}
          >
            Personal Home AI Assistant
          </p>
        </motion.div>

        {/* Status Tags */}
        <motion.div variants={itemVariants}>
          <Status />
        </motion.div>

        {/* 5. Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            marginTop: '36px',
          }}
        >
          {/* Install Command */}
          <div
            onClick={handleCopy}
            title="Click to copy"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              padding: '12px 20px',
              borderRadius: '4px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px',
              color: 'var(--text-3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <span style={{ color: 'var(--accent)' }}>$</span>
            <span>{copied ? 'Copied!' : installCmd}</span>
          </div>

          {/* Button B: View on GitHub */}
          <a 
            href="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none' }}
          >
            <button
              style={{
                background: 'transparent',
                border: '1px solid var(--border-2)',
                color: 'var(--text-2)',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.06em',
                padding: '12px 32px',
                borderRadius: '2px',
                cursor: 'pointer',
                transition:
                  'border-color 0.25s ease, color 0.25s ease, transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--text-1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-2)';
                e.currentTarget.style.color = 'var(--text-2)';
              }}
            >
              View on GitHub
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
