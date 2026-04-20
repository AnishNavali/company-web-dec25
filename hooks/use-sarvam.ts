"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SARVAM_API_KEY = "8a5a0f21-183c-46b8-8034-8079e3608185";

export function useSarvam() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleVoice = () => {
    setIsVoiceEnabled((prev) => {
      const newState = !prev;
      if (!newState && currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
      return newState;
    });
  };

  const speak = useCallback(async (text: string) => {
    if (!text) return;

    try {
      const response = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": SARVAM_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          speaker: "priya", // Top-rated professional female voice
          target_language_code: "en-IN",
          model: "bulbul:v3",
          speech_sample_rate: 24000, // Higher fidelity
        }),
      });

      if (!response.ok) throw new Error("TTS request failed");

      const data = await response.json();
      if (data.audios && data.audios.length > 0) {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
        }

        const audioSrc = `data:audio/wav;base64,${data.audios[0]}`;
        const audio = new Audio(audioSrc);
        currentAudioRef.current = audio;
        audio.play();

        audio.onended = () => {
          currentAudioRef.current = null;
        };
      }
    } catch (error) {
      console.error("Sarvam TTS Error:", error);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
    };
  }, []);

  const startListening = useCallback(async (callback: (transcript: string) => void) => {
    if (isListening) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setIsListening(false);

        // Call Sarvam STT REST API
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        formData.append("model", "saaras:v3");
        formData.append("language_code", "en-IN");
        formData.append("mode", "transcribe");

        try {
          const response = await fetch("https://api.sarvam.ai/speech-to-text", {
            method: "POST",
            headers: {
              "api-subscription-key": SARVAM_API_KEY,
            },
            body: formData,
          });

          if (!response.ok) throw new Error("STT request failed");

          const data = await response.json();
          if (data.transcript) {
            callback(data.transcript);
          }
        } catch (error) {
          console.error("Sarvam STT Error:", error);
        }
      };

      mediaRecorder.start();
      setIsListening(true);

      // Automatically stop after 5 seconds if not stopped manually (optional)
      // setTimeout(() => mediaRecorder.stop(), 5000);
    } catch (error) {
      console.error("Microphone access error:", error);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return {
    isVoiceEnabled,
    toggleVoice,
    speak,
    isListening,
    startListening,
    stopListening,
  };
}
