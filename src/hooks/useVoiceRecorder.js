import { useState, useRef, useCallback, useEffect } from "react";
import { saveRecording, loadAllRecordings } from "../lib/audioStorage";

/**
 * Custom hook for recording voice using the MediaRecorder API.
 * Persists recordings to IndexedDB so they survive page refreshes.
 * Keyed by "scenarioId-beatIdx".
 */
export default function useVoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState({}); // key → { blob, url, timestamp }
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const streamRef = useRef(null);

    // Load persisted recordings from IndexedDB on mount
    useEffect(() => {
        let cancelled = false;
        loadAllRecordings().then((saved) => {
            if (!cancelled && saved && Object.keys(saved).length > 0) {
                setRecordings((prev) => ({ ...saved, ...prev }));
            }
        });
        return () => { cancelled = true; };
    }, []);

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
                const entry = { blob, url, timestamp: Date.now() };

                setRecordings((prev) => ({ ...prev, [key]: entry }));

                // Persist to IndexedDB in background
                saveRecording(key, blob);

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
