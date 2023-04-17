import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
// import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import ScannerComponent from "./ScannerComponent";

const SampleBag = ({ bagNumber, index }) => {
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  function handleScannedData(data) {
    setScannedData(data);
    showScanner(false);
  }

  function handleScanButtonClick() {
    // // This method will trigger user permissions
    // Html5Qrcode.getCameras()
    //   .then((devices) => {
    //     /**
    //      * devices would be an array of objects of type:
    //      * { id: "id", label: "label" }
    //      */
    //     if (devices && devices.length) {
    //       // .. use this to start scanning.
    //       const html5QrCode = new Html5Qrcode("reader");
    //       const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    //         /* handle success */
    //         setScannedData(decodedText);
    //         console.log(scannedData);
    //         html5QrCode
    //           .stop()
    //           .then((ignore) => {
    //             // QR Code scanning is stopped.
    //           })
    //           .catch((err) => {
    //             // Stop failed, handle it.
    //           });
    //       };
    //       const config = {
    //         fps: 100,
    //         qrbox: {
    //           width: window.screen.width < 600 ? 200 : 300,
    //           height: window.screen.width < 600 ? 100 : 100,
    //         },
    //         aspectRatio: 1,
    //       };

    //       // ************  Back Camera hardcoded
    //       try {
    //         html5QrCode.start(
    //           { facingMode: { exact: "environment" } },
    //           config,
    //           qrCodeSuccessCallback
    //         );
    //         // wait 2 seconds to guarantee the camera has already started to apply the focus mode and zoom...
    //         setTimeout(function () {
    //           html5QrCode.applyVideoConstraints({
    //             focusMode: "continuous",
    //             advanced: [{ zoom: 2.0 }],
    //           });
    //         }, 2000);
    //       } catch (error) {
    //         console.log("Unable to start scanning.", error);
    //       }

    //       // // ************  Back Camera
    //       // html5QrCode.start(
    //       //   { deviceId: { exact: cameraId } },
    //       //   config,
    //       //   qrCodeSuccessCallback
    //       // );

    //       // *** front camera
    //       // html5QrCode.start(
    //       //   { facingMode: "user" },
    //       //   config,
    //       //   qrCodeSuccessCallback
    //       // );
    //     }
    //   })
    //   .catch((err) => {
    //     // handle err
    //   });
    setShowScanner(true);
  }

  return (
    <div className="sample-bag">
      <h4>Sample Bag {bagNumber}</h4>

      <div className="form-group">
        <label htmlFor={`sampleBags.${index}.barcode`}>Barcode:</label>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleScanButtonClick}
        >
          Scan
        </button>
        {/* <div id="reader"></div> */}
        {showScanner && <ScannerComponent scannedData={handleScannedData} />}

        <Field
          type="text"
          id={`sampleBags.${index}.barcode`}
          name={`sampleBags.${index}.barcode`}
          value={scannedData}
        />
        <ErrorMessage
          className="error"
          component="div"
          name={`sampleBags.${index}.barcode`}
        />
      </div>

      <div className="form-group">
        <label htmlFor={`sampleBags.${index}.weight`}>Weight (grams):</label>
        <Field
          type="text"
          id={`sampleBags.${index}.weight`}
          name={`sampleBags.${index}.weight`}
        />
        <ErrorMessage
          className="error"
          component="div"
          name={`sampleBags.${index}.weight`}
        />
      </div>
    </div>
  );
};

export default SampleBag;

// import React, { useState, useEffect } from "react";
// import { Field, ErrorMessage } from "formik";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { Html5Qrcode } from "html5-qrcode";

// const SampleBag = ({ bagNumber, index }) => {
//   useEffect(() => {
//     const html5QrcodeScanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: { width: "auto", height: "auto" } },
//       /* verbose= */ false
//     );

//     html5QrcodeScanner.render(onScanSuccess, onScanFailure);
//   }, []);

//   function onScanSuccess(decodedText, decodedResult) {
//     console.log(`Code matched = ${decodedText}`, decodedResult);
//   }

//   function onScanFailure(error) {
//     console.warn(`Code scan error = ${error}`);
//   }
//   function handleScanButton() {}

//   return (
//     <div className="sample-bag">
//       <h4>Sample Bag {bagNumber}</h4>

//       <div className="form-group">
//         <label htmlFor={`sampleBags.${index}.barcode`}>Barcode:</label>
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleScanButton}
//         >
//           Scaaan
//         </button>
//         <div id="reader"></div>

//         <Field
//           type="text"
//           id={`sampleBags.${index}.barcode`}
//           name={`sampleBags.${index}.barcode`}
//         />
//         <ErrorMessage
//           className="error"
//           component="div"
//           name={`sampleBags.${index}.barcode`}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor={`sampleBags.${index}.weight`}>Weight (grams):</label>
//         <Field
//           type="text"
//           id={`sampleBags.${index}.weight`}
//           name={`sampleBags.${index}.weight`}
//         />
//         <ErrorMessage
//           className="error"
//           component="div"
//           name={`sampleBags.${index}.weight`}
//         />
//       </div>
//     </div>
//   );
// };

// export default SampleBag;
