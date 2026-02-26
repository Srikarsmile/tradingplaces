import { useState, useRef, useCallback } from "react";

/**
 * Custom hook for recording voice using the MediaRecorder API.
 * Stores recordings in memory (blobs) keyed by scenario + beat.
 */
export default function useVoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState({}); // key: "scenarioId-beatIdx" → { blob, url }
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const streamRef = useRef(null);

    const startRecording = useCallback(async (key) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
                    ? "audio/webm;codecs=opus"
                    : "audio/webm",
            });

            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);
                setRecordings((prev) => ({
                    ...prev,
                    [key]: { blob, url, timestamp: Date.now() },
                }));
                // Stop all tracks to release mic
                streamRef.current?.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start(100); // collect data every 100ms
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone access denied:", err);
            setIsRecording(false);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, []);

    const getRecording = useCallback(
        (key) => recordings[key] || null,
        [recordings]
    );

    const hasRecording = useCallback(
        (key) => !!recordings[key],
        [recordings]
    );

    return {
        isRecording,
        recordings,
        startRecording,
        stopRecording,
        getRecording,
        hasRecording,
    };
}
