import React from 'react';
import { AxiosResponse } from "axios";
import { LanguageConfidenceErrorResponse, LanguageConfidenceResponse, LanguageConfidenceSuccessResponse } from "../entities/language-confidence";
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";

type PropsType = {
  result: AxiosResponse<LanguageConfidenceResponse>;
}

const Result: React.FC<PropsType> = (props: PropsType) => {
  const { result } = props;
  const { status, data } = result;

  if (status === 200) {
    return <SuccessResult data={data as LanguageConfidenceSuccessResponse} />
  }
  return <ErrorResult error={data as LanguageConfidenceErrorResponse} />
}

export default Result;