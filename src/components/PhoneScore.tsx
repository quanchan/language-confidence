import { Phone } from "../entities/language-confidence"
import React from "react"
import styles from '../../styles/Result.module.css'

type PropsType = {
  phone: Phone
}

const PhoneScore: React.FC<PropsType> = (props: PropsType) => {
  const { phone } = props
  const { label, score } = phone

  const getColorFromScore = () => {
    if (score < 33) return styles.red;
    if (score < 66) return styles.yellow;
    return styles.green;
  }

  return (
    <div className={styles.phoneScore}>
      <div className={styles.phoneLabel + " " + getColorFromScore()}>{label}</div>
      {score}%
    </div>
  )
}

export default PhoneScore;