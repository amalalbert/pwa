// script.js

// Register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Handle install prompt
let deferredPrompt;
const installBtn = document.getElementById("install-btn");

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.style.display = "block";

  installBtn.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
      installBtn.style.display = "none";
    });
  });
});

// Check if the browser supports Web Bluetooth API
if ('bluetooth' in navigator) {
  const requestBluetoothDevice = async () => {
    try {
      // Request a Bluetooth device with specific filters (e.g., device name or service UUID)
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Accept all Bluetooth devices (you can filter here based on name, services, etc.)
        optionalServices: ['battery_service'] // You can specify the Bluetooth services your app wants to access
      });

      // Connect to the device and start interacting with it
      console.log('Bluetooth device selected:', device);
      
      // For example, you can use device.gatt.connect() for GATT operations
      const server = await device.gatt.connect();
      console.log('Connected to GATT server:', server);

    } catch (error) {
      console.error('Bluetooth request failed:', error);
    }
  };

  // Add event listener to trigger the Bluetooth device request
  document.getElementById('connect-bluetooth-btn').addEventListener('click', requestBluetoothDevice);
} else {
  console.log('Web Bluetooth API not supported in this browser.');
}
