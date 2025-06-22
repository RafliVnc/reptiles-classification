"use client";

import { useRef } from "react";

type Props = {
  onUpload: (file: File, previewUrl: string) => void;
};

export default function UploadButton({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Harap pilih file gambar valid (JPG, JPEG, atau PNG)");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Ukuran file terlalu besar. Maksimal 10MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      onUpload(file, previewUrl);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
      >
        📁 Pilih Gambar
      </button>
      <p className="text-sm text-gray-500">
        Format: JPG, PNG, JPEG (maks. 10MB)
      </p>
    </div>
  );
}
