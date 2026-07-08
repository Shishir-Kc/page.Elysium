import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CONFIG_URL = 'https://raw.githubusercontent.com/Shishir-Kc/E.L.Y.S.I.U.M/refs/heads/main/ElysiumConfig/config.json';

export default function Status() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(CONFIG_URL)
      .then((res) => res.json())
      .then((json) => setData(json.elysium))
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '24px',
      }}
    >
      <Tag label={data.status} />
      <Divider />
      <Tag label={`v${data.version}`} />
      <Divider />
      <Tag label={data.version_name} />
      <Divider />
      <Tag label={`stable: ${data.stable}`} />
      <Divider />
      <Tag label={data.last_development_changes} />
    </motion.div>
  );
}

function Tag({ label }) {
  return (
    <span
      style={{
        background: 'var(--bg-3)',
        border: '1px solid var(--border-2)',
        color: 'var(--text-3)',
        fontSize: 11,
        fontWeight: 400,
        padding: '4px 10px',
        borderRadius: 2,
        letterSpacing: '0.06em',
        textTransform: 'lowercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function Divider() {
  return (
    <span style={{ color: 'var(--border-2)', fontSize: 11 }}>|</span>
  );
}
