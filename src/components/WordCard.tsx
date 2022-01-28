import React from "react";
import { Phone, Word } from "../entities/language-confidence";
import PhoneScore from "./PhoneScore";
import styles from '../../styles/Result.module.css'

type PropsType = {
  word: Word,
}

const WordCard: React.FC<PropsType> = (props: PropsType) => {
  const { word } = props
  const { phones } = word
  return (
    <div className={styles.wordCard}>
      <div className={styles.wordLabel}>{word.label.toLowerCase()}</div>
      <div className={styles.phoneScores}>
        {phones.map((phone: Phone, i: number) => <PhoneScore key={i} phone={phone} />)}
      </div>
    </div>
  )
}

export default WordCard;