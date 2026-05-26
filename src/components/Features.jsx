import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const features = [
  {
    title: 'Multi-Model Support',
    description:
      'GenAI, OpenRouter, Ollama, and local models unified in a single engine registry. Switch contexts dynamically without altering your workflow.',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </>
    ),
    gridColumn: '1 / 5',
    gridRow: '1',
    large: true,
  },
  {
    title: 'Plugin Architecture',
    description:
      'Extend core functionalities using customizable scripts or install community plugins from the elysium_additionals repository.',
    icon: (
      <path d="M12 2v4m0 0a2 2 0 104 0H20v5a2 2 0 110 4v5H15a2 2 0 10-4 0H4v-5a2 2 0 100-4V6h5a2 2 0 010-4" />
    ),
    gridColumn: '5 / 8',
    gridRow: '1',
    large: false,
  },
  {
    title: 'Daily Check-ins',
    description:
      'Run elysium log to check in, track emotional states, log milestones, and maintain a history of your engineering path.',
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <path d="M12 6v4" />
        <path d="M10 8h4" />
      </>
    ),
    gridColumn: '8 / 11',
    gridRow: '1',
    large: false,
  },
  {
    title: 'Config & Key Management',
    description:
      'Manage credentials, model configs, and operational variables securely. Easily export settings to spin up agents anywhere.',
    icon: (
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    ),
    gridColumn: '1 / 4',
    gridRow: '2',
    large: false,
  },
  {
    title: 'Python Native',
    description:
      'Built strictly in Python. Runs instantly with uv. Lightweight footprint, fast installs, and zero-headache setup.',
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
    gridColumn: '4 / 7',
    gridRow: '2',
    large: false,
  },
  {
    title: 'Open & Extensible',
    description:
      'Completely open source and MIT licensed. Build custom modules, integrate proprietary tools, and fully own your workflow.',
    icon: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    gridColumn: '7 / 11',
    gridRow: '2',
    large: true,
  },
];

const cardEase = [0.16, 1, 0.3, 1];

export default function Features() {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 140,
        paddingBottom: 140,
        maxWidth: 1200,
        margin: '0 auto',
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <p
          className="font-sans"
          style={{
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'var(--text-1)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          CAPABILITIES
        </p>
        <h2
          className="font-serif"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
            color: 'var(--text-1)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          What it does
        </h2>
      </div>

      {/* Features Grid */}
      <div
        className="features-grid"
        style={{
          display: 'grid',
          gap: 16,
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              ease: cardEase,
              delay: index * 0.08,
            }}
            whileHover={{
              borderColor: 'rgba(255,255,255,0.15)',
              backgroundColor: 'var(--bg-3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="features-card"
            style={{
              gridColumn: feature.gridColumn,
              gridRow: feature.gridRow,
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: feature.large
                ? '36px 32px 48px 32px'
                : '36px 32px',
            }}
          >
            {/* Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: 20 }}
            >
              {feature.icon}
            </svg>

            {/* Title */}
            <h3
              className="font-serif"
              style={{
                fontWeight: 500,
                fontSize: '1.3rem',
                color: 'var(--text-1)',
                marginBottom: 10,
              }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              className="font-sans"
              style={{
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.75,
                color: 'var(--text-2)',
              }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Responsive grid styles */}
      <style>{`
        .features-grid {
          grid-template-columns: repeat(10, 1fr);
        }
        @media (max-width: 1023px) and (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .features-card {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 639px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .features-card {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 639px) {
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
