import React, { useState, useEffect } from "react";
import jsQR from "jsqr";

const CamReader = () => {
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let video;
    let scanInterval;

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video = document.getElementById("qr-video");
        video.srcObject = stream;
        video.play();

        scanInterval = setInterval(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setResult(code.data);
          }
        }, 500);
      } catch (error) {
        console.error("Error accessing user media:", error);
        setResult("Error accessing user media: " + error.message);
      }
    };

    const stopScanning = () => {
      clearInterval(scanInterval);
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setResult("");
    };

    if (scanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      clearInterval(scanInterval);
    };
  }, [scanning]);

  const handleStartScan = () => {
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  return (
    <div>
      {scanning && (
        <video
          className="w-3/5 m-auto border-3 border-blue-800"
          id="qr-video"
          width="400"
          height="200"
          autoPlay
          playsInline
        ></video>
      )}
      <div className=" text-center text-2xl font-bold text-black">
        {result ? `QR Code detected:${result}` : "Scanning..."}
      </div>
      <div className="button w-full flex justify-center items-center">
        {!scanning && (
          <button
            className="text-1xl  font-bold m-auto bg-blue-500 p-2 rounded-lg border-2  text-black"
            onClick={handleStartScan}
          >
            Start Scanning
          </button>
        )}
        {scanning && (
          <button
            className="text-1xl  font-bold  bg-blue-600 p-2 rounded-lg border-2 text-black"
            onClick={handleStopScan}
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

export default CamReader;
