import React, { useState } from "react";

import { Html5Qrcode } from "html5-qrcode";
function ScannerComponent(scannedData) {
  const [scannedDataInScanner, setScannedDataInScanner] = useState("");

  Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        // .. use this to start scanning.
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
          /* handle success */
          setScannedDataInScanner(decodedText);
          scannedData = scannedDataInScanner;
          console.log(scannedData);
          html5QrCode
            .stop()
            .then((ignore) => {
              // QR Code scanning is stopped.
            })
            .catch((err) => {
              // Stop failed, handle it.
            });
        };
        const config = {
          fps: 100,
          qrbox: {
            width: window.screen.width < 600 ? 200 : 300,
            height: window.screen.width < 600 ? 100 : 100,
          },
          aspectRatio: 1,
        };

        // ************  Back Camera hardcoded
        try {
          html5QrCode.start(
            { facingMode: { exact: "environment" } },
            config,
            qrCodeSuccessCallback
          );
          // wait 2 seconds to guarantee the camera has already started to apply the focus mode and zoom...
          setTimeout(function () {
            html5QrCode.applyVideoConstraints({
              focusMode: "continuous",
              advanced: [{ zoom: 2.0 }],
            });
          }, 2000);
        } catch (error) {
          console.log("Unable to start scanning.", error);
        }

        // // ************  Back Camera
        // html5QrCode.start(
        //   { deviceId: { exact: cameraId } },
        //   config,
        //   qrCodeSuccessCallback
        // );

        // *** front camera
        // html5QrCode.start(
        //   { facingMode: "user" },
        //   config,
        //   qrCodeSuccessCallback
        // );
      }
    })
    .catch((err) => {
      // handle err
    });

  return <div id="reader"></div>;
}
export default ScannerComponent;
