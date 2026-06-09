export const DAYS_TRANSLATION = [
  { key: "monday", label: "MONDAY" },
  { key: "tuesday", label: "TUESDAY" },
  { key: "wednesday", label: "WEDNESDAY" },
  { key: "thursday", label: "THURSDAY" },
  { key: "friday", label: "FRIDAY" },
  { key: "saturday", label: "SATURDAY" },
  { key: "sunday", label: "SUNDAY" },
] as const;

export const initialDayState = {
  workoutName: "",
  time: "",
  exercises: [],
};