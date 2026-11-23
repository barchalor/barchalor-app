importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD74zIkwLsTjv_u_vdYqOy5Kv4pRDzd8hI",
  authDomain: "barchalor.firebaseapp.com",
  projectId: "barchalor",
  storageBucket: "barchalor.firebasestorage.app",
  messagingSenderId: "404904480968",
  appId: "1:404904480968:web:f53c8182ee4202dc8795fd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "Barchalor";

  const body =
    payload?.notification?.body ||
    payload?.data?.body ||
    "You have a new notification.";

  self.registration.showNotification(title, {
    body: body,
    icon: "https://qlitobadys-lab.github.io/barchalor-app/favicon.ico",
    badge: "https://qlitobadys-lab.github.io/barchalor-app/favicon.ico",
    data: {
      url:
        payload?.data?.url ||
        "https://qlitobadys-lab.github.io/barchalor-app/"
    }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const target =
    event.notification.data?.url ||
    "https://qlitobadys-lab.github.io/barchalor-app/";

  event.waitUntil(
    (async () => {
      const windows = await clients.matchAll({
        type: "window",
        includeUncontrolled: true
      });

      for (const client of windows) {
        if ("focus" in client) {
          await client.focus();

          if ("navigate" in client) {
            await client.navigate(target);
          }

          return;
        }
      }

      if (clients.openWindow) {
        await clients.openWindow(target);
      }
    })()
  );
});
