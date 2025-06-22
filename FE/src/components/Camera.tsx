"use client";

import { useEffect, useRef } from "react";

type Props = {
  onCapture: (blob: Blob) => void;
  setIsOpen: (boolean: boolean) => void;
};

export default function Camera({ onCapture, setIsOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePicture = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const width = 224;
    const height = 224;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      canvasRef.current.toBlob((blob) => {
        if (blob) onCapture(blob);
      }, "image/jpeg");
    }

    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null; // optional: clear reference

    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-[300px] h-[224px] rounded shadow"
      />
      <canvas ref={canvasRef} hidden />
      <button
        onClick={takePicture}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ambil Gambar
      </button>
    </div>
  );
}
