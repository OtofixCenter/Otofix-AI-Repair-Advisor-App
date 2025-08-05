import React, { useState } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import { analyzePart } from './services/geminiService';
import { VEHICLE_DATA } from './constants';
import { VehicleInfo } from './types';

function App() {
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    type: '',
    brand: '',
    model: '',
    year: ''
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      try {
        const result = await analyzePart({
          vehicleInfo,
          base64Image: base64String,
          fileType: uploadedImage.type,
          issueDescription
        });
        setAnalysisResult(result);
      } catch (error) {
        console.error('Error analyzing part:', error);
        setAnalysisResult('Bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(uploadedImage);
  };

  return (
    <div>
      <Header />
      <StepIndicator currentStep={1} />
      {/* Form ve analiz sonuçlarını gösteren JSX kodları buraya gelecek */}
    </div>
  );
}

export default App;
