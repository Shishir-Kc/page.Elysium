import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const ease = [0.16, 1, 0.3, 1];

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      style={{
        padding: '140px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '60px',
          flexWrap: 'wrap',
        }}
      >
        {/* Left column */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          style={{
            flex: '0 0 55%',
            position: 'relative',
            paddingLeft: '28px',
          }}
        >
          {/* Gradient left border */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
            }}
          />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.15,
              color: 'var(--text-1)',
              margin: 0,
            }}
          >
            A CLI companion that thinks with you, not for you.
          </p>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            E.L.Y.S.I.U.M is designed to sit alongside your development terminal as a reflective AI assistant. Rather than generating boilerplate code blindly, it prompts systems-level reasoning to help you navigate architecture decisions.
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            Built on a modular registry system, it integrates seamlessly with your local CLI. Load custom plugins, switch inference engines dynamically, and coordinate local pipelines directly from a unified configuration.
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'var(--text-2)',
              margin: 0,
            }}
          >
            By documenting your mental blockages, daily structures, and system accomplishments, E.L.Y.S.I.U.M creates a local, private journal that logs your developer growth alongside the systems you build.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          section > div {
            flex-direction: column !important;
          }
          section > div > div {
            flex: 1 1 100% !important;
          }
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
