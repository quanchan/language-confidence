import RecorderJS from 'recorder-js'
import React, { useCallback, useEffect, useState } from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { BsSquareFill } from 'react-icons/bs'
import { IconContext } from "react-icons";
import styles from '../../styles/Recorder.module.css'

type PropsType = {
  setAudioBase64: (audioBase64: string) => void
}

let URL: any;
let AudioContext: any;
if (typeof window !== 'undefined') {
  // pick correct API
  URL = window.URL || window.webkitURL;
  AudioContext = window.AudioContext || (window as any).webkitAudioContext;
}

const Recorder: React.FC<PropsType> = (props: PropsType) => {
  const { setAudioBase64 } = props

  const [blob, setBlob] = useState<Blob>()
  const [recorder, setRecorder] = useState<RecorderJS>()
  const [url, setUrl] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false)

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

  const startRecording = useCallback(async () => {
    if (!recorder) {
      const audioContext = new AudioContext();
      const recorder = new RecorderJS(audioContext, {
      });
      // Check for audio permission
      await navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => recorder.init(stream))
        .catch(err => alert("Please allow access to microphone to use this application full functionalities"));

      setRecorder(recorder)
      recorder.start()
        .then(() => setIsRecording(true));
    } else {
      recorder.start()
        .then(() => setIsRecording(true));
    }

  }, [recorder])

  const stopRecording = useCallback(() => {
    recorder?.stop()
      .then(({ blob }) => {
        setBlob(blob)
        setIsRecording(false)
        setUrl(URL.createObjectURL(blob))
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
      <p>{isRecording ? "Recording..." : ""}</p>
      <br />
      {
        url && <>
          Your Audio:
          <audio controls src={url} />
        </>
      }
    </>
  )
}

export default Recorder