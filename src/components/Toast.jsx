import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: 'var(--bg-3)',
            border: '1px solid var(--border-2)',
            color: 'var(--text-2)',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            fontWeight: 400,
            padding: '10px 20px',
            borderRadius: 4,
            letterSpacing: '0.04em',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
