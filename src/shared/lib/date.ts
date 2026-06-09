export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatScheduleDate = (dateString: string) => {
    const date = new Date(dateString);
    return `c ${date.getDate()} ${date.toLocaleString("en", { month: "short" })} ${date.getFullYear()}`;
  };

  