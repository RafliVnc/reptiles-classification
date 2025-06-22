"use client";

import { useState } from "react";
import Camera from "@/components/Camera";
import UploadButton from "@/components/UploadButton";

type Result = {
  predicted_class: number;
  confidence: number;
};

const labelMap = [
  "Bunglon",
  "Buaya / Aligator",
  "Kodok / katak",
  "Iguana",
  "Kadal",
  "Salamander",
  "Ular",
  "Kura-kura",
];

const pemberdayaan = [
  "Bunglon dapat diberdayakan dengan melindungi habitat aslinya dan menjadikannya sebagai indikator kesehatan lingkungan. Edukasi kepada masyarakat penting agar tidak menangkap bunglon untuk dijual.",
  "Buaya dan aligator dapat diberdayakan melalui program penangkaran resmi. Edukasi masyarakat agar tidak memburu secara liar serta menjaga ekosistem sungai dan rawa.",
  "Katak bisa diberdayakan sebagai indikator kualitas air dan lingkungan. Perlu menjaga kebersihan air dan habitat lembap tempat mereka berkembang biak.",
  "Iguana dapat dibudidayakan secara legal dengan izin dan perawatan yang baik. Edukasi publik untuk tidak menangkap iguana liar sangat penting.",
  "Kadal bisa diberdayakan dengan menjaga ruang hijau alami dan tidak membunuh kadal yang sering muncul di sekitar rumah karena mereka membantu mengontrol serangga.",
  "Salamander dapat diberdayakan dengan pelestarian habitat lembapnya serta dijadikan bahan edukasi atau penelitian tentang regenerasi tubuh.",
  "Ular sangat penting dalam mengendalikan hama tikus. Edukasi masyarakat agar tidak membunuh ular sembarangan dan memahami peran ekologisnya.",
  "Kura-kura dapat diberdayakan lewat program penangkaran dan pelepasliaran. Edukasi tentang daur hidup kura-kura penting agar tidak diambil dari alam sembarangan.",
];

export default function Home() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendImage = async (
    blobOrFile: Blob | File,
    previewUrl?: string
  ) => {
    const formData = new FormData();
    formData.append("file", blobOrFile);

    // Set preview URL
    if (previewUrl) {
      setPreviewUrl(previewUrl);
    } else {
      // Create preview URL for blob from camera
      const url = URL.createObjectURL(blobOrFile);
      setPreviewUrl(url);
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // Make API call to your prediction endpoint
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses gambar"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (file: File, previewUrl: string) => {
    handleSendImage(file, previewUrl);
  };

  const handleCapture = (blob: Blob) => {
    handleSendImage(blob);
  };

  const resetAll = () => {
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setError(null);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🔍 Prediksi Gambar AI
            </h1>
            <p className="text-gray-600">
              Upload gambar atau gunakan kamera untuk mendapatkan prediksi
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Input Methods */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Upload Section */}
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  📁 Upload Gambar
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
                  <UploadButton onUpload={handleUpload} />
                </div>
              </div>

              {/* Camera Section */}
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  📸 Kamera Langsung
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  {!isOpen && (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      📸 Buka Kamera
                    </button>
                  )}
                  {isOpen && (
                    <Camera onCapture={handleCapture} setIsOpen={setIsOpen} />
                  )}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {previewUrl && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
                  🖼️ Preview Gambar
                </h3>
                <div className="flex justify-center">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-64 h-64 object-cover rounded-lg shadow-md border-2 border-gray-200"
                    />
                    <button
                      onClick={resetAll}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Status Section */}
            <div className="text-center">
              {loading && (
                <div className="flex items-center justify-center gap-3 text-blue-600 mb-4">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg">Memproses gambar...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-semibold">❌ Error:</p>
                  <p>{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-sm underline hover:no-underline"
                  >
                    Tutup
                  </button>
                </div>
              )}

              {result && !loading && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">
                    ✅ Hasil Prediksi:
                  </h3>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="font-semibold text-gray-700">Kelas</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(result.confidence * 100) >= 50
                          ? labelMap[result.predicted_class]
                          : "Tidak diketahui"}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <p className="font-semibold text-gray-700">Confidence</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(result.confidence * 100) >= 50
                          ? `${Math.round(result.confidence * 100)} %`
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div>
                    {Math.round(result.confidence * 100) >= 50 && (
                      <div className="bg-white rounded-lg p-3 shadow mt-4">
                        <p className="font-semibold text-gray-700">
                          Cara Memberdayakan
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {pemberdayaan[result.predicted_class]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!previewUrl && !loading && !error && (
                <div className="text-gray-500 py-8">
                  <p className="text-lg">
                    Pilih gambar atau gunakan kamera untuk memulai prediksi
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              📋 Cara Penggunaan:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                Pilih salah satu metode: Upload gambar dari file atau gunakan
                kamera
              </li>
              <li>
                Pastikan gambar jelas dan sesuai dengan model yang dilatih
              </li>
              <li>Tunggu proses prediksi selesai</li>
              <li>Lihat hasil prediksi kelas dan tingkat kepercayaan</li>
              <li>Klik tombol ✕ untuk reset dan coba gambar lain</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
