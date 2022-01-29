export type LanguageConfidenceRequest = {
  audio_base64: string,
  audio_format: string,
  text: string
}

export type LanguageConfidenceResponse = LanguageConfidenceErrorResponse | LanguageConfidenceSuccessResponse

export type LanguageConfidenceSuccessResponse = {
  words: Word[],
  score: number,
  accent_predictions: {
    en_US: number,
    en_UK: number,
    en_AU: number
  },
  score_estimates: {
    ielts: string,
    toefl: string,
    cefr: string,
    pte_general: string
  }
}

export type LanguageConfidenceErrorResponse = {
  detail: ErrorDetail
}

export type ErrorDetail = {
  loc: string[],
  msg: string,
  type: string
}[] | string

export type Word = {
  label: string,
  syllables: Syllable[],
  phones: Phone[],
  score: number,
}

export type Syllable = {
  label: string,
  label_ipa: string,
  score: number,
  phones: Phone[]
}

export type Phone = {
  label: string,
  label_ipa: string,
  confidence: number
  score: number
  error: boolean
  sounds_like: SoundsLike[]
}

type SoundsLike = {
  label: string,
  label_ipa: string,
  confidence: number
}