import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
// import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";

const SampleBag = ({ bagNumber, index }) => {
  const [scannedData, setScannedData] = useState("");

  function handleScanButtonClick() {
    // This method will trigger user permissions
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          console.log("entered if (devices && devices.length)");
          var cameraId = devices[0].id;
          // .. use this to start scanning.
          const html5QrCode = new Html5Qrcode("reader");
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            setScannedData(decodedText);
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
          const config = { fps: 10, qrbox: { width: "auto", height: "auto" } };

          // ************  Back Camera hardcoded
          html5QrCode.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback
          );

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
        <div id="reader"></div>

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
