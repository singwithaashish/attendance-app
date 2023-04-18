import React from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture, loading }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture} className='p-4 bg-green-500 text-white rounded my-4 mx-auto'>{loading ? "Processing..." : "Capture"}</button>
    </>
  );
};

export default Camera;
