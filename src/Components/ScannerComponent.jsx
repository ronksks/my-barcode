// import React, { useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";

// function ScannerComponent({ scannedDataFromScanner }) {
//   const [scannedDataInScanner, setScannedDataInScanner] = useState("");

//   const handleQrCodeSuccess = (decodedText, decodedResult) => {
//     setScannedDataInScanner(decodedText);
//     scannedDataFromScanner(decodedText); // pass the scanned data back to the SampleBag component
//     Html5Qrcode.stop(); // stop scanning
//   };

//   Html5Qrcode.getCameras()
//     .then((devices) => {
//       if (devices && devices.length) {
//         const html5QrCode = new Html5Qrcode("reader");
//         const config = {
//           fps: 100,
//           qrbox: {
//             width: window.screen.width < 600 ? 200 : 300,
//             height: window.screen.width < 600 ? 100 : 100,
//           },
//           aspectRatio: 1,
//         };

//         try {
//           html5QrCode.start(
//             { facingMode: { exact: "environment" } },
//             config,
//             handleQrCodeSuccess
//           );
//           setTimeout(function () {
//             html5QrCode.applyVideoConstraints({
//               focusMode: "continuous",
//               advanced: [{ zoom: 2.0 }],
//             });
//           }, 2000);
//         } catch (error) {
//           console.log("Unable to start scanning.", error);
//         }
//       }
//     })
//     .catch((err) => {
//       console.log("Error getting cameras", err);
//     });

//   return <div id="reader"></div>;
// }

// export default ScannerComponent;

import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import React, { useEffect, useState } from "react";
// import "./BarcodeScanner.css";

function ScannerComponent({ scannedData }) {
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
        scannedData(data);

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
        // cameraToggle(html5QrcodeScanner);
        // handle scan failure, usually better to ignore and keep scanning
        console.warn(`QR error = ${error}`);
      }

      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
    //   }, [cameraToggle, childToParentScanner]);
  }, [scannedData]);

  return <div id="reader"></div>;
}
export default ScannerComponent;
