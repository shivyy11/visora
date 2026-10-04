"use client";

import { load as cocossdload } from "@tensorflow-models/coco-ssd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { renderPredictions } from "../utils/render-predictions";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const detectingRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { ideal: "user" },
  };

  useEffect(() => {
    let isMounted = true;
    let animationFrameId;

    const runCoco = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();

        console.log("TensorFlow backend:", tf.getBackend());

        const net = await cocossdload();

        if (!isMounted) return;

        modelRef.current = net;
        setIsLoading(false);

        const detectObjects = async () => {
          if (!isMounted) return;

          const webcam = webcamRef.current;
          const video = webcam?.video;
          const canvas = canvasRef.current;

          if (!video || !canvas || video.readyState !== 4) {
            animationFrameId = requestAnimationFrame(detectObjects);
            return;
          }

          // Don't start another detection while one is already running
          if (detectingRef.current) {
            animationFrameId = requestAnimationFrame(detectObjects);
            return;
          }

          detectingRef.current = true;

          try {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            if (videoWidth === 0 || videoHeight === 0) {
              detectingRef.current = false;
              animationFrameId = requestAnimationFrame(detectObjects);
              return;
            }

            canvas.width = videoWidth;
            canvas.height = videoHeight;

            const predictions = await net.detect(video, undefined, 0.5);

            if (isMounted) {
              console.log("Predictions:", predictions);

              const context = canvas.getContext("2d");

              if (context) {
                renderPredictions(predictions, context);
              }
            }
          } catch (error) {
            console.error("Object detection error:", error);
          } finally {
            detectingRef.current = false;
          }

          if (isMounted) {
            animationFrameId = requestAnimationFrame(detectObjects);
          }
        };

        detectObjects();
      } catch (error) {
        console.error("COCO-SSD loading error:", error);
        setIsLoading(false);
      }
    };

    runCoco();

    return () => {
      isMounted = false;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-title">Loading AI Model....</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-b-md overflow-hidden">
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full lg:h-180"
            muted
            audio={false}
            mirrored
            videoConstraints={videoConstraints}
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
