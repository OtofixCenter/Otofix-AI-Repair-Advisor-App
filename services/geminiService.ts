import type { VehicleInfo } from '../types';

type AnalyzeParams = {
  vehicleInfo: VehicleInfo;
  base64Image: string;
  fileType: string;
  issueDescription: string;
};

export async function analyzePart({
  vehicleInfo,
  base64Image,
  fileType,
  issueDescription
}: AnalyzeParams): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const response = await fetch('https://otofix-backend.yourdomain.com/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      vehicleInfo,
      image: base64Image,
      fileType,
      issueDescription
    })
  });

  if (!response.ok) {
    throw new Error(`API returned status ${response.status}`);
  }

  const data = await response.json();
  return data.result || 'No analysis result returned.';
}
