import React, { useRef, useState } from "react";

const CanvasRecorder = ({ canvasRef }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    const canvas = canvasRef.current;
    const stream = canvas.captureStream(30);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp8", 
    });
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setRecordedBlob(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (recordedBlob) {
      const link = document.createElement("a");
      link.href = recordedBlob;
      link.download = "canvas-recording.webm";
      link.click();
    }
  };

  return (
    <div>
      {!isRecording ? (
        <button onClick={startRecording}>Record Visual Effects</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording Effects</button>
      )}
      {recordedBlob && (
        <button onClick={downloadVideo}>Download Recorded Video</button>
      )}
    </div>
  );
};
// convert to mov with alpha channel in terminal -   __ ffmpeg -i yo.webm -c:v prores_ks -profile:v 4 -pix_fmt yuva444p10le please.mov 
export default CanvasRecorder;
