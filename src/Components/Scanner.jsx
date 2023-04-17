import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import React, { useEffect, useState } from "react";
// import "./BarcodeScanner.css";

function ScannerComponent({ childToParentScanner, cameraToggle }) {
  useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",

        {
          fps: 10,
          disableFlip: false,
          focusMode: "continuous",
          advanced: [{ zoom: 2.0 }],
          rememberLastUsedCamera: true,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
          willReadFrequently: true,
          supportedScanTypes: [
            // Html5QrcodeScanType.SCAN_TYPE_FILE,
            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          ],
          qrbox: {
            width: window.screen.width < 600 ? 200 : 300,
            height: window.screen.width < 600 ? 100 : 100,
          },
        },
        /* verbose= */ false
      );

      function onScanSuccess(data) {
        childToParentScanner(data);

        // Stop scanning
        html5QrcodeScanner
          .clear()
          .then((_) => {
            // the UI should be cleared here
          })
          .catch((error) => {
            console.log("Closing Camera Error");
            // Could not stop scanning for reasons specified in `error`.
            // This conditions should ideally not happen.
          });
      }

      function onScanFailure(error) {
        cameraToggle(html5QrcodeScanner);
        // handle scan failure, usually better to ignore and keep scanning
        console.warn(`QR error = ${error}`);
      }

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
  }, [Html5QrcodeScanner]);

  return <div id="reader"></div>;
}
export default ScannerComponent;
