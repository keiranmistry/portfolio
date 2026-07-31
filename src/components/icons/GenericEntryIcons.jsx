// Fallback SVG icons for Education/Work rows that don't have a logo image yet.
// Add new entries here and reference them by key via `fallbackIcon` in experienceData.js.

function DroneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="2.2" />
      <path strokeLinecap="round" d="M12 9.8 6 6M12 9.8l6-3.8M12 14.2 6 18M12 14.2l6 3.8" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  );
}

function DataIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19V11M9.5 19V5M14.5 19v-7.5M19.5 19V8.5" />
    </svg>
  );
}

export const genericEntryIcons = {
  drone: DroneIcon,
  data: DataIcon,
};
