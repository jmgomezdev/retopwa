import { ServiceWorkerGlobalScope } from "@/types/service-worker";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  console.log("service worker installed");
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});
