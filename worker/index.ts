import {
  NotificationEvent,
  PushEvent,
  ServiceWorkerGlobalScope,
} from "@/types/service-worker";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  console.log("service worker installed");
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});

self.addEventListener("message", function (event: MessageEvent) {
  const data = event.data;
  console.log(data);
  const options = {
    body: data.title,
    icon: "/favicon.ico",
    image: data.image_url,
    actions: [
      { action: "play", title: "Play" },
      { action: "pause", title: "Pause" },
      { action: "next", title: "Siguiente" },
      { action: "prev", title: "Anterior" },
    ],
  };
  self.registration.showNotification("Reproduciendo podcast", options);
});

self.addEventListener("notificationclick", function (event: NotificationEvent) {
  event.notification.close();

  switch (event.action) {
    case "play":
      console.log("play");
      break;
    case "pause":
      console.log("pause");
      break;
    case "next":
      console.log("next");
      break;
    case "prev":
      console.log("prev");
      break;
    default:
      console.log("nana");
      break;
  }
});
