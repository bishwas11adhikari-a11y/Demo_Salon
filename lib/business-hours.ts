export type BusinessHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export const DAY_LABELS: { key: keyof BusinessHours; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export function parseBusinessHours(raw: string): BusinessHours {
  try {
    return JSON.parse(raw) as BusinessHours;
  } catch {
    return {
      monday: "Closed",
      tuesday: "Closed",
      wednesday: "Closed",
      thursday: "Closed",
      friday: "Closed",
      saturday: "Closed",
      sunday: "Closed",
    };
  }
}

export function formatBusinessHoursForPrompt(hours: BusinessHours): string {
  return DAY_LABELS.map(({ key, label }) => `${label}: ${hours[key]}`).join(
    ", "
  );
}
