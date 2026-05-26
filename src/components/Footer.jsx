import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

export default function Footer() {
  const [ref, isInView] = useInView();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
      style={{
        paddingTop: 60,
        paddingBottom: 60,
        paddingLeft: 40,
        paddingRight: 40,
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        textAlign: 'center',
        gap: 16,
      }}
    >
      {/* Line 1 */}
      <div className="flex flex-row items-center" style={{ gap: 12 }}>
        <span
          className="font-serif"
          style={{
            fontWeight: 400,
            fontSize: 14,
            letterSpacing: '0.25em',
            color: 'var(--text-2)',
          }}
        >
          E.L.Y.S.I.U.M
        </span>
        <span
          className="font-sans"
          style={{
            background: 'var(--bg-3)',
            border: '1px solid var(--border-2)',
            color: 'var(--text-3)',
            fontSize: 11,
            fontWeight: 400,
            padding: '2px 8px',
            borderRadius: 2,
            letterSpacing: '0.08em',
          }}
        >
          v0.0.1
        </span>
      </div>

      {/* Line 3 */}
      <p
        className="font-sans"
        style={{
          fontWeight: 300,
          fontSize: 13,
          color: 'var(--text-3)',
          letterSpacing: '0.1em',
          margin: 0,
        }}
      >
        <a
          href="https://github.com/Shishir-Kc/E.L.Y.S.I.U.M"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--text-3)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          GitHub
        </a>
      </p>

      {/* Line 4 */}
      <p
        style={{
          fontSize: 11,
          color: 'var(--text-3)',
          letterSpacing: '0.15em',
          textTransform: 'lowercase',
          margin: 0,
        }}
      >
        
      </p>

      {/* Mobile responsive padding */}
      <style>{`
        @media (max-width: 640px) {
          motion.footer, footer {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </motion.footer>
  );
}
