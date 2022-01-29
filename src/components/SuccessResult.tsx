import React from 'react';
import { LanguageConfidenceSuccessResponse, Word } from '../entities/language-confidence';
import WordCard from './WordCard';
import styles from '../../styles/Result.module.css'

type PropsType = {
  data: LanguageConfidenceSuccessResponse
}

const SuccessResult: React.FC<PropsType> = (props: PropsType) => {
  const { data } = props
  const { words } = data
  return (
    <div className={styles.wordCards}>
      {
        words.map((word: Word, i: number) => (
          <WordCard key={i} word={word}
          />)
        )
      }
    </div>
  )
}

export default SuccessResult;