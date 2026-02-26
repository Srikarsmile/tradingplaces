import React, { useState, useRef, useEffect } from "react";

/**
 * Mic button for recording voice during a scenario beat.
 * Props:
 *   isRecording: boolean
 *   hasRecording: boolean
 *   audioUrl: string | null
 *   onStart: () => void
 *   onStop: () => void
 */
export default function VoiceRecordButton({ isRecording, hasRecording, audioUrl, onStart, onStop }) {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => setPlaying(false);
        }
    }, [audioUrl]);

    const togglePlay = () => {
        if (!audioRef.current || !audioUrl) return;
        if (playing) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Record / Stop button */}
            <button
                onClick={isRecording ? onStop : onStart}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${isRecording
                        ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                        : "bg-[var(--surface-700)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]"
                    }`}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {isRecording ? (
                    <>
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                        Stop
                    </>
                ) : (
                    <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" y1="19" x2="12" y2="23" />
                            <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        {hasRecording ? "Re-record" : "Record"}
                    </>
                )}
            </button>

            {/* Playback button */}
            {hasRecording && audioUrl && (
                <>
                    <audio ref={audioRef} src={audioUrl} preload="metadata" />
                    <button
                        onClick={togglePlay}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${playing
                                ? "bg-[var(--accent-cyan-subtle)] border-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                                : "bg-[var(--surface-700)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)]"
                            }`}
                        aria-label={playing ? "Stop playback" : "Play recording"}
                    >
                        {playing ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        )}
                        {playing ? "Playing" : "Play"}
                    </button>
                </>
            )}
        </div>
    );
}
