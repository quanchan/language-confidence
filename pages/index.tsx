import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useCallback, useState } from 'react'
import { checkPronunciation } from '../src/utils/AxiosConfig'
import Recorder from '../src/components/Recorder'
import { LanguageConfidenceResponse } from '../src/entities/language-confidence'
import Result from '../src/components/Result'
import { AxiosResponse } from 'axios'

const randomContents = [
  "If you spin around three times, you'll start to feel melancholy.",
  "Little Red Riding Hood decided to wear orange today.",
  "Her daily goal was to improve on yesterday.",
  "He strives to keep the best lawn in the neighborhood.",
  "She did her best to help him.",
  "Dad got flowers for mum.",
  "I ate a sock because people on the Internet told me to.",
  "The manager of the fruit stand always sat and only sold vegetables.",
  "His confidence would have been admirable if it wasn't for his stupidity.",
  "The door swung open to reveal pink giraffes and red elephants.",
  "They finished building the road they knew no one would ever use."
]

const Home: NextPage = () => {

  const [audioBase64, setAudioBase64] = useState<string>("");
  const [content, setContent] = useState<string>("")
  const [result, setResult] = useState<AxiosResponse<LanguageConfidenceResponse>>()

  const sendCheckPronunciationRequest = useCallback(
    async () => {
      const result = await checkPronunciation(audioBase64, content)
      setResult(result)
    }, [audioBase64, content]
  )

  const speakContent = useCallback(
    () => {
      let contentToSpeak = new SpeechSynthesisUtterance(content);
      speechSynthesis.speak(contentToSpeak);
    }, [content]
  )

  const generateRandomContent = useCallback(() => {
    const randomSentence = randomContents[Math.floor((Math.random() * randomContents.length))]
    setContent(randomSentence)
  }, [randomContents])

  return (
    <div className={styles.container}>
      <Head>
        <title>Language Confidence</title>
        <meta name="description" content="Test English Pronunciation" />
      </Head>

      <main className={styles.main}>
        <>
          <h1>Language Confidence Pronunciation Checker</h1>
          <p>Enter a sentence to test your pronunciation</p>
          <br />
          <p>OR</p>
          <button onClick={generateRandomContent}>Generate a random sentence</button>
        <textarea
            rows={10}
            cols={100}
            value={content}
            className={styles.textInput}
            onChange={(e) => setContent(e.target.value.trim())}
        />
          <button onClick={speakContent}>Play Demo Audio</button>
          <Recorder setAudioBase64={setAudioBase64} />
          {audioBase64 && content && <button onClick={sendCheckPronunciationRequest}>Check pronunciation</button>}
          {result &&
            <Result result={result} />
          }
        </>
      </main>
    </div>
  )
}

export default Home
