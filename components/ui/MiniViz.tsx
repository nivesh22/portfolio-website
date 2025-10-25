export function MiniNetwork() {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#00E5FF" strokeOpacity="0.6" strokeWidth="1.5" className="dash">
        <line x1="8" y1="12" x2="28" y2="6" />
        <line x1="28" y1="6" x2="52" y2="10" />
        <line x1="28" y1="6" x2="40" y2="18" />
        <line x1="8" y1="12" x2="22" y2="18" />
        <line x1="52" y1="10" x2="72" y2="12" />
        <line x1="40" y1="18" x2="64" y2="20" />
      </g>
      <g fill="#00E5FF">
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

export function MiniHexSpin() {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(40,12)">
        <polygon
          points="10,0 5,8 -5,8 -10,0 -5,-8 5,-8"
          className="spin-slower"
          stroke="#00E5FF"
          strokeOpacity="0.7"
          strokeWidth="2"
          fill="transparent"
        />
        <circle cx="0" cy="0" r="1.8" fill="#00E5FF" />
      </g>
    </svg>
  );
}

export function MiniTrend() {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 18 L12 14 L20 16 L30 10 L42 12 L52 8 L62 11 L78 6"
        stroke="#00E5FF"
        strokeOpacity="0.8"
        strokeWidth="1.6"
        fill="transparent"
        className="dash"
      />
    </svg>
  );
}
