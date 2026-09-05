import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { UPCYCLING_IMAGES } from '../assets/upcyclingImages';

export default function AnalyzePage({ onAnalysisComplete, quickStartPreset, clearQuickStartPreset }) {
  // Form State matching the mockup defaults
  const [clothingType, setClothingType] = useState('Jeans');
  const [condition, setCondition] = useState('Slightly Damaged');
  const [reason, setReason] = useState("I don't wear it anymore");
  const [notes, setNotes] = useState('');

  // Image Upload State (default to sample jeans as shown in reference)
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(UPCYCLING_IMAGES.sampleJeans);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Analysis / Loading state
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const clothingTypes = [
    'Jeans', 'T-shirt', 'Shirt', 'Trousers', 'Dress', 'Jacket', 'Sweater', 'Skirt', 'Other'
  ];

  const conditionOptions = [
    'Like New',
    'Good',
    'Slightly Damaged',
    'Heavily Damaged'
  ];

  const reasonOptions = [
    "I don't wear it anymore",
    "It doesn't fit",
    "It is damaged",
    "I want something new",
    "Looking for upcycling",
    "Other"
  ];

  useEffect(() => {
    if (quickStartPreset) {
      if (quickStartPreset.type) setClothingType(quickStartPreset.type);
      if (quickStartPreset.cond) setCondition(quickStartPreset.cond);
      if (quickStartPreset.reason) setReason(quickStartPreset.reason);
      if (quickStartPreset.desc) setNotes(quickStartPreset.desc);
      clearQuickStartPreset();
    }
  }, [quickStartPreset]);

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processImageFile = (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image size exceeds maximum limit of 10MB.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0]);
    }
  };

  const removeImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Handler
  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    setLoadingStep(0);

    const timer1 = setTimeout(() => setLoadingStep(1), 600);
    const timer2 = setTimeout(() => setLoadingStep(2), 1200);

    try {
      let resultData = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('clothing_type', clothingType);
        formData.append('condition', condition);
        formData.append('reason', reason);
        formData.append('description', notes || `${condition} ${clothingType}`);
        formData.append('image', selectedFile);

        const response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const res = await response.json();
          resultData = res.data;
        } else {
          throw new Error('Analysis request failed');
        }
      } else {
        const response = await fetch('/api/analyze-json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clothing_type: clothingType,
            condition: condition,
            reason: reason,
            description: notes || `${condition} ${clothingType}`
          })
        });

        if (response.ok) {
          const res = await response.json();
          resultData = res.data;
        } else {
          throw new Error('Analysis request failed');
        }
      }

      setTimeout(() => {
        setLoading(false);
        if (onAnalysisComplete && resultData) {
          onAnalysisComplete(resultData, imagePreview);
        }
      }, 1800);

    } catch (err) {
      console.warn("Using client-side fallback decision heuristic:", err);
      setTimeout(() => {
        setLoading(false);
        const fallback = getFallbackDecision(clothingType, condition, reason, notes);
        if (onAnalysisComplete) {
          onAnalysisComplete(fallback, imagePreview);
        }
      }, 1800);
    }
  };

  const getFallbackDecision = (type, cond, rsn, nts) => {
    let rec = "REPAIR";
    let conf = "High";
    let why = [
      "The clothing appears to be in usable condition and the visible damage seems repairable. Repairing it could extend its useful life."
    ];
    let note = "Keeping a garment in use longer can be a more sustainable alternative to immediately replacing it.";

    if (cond === "Heavily Damaged") {
      rec = type === "Jeans" || type === "T-shirt" ? "UPCYCLE" : "RECYCLE";
      why = [
        "Direct wear or donation is not recommended due to heavy wear.",
        "Salvageable fabric sections can be repurposed or recycled responsibly."
      ];
    } else if (cond === "Like New" || cond === "Good") {
      rec = "DONATE";
      why = [
        "The garment is in good wearable condition with high fabric integrity.",
        "Another person or community organization can immediately benefit from its remaining life."
      ];
    }

    return {
      clothing_type: type,
      condition: cond,
      reason: rsn,
      recommendation: rec,
      confidence: conf,
      why_points: why,
      sustainability_note: note,
      alternatives: [
        { action: "REUSE", title: "REUSE", description: "Continue using it for casual or home wear." },
        { action: "DONATE", title: "DONATE", description: "If it is still in good condition and you no longer need it." },
        { action: "UPCYCLE", title: "UPCYCLE", description: "Transform the garment into another useful item." },
        { action: "RECYCLE", title: "RECYCLE", description: "Consider textile recycling if the garment is no longer usable." }
      ].filter(a => a.action !== rec)
    };
  };

  const loadingMessages = [
    "Looking at your clothing...",
    "Considering its condition...",
    "Finding the most sustainable option..."
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      
      {/* Editorial Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2E24] leading-tight">
          What should I do <br />
          with this clothing?
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6E60]">
          Tell us about your clothing or upload a photo.
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#F7ECE6] border border-[#DEC4B5] text-[#9C6D53] text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-auto text-xs font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading ? (
        <div className="glass-panel rounded-3xl p-16 text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#C8DACD] border-t-[#527557] animate-spin" />
            <div className="absolute inset-2.5 rounded-full bg-[#E8F0EA] flex items-center justify-center text-[#527557]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#1F2E24]">
            {loadingMessages[loadingStep]}
          </h3>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  loadingStep >= step ? 'w-8 bg-[#527557]' : 'w-2 bg-[#C8DACD]'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* TWO-COLUMN WORKSPACE MATCHING THE MOCKUP EXACTLY */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT CARD: UPLOAD IMAGE */}
          <div className="md:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/80 shadow-glass">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#1F2E24] mb-4">
                Upload Image
              </h2>

              {/* Dashed dropzone matching mockup */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#527557] bg-[#E8F0EA]/70 scale-[1.01]'
                    : 'border-[#BDD2C3] hover:border-[#527557] bg-white/40 hover:bg-white/70'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                
                <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#527557] mx-auto flex items-center justify-center mb-3 shadow-subtle">
                  <UploadCloud className="w-5 h-5 stroke-[2]" />
                </div>

                <p className="text-xs font-semibold text-[#1F2E24] mb-0.5">
                  Drag & drop your image here
                </p>
                <p className="text-[11px] text-[#5A6E60] mb-2">
                  or click to browse
                </p>
                <span className="text-[9px] text-[#7A8E7E] uppercase font-bold tracking-wider">
                  JPG, PNG up to 10MB
                </span>
              </div>

              {/* Thumbnail Preview below dropzone exactly matching mockup */}
              {imagePreview && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-md w-24 h-24 bg-[#E8EFEA]">
                    <img src={imagePreview} alt="Clothing item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1F2E24]/80 hover:bg-[#1F2E24] text-white flex items-center justify-center text-[10px] shadow-sm transition-all"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-2 text-[10px] sm:text-[11px] text-[#5A6E60]">
              <span className="text-[#527557] font-bold">Privacy First:</span> Images are processed in memory and never stored.
            </div>
          </div>

          {/* RIGHT CARD: OR DESCRIBE YOUR CLOTHING */}
          <div className="md:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/80 shadow-glass">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#1F2E24] mb-4">
                Or describe your clothing
              </h2>

              <form onSubmit={handleAnalyze} className="space-y-4">
                {/* Clothing Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                    Clothing type
                  </label>
                  <select
                    value={clothingType}
                    onChange={(e) => setClothingType(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium cursor-pointer"
                  >
                    {clothingTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium cursor-pointer"
                  >
                    {conditionOptions.map((cond) => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>

                {/* Why are you not using it? */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                    Why are you not using it?
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium cursor-pointer"
                  >
                    {reasonOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Anything else? */}
                <div>
                  <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                    Anything else?
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional"
                    className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] placeholder:text-[#5A6E60]/50 font-medium"
                  />
                </div>

                {/* Analyze with AI Button matching mockup */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Analyze with AI</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
