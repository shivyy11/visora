"use client";

import { load as cocossdload } from "@tensorflow-models/coco-ssd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { renderPredictions } from "../utils/render-predictions";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

let detectInterval;

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const runCoco = async () => {
    await tf.setBackend("webgl");
    await tf.ready();

    const net = await cocossdload();

    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current != null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6,
      );

        //   console.log(detectedObjects);
        
        const context = canvasRef.current.getContext("2d");
        renderPredictions(detectedObjects, context);
    }
  }

  const showmyVideo = () => {
    if (
      webcamRef.current != null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showmyVideo();

    return () => {
      clearInterval(detectInterval);
    };
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-title">Loading AI Model....</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-b-md">
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full lg:h-180"
            muted
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-9999 w-full lg:h-180"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
