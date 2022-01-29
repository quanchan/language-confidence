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

if (typeof window !== 'undefined') {
  URL = window.URL || window.webkitURL;
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

  const startRecording = useCallback( async () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

    const audioContext = new AudioContext();
    audioContext.resume();
    const recorder = new RecorderJS(audioContext, {
    });
    // Check for audio permission
    await navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => recorder.init(stream))
      .catch(err => alert("Please allow access to microphone to use this application full functionalities"));

    setRecorder(recorder)
    recorder?.start()
      .then(() => setIsRecording(true));
  }, [recorder])

  const stopRecording = useCallback(() => {
    console.log("CC");
    
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
      {
        blob && <>
          Your Audio:
          <audio controls src={url} />
        </>
      }
    </>
  )
}

export default Recorder