"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import {
  FiX,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
  FiInfo,
  FiShield,
} from "react-icons/fi";

interface ImageModalProps {
  selectedImage: { src: string; type: string } | null;
  setSelectedImage: (image: null) => void;
  allImages?: { src: string; type: string }[];
  currentIndex?: number;
}

export default function ImageModal({
  selectedImage,
  setSelectedImage,
  allImages = [],
  currentIndex = 0,
}: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [imageInfo, setImageInfo] = useState({ width: 0, height: 0, size: "" });

  const fetchImageInfo = useCallback(async (src: string) => {
    try {
      const img = new Image();
      img.onload = () => {
        setImageInfo((prev) => ({
          ...prev,
          width: img.naturalWidth,
          height: img.naturalHeight,
        }));
      };
      img.src = src;

      const response = await fetch(src);
      const blob = await response.blob();
      const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
      setImageInfo((prev) => ({ ...prev, size: `${sizeInMB} MB` }));
    } catch (error) {
      console.error("Error fetching image info:", error);
    }
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const originalOverflow = document.body.style.overflow;

    const prevent = (e: Event) => {
      e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", prevent as EventListener, {
      passive: false,
    });
    window.addEventListener("touchmove", prevent as EventListener, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("wheel", prevent as EventListener);
      window.removeEventListener("touchmove", prevent as EventListener);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      setIsLoading(true);
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setCurrentImageIndex(currentIndex);
      fetchImageInfo(selectedImage.src);
    }
  }, [selectedImage, currentIndex, fetchImageInfo]);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
    setIsLoading(true);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setIsFullscreen(false);
    setShowInfo(false);
  }, [setSelectedImage]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.1));
  };

  const handleReset = useCallback(() => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `صورة-${selectedImage.type.replace(
          /\s+/g,
          "-"
        )}-${new Date().getTime()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleNext = useCallback(() => {
    if (allImages.length > 0) {
      setCurrentImageIndex((idx) => (idx + 1) % allImages.length);
    }
  }, [allImages.length]);

  const handlePrevious = useCallback(() => {
    if (allImages.length > 0) {
      setCurrentImageIndex(
        (idx) => (idx - 1 + allImages.length) % allImages.length
      );
    }
  }, [allImages.length]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "i":
        case "I":
          e.preventDefault();
          setShowInfo((prev) => !prev);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, handlePrevious, handleNext, toggleFullscreen]);

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  if (!selectedImage) return null;

  const canNavigate = allImages.length > 1;
  const zoomPercentage = Math.round(scale * 100);

  return (
    <>
      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-gray-900 flex items-center justify-center z-100 p-0"
          onClick={handleBackdropClick}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/90 to-transparent p-6 flex justify-between items-center z-20 transition-all duration-300 translate-y-0 opacity-100">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    {selectedImage.type}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {imageInfo.width} × {imageInfo.height} • {imageInfo.size}
                  </p>
                </div>
              </div>
              {canNavigate && (
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="text-white font-medium text-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={toggleInfo}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  showInfo
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                title="معلومات الصورة (I)"
              >
                <FiInfo className="h-5 w-5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/5 text-white/80 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200"
                title="ملء الشاشة (F)"
              >
                {isFullscreen ? (
                  <FiMinimize2 className="h-5 w-5" />
                ) : (
                  <FiMaximize2 className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={handleClose}
                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center space-x-2 space-x-reverse shadow-lg shadow-red-500/25"
                title="إغلاق (ESC)"
              >
                <FiX className="h-5 w-5" />
                <span className="font-medium">إغلاق</span>
              </button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center space-x-4 space-x-reverse z-20 transition-all duration-300 translate-y-0 opacity-100">
            {canNavigate && (
              <>
                <button
                  onClick={handlePrevious}
                  className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                  title="الصورة السابقة (←)"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
                <div className="w-px h-8 bg-white/20"></div>
              </>
            )}

            <div className="flex items-center space-x-1 space-x-reverse bg-white/5 rounded-xl p-1">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.1}
                className="p-2 text-white rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                title="تصغير"
              >
                <FiZoomOut className="h-5 w-5" />
              </button>

              <div className="w-16 text-center px-2">
                <span className="text-white font-medium text-sm">
                  {zoomPercentage}%
                </span>
              </div>

              <button
                onClick={handleZoomIn}
                disabled={scale >= 5}
                className="p-2 text-white rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                title="تكبير"
              >
                <FiZoomIn className="h-5 w-5" />
              </button>
            </div>

            <div className="w-px h-8 bg-white/20"></div>

            <div className="flex items-center space-x-1 space-x-reverse">
              <button
                onClick={handleRotate}
                className="p-3 text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                title="تدوير الصورة"
              >
                <FiRotateCw className="h-5 w-5" />
              </button>

              <button
                onClick={handleReset}
                className="p-3 text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                title="إعادة تعيين (Space)"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold">
                  ↺
                </div>
              </button>

              <button
                onClick={handleDownload}
                className="p-3 text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                title="تحميل الصورة"
              >
                <FiDownload className="h-5 w-5" />
              </button>
            </div>

            {canNavigate && (
              <>
                <div className="w-px h-8 bg-white/20"></div>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-200"
                  title="الصورة التالية (→)"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-white/80 text-lg font-medium">
                  جاري تحميل الصورة
                </p>
                <p className="text-white/60 text-sm mt-2">يرجى الانتظار...</p>
              </div>
            </div>
          )}

          <div
            className={`relative transition-all duration-500 ${
              isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <NextImage
              ref={imageRef}
              src={selectedImage.src}
              alt={selectedImage.type}
              width={imageInfo.width || 1920}
              height={imageInfo.height || 1080}
              className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-300"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                cursor:
                  scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
              onLoadingComplete={handleImageLoad}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              priority
              unoptimized={false}
            />

            {canNavigate && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 p-4 bg-black/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all duration-300 translate-x-0 opacity-100"
                  title="الصورة السابقة"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 p-4 bg-black/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all duration-300 translate-x-0 opacity-100"
                  title="الصورة التالية"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {showInfo && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-80 z-20">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <FiShield className="h-6 w-6 text-blue-400" />
                <h3 className="text-white font-bold text-lg">معلومات الصورة</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">النوع:</span>
                  <span className="text-white font-medium">
                    {selectedImage.type}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">الأبعاد:</span>
                  <span className="text-white font-medium">
                    {imageInfo.width} × {imageInfo.height}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">الحجم:</span>
                  <span className="text-white font-medium">
                    {imageInfo.size}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">التكبير:</span>
                  <span className="text-white font-medium">
                    {zoomPercentage}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70">الزاوية:</span>
                  <span className="text-white font-medium">{rotation}°</span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xl text-white px-3 py-2 rounded-lg text-sm font-medium">
            {zoomPercentage}%
          </div>
        </div>
      )}
    </>
  );
}
