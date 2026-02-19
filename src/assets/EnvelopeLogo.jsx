export default function EnvelopeLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="210" cy="310" rx="120" ry="25" fill="#000" opacity="0.08"/>

      <rect x="90" y="160" width="240" height="150" rx="40" fill="#ff6f61"/>

      <path d="M90 160 L210 245 L330 160 Q300 130 210 130 Q120 130 90 160 Z"
        fill="#f48fb1"/>

      <path d="M90 160 L210 245 L330 160"
        stroke="#e53935"
        strokeWidth="5"
        fill="none"/>

      <ellipse cx="170" cy="210" rx="22" ry="18" fill="white"/>
      <circle cx="170" cy="212" r="8" fill="#222"/>

      <ellipse cx="250" cy="210" rx="22" ry="18" fill="white"/>
      <circle cx="250" cy="212" r="8" fill="#222"/>

      <path d="M150 180 Q170 165 190 180"
        stroke="#333"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"/>

      <path d="M230 180 Q250 165 270 180"
        stroke="#333"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"/>
    </svg>
  );
}
