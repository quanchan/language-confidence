import React from 'react';
import { LanguageConfidenceErrorResponse } from "../entities/language-confidence"
import styles from '../../styles/Result.module.css'

type PropsType = {
  error: LanguageConfidenceErrorResponse
}

const ErrorResult: React.FC<PropsType> = (props: PropsType) => {
  const { error } = props
  const { detail } = error

  const getErrorMessage = () => {
    if (typeof detail === "string") {
      return detail
    } else {
      return detail.reduce((prev, curr, index) => (prev + ((index === 0) ? "" : " - ") + curr.msg), "")
    }
  }

  return (
    <p className={styles.error}>
      Error occured: {getErrorMessage()}
    </p>
  )
}

export default ErrorResult;