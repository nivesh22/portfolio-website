const COLOR_1 = "var(--svg-1, var(--primary, #00e5ff))";
const COLOR_2 = "var(--svg-2, var(--accent, #a855f7))";

/* ----------------------------------------------------------
   1. Analytics Strategy & Leadership (existing)
---------------------------------------------------------- */
export function MiniNetwork() {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={COLOR_1} strokeOpacity="0.6" strokeWidth="1.5" className="dash">
        <line x1="8" y1="12" x2="28" y2="6" />
        <line x1="28" y1="6" x2="52" y2="10" />
        <line x1="28" y1="6" x2="40" y2="18" />
        <line x1="8" y1="12" x2="22" y2="18" />
        <line x1="52" y1="10" x2="72" y2="12" />
        <line x1="40" y1="18" x2="64" y2="20" />
      </g>
      <g fill={COLOR_1}>
        <circle cx="8" cy="12" r="2" />
        <circle cx="22" cy="18" r="2" />
        <circle cx="28" cy="6" r="2" />
        <circle cx="40" cy="18" r="2" />
        <circle cx="52" cy="10" r="2" />
        <circle cx="64" cy="20" r="2" />
        <circle cx="72" cy="12" r="2" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------
   2. Responsible AI Enablement (existing hex spin)
---------------------------------------------------------- */
export function MiniResponsibleAI() {
  return (
    <svg
      width="80"
      height="24"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rotating Orbit */}
      <ellipse
        cx="60"
        cy="20"
        rx="34"
        ry="12"
        stroke={COLOR_1}
        strokeWidth="1.5"
        strokeDasharray="3 4"
        strokeOpacity="0.7"
        className="spin-medium"
      />

      {/* Brain Outline */}
      <path
        d="
          M50 15
          c-3 0 -5 2.4 -5 5.2
          c0 1.9 0.8 3.4 2.1 4.4
          c-0.4 1.1 -0.6 2.2 -0.6 3.3
          c0 4.8 3.6 8.5 8.2 8.5

          M70 15
          c3 0 5 2.4 5 5.2
          c0 1.9 -0.8 3.4 -2.1 4.4
          c0.4 1.1 0.6 2.2 0.6 3.3
          c0 4.8 -3.6 8.5 -8.2 8.5

          M58 10
          c-3 0 -5.4 2.5 -5.4 5.6
          v1.2
          c-2 0.6 -3.4 2.3 -3.4 4.4
          c0 2 1.3 3.7 3.4 4.4
          v3
          c0 3 2.4 5.6 5.4 5.6
          h2

          M62 10
          c3 0 5.4 2.5 5.4 5.6
          v1.2
          c2 0.6 3.4 2.3 3.4 4.4
          c0 2 -1.3 3.7 -3.4 4.4
          v3
          c0 3 -2.4 5.6 -5.4 5.6
          h-2

          M60 10
          v26
        "
        stroke={COLOR_1}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shield (fade + slide-in) */}
      <g opacity="0" className="shield-appear">
        <path
          d="
            M78 20
            l6 -2.4
            l6 2.4
            v6
            c0 4.3 -3 8 -6 9.2
            c-3 -1.2 -6 -4.9 -6 -9.2
            z
          "
          stroke={COLOR_2}
          strokeWidth="1.8"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M80.5 24.5 l2.5 3 l4.5 -5.5"
          stroke={COLOR_2}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Inline CSS animation hooks */}
      <style>{`
        .spin-medium {
          transform-origin: 60px 20px;
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .shield-appear {
          animation: fadeInUp 0.4s ease-out 0.4s forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </svg>
  );
}


/* ----------------------------------------------------------
   3. Predictive & Causal Modeling (NEW)
---------------------------------------------------------- */
export function MiniCausalPredict() {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Input wave */}
      <path
        d="M4 14 Q10 6 16 14"
        stroke={COLOR_1}
        strokeOpacity="0.7"
        strokeWidth="1.6"
        fill="none"
        className="dash"
      />

      {/* Causal branching */}
      <path
        d="M16 14 L32 8"
        stroke={COLOR_1}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <path
        d="M16 14 L32 18"
        stroke={COLOR_1}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />

      {/* Delta arrow in the middle */}
      <path
        d="M32 8 L40 12 L32 18"
        stroke={COLOR_2}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pulse-fast"
      />

      {/* Outcomes */}
      <g fill={COLOR_1}>
        <circle cx="52" cy="10" r="2" />
        <circle cx="52" cy="18" r="2" />
        <circle cx="68" cy="14" r="2.2" fill={COLOR_2} />
      </g>

      {/* Outcome connectors */}
      <line x1="40" y1="12" x2="52" y2="10" stroke={COLOR_1} strokeWidth="1.3" strokeOpacity="0.7" />
      <line x1="40" y1="12" x2="52" y2="18" stroke={COLOR_1} strokeWidth="1.3" strokeOpacity="0.7" />
      <line x1="52" y1="10" x2="68" y2="14" stroke={COLOR_1} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="52" y1="18" x2="68" y2="14" stroke={COLOR_1} strokeWidth="1.2" strokeOpacity="0.6" />

    </svg>
  );
}