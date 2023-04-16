import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";

const SampleBag = ({ bagNumber, index }) => {
  const [scannedData, setScannedData] = useState("");

  function handleScanButtonClick() {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          const html5QrCode = new Html5Qrcode("qr-reader");
          const qrCodeSuccessCallback = (decodedText) => {
            setScannedData(decodedText);
            html5QrCode.stop();
          };
          const config = { fps: 10, qrbox: { width: "auto", height: "auto" } };
          html5QrCode
            .start(
              { deviceId: { exact: cameraId } },
              config,
              qrCodeSuccessCallback
            )
            .catch((error) => {
              console.error("Failed to start scanning", error);
            });
        } else {
          console.error("No cameras found");
        }
      })
      .catch((error) => {
        console.error("Failed to get cameras", error);
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
