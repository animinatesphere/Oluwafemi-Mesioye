export default function Logo({ compact = false }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Oluwafemi Mesioye">
      <svg
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="12" fill="#6D5DF6" />
        <path
          d="M11 13.5C11 11.567 12.567 10 14.5 10H25.5C27.433 10 29 11.567 29 13.5V26.5C29 28.433 27.433 30 25.5 30H14.5C12.567 30 11 28.433 11 26.5V13.5Z"
          stroke="#F2F0EB"
          strokeWidth="2.4"
        />
        <path
          d="M14 28.5L20 20L26 28.5M20 20L26 11.5"
          stroke="#E4B363"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="font-display text-[15px] leading-none tracking-tight text-paper">
          Oluwafemi Mesioye
        </span>
      )}
    </span>
  );
}
