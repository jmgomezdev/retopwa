export const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

export const timeShortFormatter = new Intl.DateTimeFormat("es-ES", {
  timeStyle: "short",
  timeZone: "GMT",
});

export const timeFormatter = new Intl.DateTimeFormat("es-ES", {
  timeStyle: "medium",
  timeZone: "GMT",
});
