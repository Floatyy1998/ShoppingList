import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  onResult: (text: string) => void
}

export const VoiceInput = ({ onResult }: Props) => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const onResultRef = useRef(onResult)

  // Check if iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  useEffect(() => {
    // Don't initialize speech recognition on iOS - it's too unreliable
    if (isIOS) {
      console.log('iOS detected - Speech recognition disabled due to poor support')
      return
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      // Advanced settings for best recognition
      recognitionInstance.continuous = true  // Keep listening for multiple items
      recognitionInstance.interimResults = true  // Show what's being recognized in real-time
      recognitionInstance.lang = 'de-DE'
      recognitionInstance.maxAlternatives = 3  // Get multiple alternatives

      let finalTranscript = ''
      let recognizedItems: string[] = []
      let silenceTimeout: any = null

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = ''

        // Process all results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
            console.log('✅ Final:', transcript)

            // Parse and add each recognized item
            const text = transcript.trim()
            if (text) {
              recognizedItems.push(text)
              onResultRef.current(text)
              toast.success(`"${text}" erkannt`, { duration: 2000 })
            }

            // Reset for next item after 2 seconds of silence
            clearTimeout(silenceTimeout)
            silenceTimeout = setTimeout(() => {
              console.log('Session ended, recognized items:', recognizedItems)
              if (recognizedItems.length > 0) {
                toast.success(`${recognizedItems.length} ${recognizedItems.length === 1 ? 'Produkt' : 'Produkte'} hinzugefügt!`, {
                  icon: '✅',
                  duration: 3000
                })
              }
              recognitionInstance.stop()
            }, 2000)

          } else {
            interimTranscript += transcript
            console.log('🔄 Interim:', interimTranscript)
          }
        }

        // Show interim results as feedback
        if (interimTranscript.trim()) {
          toast('Erkenne: "' + interimTranscript + '"...', {
            icon: '👂',
            duration: 1000,
            id: 'interim' // Update same toast
          })
        }
      }

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)

        clearTimeout(silenceTimeout)

        if (event.error === 'no-speech') {
          if (recognizedItems.length === 0) {
            toast.error('Nichts verstanden - versuche es nochmal')
          }
          setIsListening(false)
        } else if (event.error === 'not-allowed') {
          toast.error('Mikrofon-Zugriff wurde verweigert')
          setIsListening(false)
        } else if (event.error === 'aborted') {
          // Ignore aborted
          setIsListening(false)
        } else {
          toast.error('Spracheingabe fehlgeschlagen')
          setIsListening(false)
        }
      }

      recognitionInstance.onstart = () => {
        console.log('🎤 Speech recognition started')
        finalTranscript = ''
        recognizedItems = []
        setIsListening(true)
        toast('Sprich deine Einkaufsliste! Pause zwischen Produkten.', {
          icon: '🎤',
          duration: 5000
        })
      }

      recognitionInstance.onend = () => {
        console.log('⏹️ Speech recognition ended')
        clearTimeout(silenceTimeout)
        setIsListening(false)
      }

      recognitionInstance.onspeechstart = () => {
        console.log('🗣️ Speech detected')
      }

      recognitionInstance.onspeechend = () => {
        console.log('🛑 Speech ended')
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Spracheingabe wird in diesem Browser nicht unterstützt')
      return
    }

    if (isListening) {
      console.log('Stopping recognition manually')
      recognition.stop()
      setIsListening(false)
    } else {
      try {
        console.log('Starting recognition')
        recognition.start()
        setIsListening(true)
      } catch (err: any) {
        console.error('Failed to start recognition:', err)
        toast.error('Konnte nicht starten - probiere es nochmal')
        setIsListening(false)
      }
    }
  }

  if (!recognition) return null

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleListening}
      className={`relative p-4 rounded-full transition-all ${
        isListening
          ? 'bg-red-500 shadow-lg shadow-red-500/50'
          : 'bg-indigo-600 shadow-lg shadow-indigo-500/30'
      }`}
    >
      <AnimatePresence mode="wait">
        {isListening ? (
          <motion.div
            key="listening"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <MicOff className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
          >
            <Mic className="w-6 h-6 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation */}
      {isListening && (
        <>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="absolute inset-0 bg-red-500 rounded-full"
          />
        </>
      )}
    </motion.button>
  )
}

