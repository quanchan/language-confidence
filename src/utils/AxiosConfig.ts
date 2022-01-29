import axios, { AxiosResponse } from 'axios'
import { LanguageConfidenceErrorResponse, LanguageConfidenceResponse } from '../entities/language-confidence';

export const checkPronunciation = async (audioBase64: string, content: string): Promise<AxiosResponse<LanguageConfidenceResponse> | undefined> => {
  const request = {
    method: 'POST' as const,
    url: process.env.NEXT_PUBLIC_RAPID_API_URL || '',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': process.env.NEXT_PUBLIC_X_RAPID_API_HOST || '',
      'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY || ''
    },
    data: {
      audio_base64: audioBase64,
      audio_format: 'wav',
      text: content
    }
  }

  try {
    const response = await axios.request(request)
    return response
  } catch (error) {
    console.log(error)
  };
};

