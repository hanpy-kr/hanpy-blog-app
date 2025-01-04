```typescript
'use client'

import React, { useEffect, useRef, useState } from 'react'

const SoundVisualizer: React.FC = () => {
  const [volume, setVolume] = useState(0) // 소리 크기 상태
  const audioRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    // 마이크 입력 시작
    const startAudioCapture = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        audioRef.current = stream

        const audioContext = new AudioContext()
        const source = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256 // FFT 크기 설정
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyserRef.current = analyser

        source.connect(analyser)

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray)
          const avgVolume =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length // 평균 볼륨 계산
          setVolume(avgVolume)
          requestAnimationFrame(updateVolume) // 애니메이션 반복
        }

        updateVolume()
      } catch (err) {
        console.error('Error accessing microphone:', err)
      }
    }

    startAudioCapture()

    return () => {
      // 리소스 정리
      if (audioRef.current) {
        audioRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: `rgb(${Math.min(volume * 2, 255)}, 50, 150)`,
        borderRadius: '50%',
        transform: `scale(${1 + volume / 100})`,
        transition: 'transform 0.1s, background-color 0.1s',
      }}
    >
      <p style={{ color: '#fff', textAlign: 'center', lineHeight: '100px' }}>
        {Math.round(volume)}
      </p>
    </div>
  )
}

export default SoundVisualizer
```
