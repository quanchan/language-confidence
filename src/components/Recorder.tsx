import RecorderJS from 'recorder-js'
import React, { useCallback, useEffect, useState } from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { BsSquareFill } from 'react-icons/bs'
import { IconContext } from "react-icons";
import styles from '../../styles/Recorder.module.css'

type PropsType = {
  setAudioBase64: (audioBase64: string) => void
}

const Recorder: React.FC<PropsType> = (props: PropsType) => {

  const { setAudioBase64 } = props

  const [blob, setBlob] = useState<Blob>()
  const [recorder, setRecorder] = useState<RecorderJS>()

  const [isRecording, setIsRecording] = useState<boolean>(false)

  useEffect(() => {
    const audioContext = new window.AudioContext();

    const recorder = new RecorderJS(audioContext, {
    });
    // Check for audio permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => recorder.init(stream))
      .catch(err => alert("Please allow access to microphone to use this application full functionalities"));

    setRecorder(recorder)
  }, [])


  useEffect(() => {
    if (blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        let result = reader.result as string;
        // Remove unneccesary metadata
        result = result.split("base64,")[1]
        setAudioBase64(result)
      };
    }
  }, [blob])

  const startRecording = useCallback(() => {
    let contentToSpeak = new SpeechSynthesisUtterance("Recording");
    speechSynthesis.speak(contentToSpeak);
    recorder?.start()
      .then(() => setIsRecording(true));
  }, [recorder])

  const stopRecording = useCallback(() => {
    recorder?.stop()
      .then(({ blob }) => {
        setBlob(blob)
        setIsRecording(false)
      });
  }, [recorder])


  return (
    <>
      <div
        onClick={() => {
          isRecording ? stopRecording() : startRecording()
        }}
        className={styles.recordButton}
      >
        <IconContext.Provider value={{ size: "1.5em" }}>
          {isRecording ? <BsSquareFill /> : <AiFillAudio />}
        </IconContext.Provider>
      </div>
      {
        blob && <>
          Your Audio:
          <audio controls src={URL.createObjectURL(blob)} />
        </>
      }
    </>
  )
}

export default Recorder