import React from 'react';
import { Word } from '../entities/language-confidence';
import WordCard from './WordCard';
import styles from '../../styles/Result.module.css'

type PropsType = {
  words: Word[]
}

const Result: React.FC<PropsType> = (props: PropsType) => {
  const { words } = props;
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

export default Result;