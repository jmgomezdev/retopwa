import { ServiceWorkerGlobalScope } from "@/types/service-worker";

declare let self: ServiceWorkerGlobalScope;
self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event);
});

self.addEventListener("install", () => {
  console.log("service worker installed");
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});
