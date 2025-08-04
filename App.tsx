import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import { VEHICLE_DATA } from './constants';
import { VehicleCategory, VehicleInfo } from './types';
import { analyzePart } from './services/geminiService';
import CogIcon from './components/icons/CogIcon';

const STEPS = [
  { id: 1, name: 'Category' },
  { id: 2, name: 'Brand' },
  { id: 3, name: 'Model' },
  { id: 4, name: 'Year' },
  { id: 5, name: 'Photo' },
  { id: 6, name: 'Analysis' },
];

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    category: null,
    brand: null,
    model: null,
    year: null,
  });
  const [uploadedImage, setUploadedImage] = useState<{file: File, preview: string} | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setVehicleInfo({ category: null, brand: null, model: null, year: null });
    setUploadedImage(null);
    setIssueDescription('');
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleSelection = (field: keyof VehicleInfo, value: any) => {
    setVehicleInfo(prev => {
        const newState = {...prev, [field]: value};
        // Reset subsequent fields if a parent field changes
        if (field === 'category') {
            newState.brand = null;
            newState.model = null;
            newState.year = null;
        } else if (field === 'brand') {
            newState.model = null;
            newState.year = null;
        } else if (field === 'model') {
            newState.year = null;
        }
        return newState;
    });
    if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          setError("Image size cannot exceed 4MB.");
          return;
      }
      setError(null);
      setUploadedImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const submitForAnalysis = useCallback(async () => {
    if (!uploadedImage || !vehicleInfo.category || !vehicleInfo.brand || !vehicleInfo.model || !vehicleInfo.year) {
      setError("Please complete all steps before analysis.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentStep(6);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage.file);
        reader.onloadend = async () => {
            const base64String = (reader.result as string).split(',')[1];
            const result = await analyzePart(vehicleInfo, base64String, uploadedImage.file.type, issueDescription);
            setAnalysisResult(result);
        };
        reader.onerror = () => {
            throw new Error("Failed to read image file.");
        };
    } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMsg);
        setAnalysisResult(null);
    } finally {
        setIsLoading(false);
    }
  }, [uploadedImage, vehicleInfo, issueDescription]);

  const renderCurrentStep = () => {
    switch (currentStep) {
        case 1:
            const categories = Object.values(VehicleCategory);
            return <SelectionComponent label="Select Category" options={categories} value={vehicleInfo.category} onChange={(val) => handleSelection('category', val as VehicleCategory)} />;
        case 2:
            const brands = vehicleInfo.category ? Object.keys(VEHICLE_DATA[vehicleInfo.category] || {}) : [];
            return <SelectionComponent label="Select Brand" options={brands} value={vehicleInfo.brand} onChange={(val) => handleSelection('brand', val)} disabled={!vehicleInfo.category} />;
        case 3:
            const models = vehicleInfo.category && vehicleInfo.brand ? Object.keys(VEHICLE_DATA[vehicleInfo.category]?.[vehicleInfo.brand] || {}) : [];
            return <SelectionComponent label="Select Model" options={models} value={vehicleInfo.model} onChange={(val) => handleSelection('model', val)} disabled={!vehicleInfo.brand} />;
        case 4:
            const years = vehicleInfo.category && vehicleInfo.brand && vehicleInfo.model ? VEHICLE_DATA[vehicleInfo.category]?.[vehicleInfo.brand]?.[vehicleInfo.model] || [] : [];
            return <SelectionComponent label="Select Year" options={years} value={vehicleInfo.year} onChange={(val) => handleSelection('year', parseInt(val))} disabled={!vehicleInfo.model} />;
        case 5:
            return <PhotoUploadStep 
                onImageChange={handleImageChange} 
                uploadedImagePreview={uploadedImage?.preview} 
                onSubmit={submitForAnalysis} 
                disabled={!uploadedImage}
                issueDescription={issueDescription}
                onIssueDescriptionChange={setIssueDescription}
                />;
        case 6:
            return <AnalysisStep isLoading={isLoading} error={error} analysisResult={analysisResult} onReset={handleReset} />;
        default:
            return null;
    }
  };

  const SelectionComponent = ({ label, options, value, onChange, disabled = false }: { label: string, options: (string | number)[], value: string | number | null, onChange: (val: string) => void, disabled?: boolean}) => (
    <div className="w-full">
      <label className="block text-lg font-medium text-slate-300 mb-2">{label}</label>
      <select 
        value={value ?? ""} 
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>-- {label} --</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
  
  const PhotoUploadStep = ({onImageChange, uploadedImagePreview, onSubmit, disabled, issueDescription, onIssueDescriptionChange}: {onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void, uploadedImagePreview: string | undefined, onSubmit: () => void, disabled: boolean, issueDescription: string, onIssueDescriptionChange: (val: string) => void }) => (
     <div className="w-full flex flex-col items-center gap-6">
        <h3 className="text-xl font-semibold text-slate-200">Upload Part Photo & Describe Issue</h3>
        <div className="w-full max-w-md h-64 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center bg-slate-800/50 relative overflow-hidden">
            {uploadedImagePreview ? (
                <img src={uploadedImagePreview} alt="Part preview" className="w-full h-full object-cover" />
            ) : (
                <div className="text-center text-slate-400">
                    <p>Click to upload an image</p>
                    <p className="text-xs mt-1">PNG, JPG, WEBP up to 4MB</p>
                </div>
            )}
            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={onImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Upload part photo"/>
        </div>
        <div className="w-full max-w-md">
            <label htmlFor="issue-description" className="block text-lg font-medium text-slate-300 mb-2">Briefly describe the problem</label>
            <textarea
                id="issue-description"
                rows={3}
                className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="e.g., 'I hear a rattling noise from this area when the engine is running.'"
                value={issueDescription}
                onChange={e => onIssueDescriptionChange(e.target.value)}
            />
        </div>
        <button onClick={onSubmit} disabled={disabled} className="w-full max-w-md bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">
            Analyze Part
        </button>
    </div>
  );
  
  const AnalysisStep = ({isLoading, error, analysisResult, onReset}: {isLoading: boolean, error: string | null, analysisResult: string | null, onReset: () => void}) => (
      <div className="w-full flex flex-col items-center gap-6">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-sky-400">
                <p className="text-lg">Analyzing</p>
                <CogIcon className="w-16 h-16 animate-spin" />
            </div>
          )}
          {error && (
              <div className="w-full max-w-2xl bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Analysis Failed</h4>
                  <p>{error}</p>
              </div>
          )}
          {analysisResult && (
              <div className="w-full max-w-2xl bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-2xl font-bold mb-4 text-emerald-400">Analysis Complete</h3>
                  <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 whitespace-pre-wrap">
                      {analysisResult}
                  </div>
              </div>
          )}
          <button onClick={onReset} className="w-full max-w-md bg-slate-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">
            Start a New Analysis
        </button>
      </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center gap-12">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
        <div className="w-full max-w-lg p-8 bg-slate-800 rounded-2xl shadow-2xl shadow-slate-950/50 border border-slate-700 flex justify-center min-h-[300px] items-center">
            {renderCurrentStep()}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GallaCenter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;