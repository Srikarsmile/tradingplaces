/**
 * IndexedDB helper for persisting voice recordings.
 * Stores/retrieves audio blobs keyed by "scenarioId-beatIdx".
 */

const DB_NAME = "TradingPlacesAudio";
const DB_VERSION = 1;
const STORE_NAME = "recordings";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Save an audio blob to IndexedDB. */
export async function saveRecording(key, blob) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            tx.objectStore(STORE_NAME).put(
                { blob, timestamp: Date.now() },
                key
            );
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error("Failed to save recording to IndexedDB:", err);
    }
}

/** Load an audio blob from IndexedDB. Returns { blob, url, timestamp } or null. */
export async function loadRecording(key) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const request = tx.objectStore(STORE_NAME).get(key);
            request.onsuccess = () => {
                const result = request.result;
                if (result?.blob) {
                    resolve({
                        blob: result.blob,
                        url: URL.createObjectURL(result.blob),
                        timestamp: result.timestamp,
                    });
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.error("Failed to load recording from IndexedDB:", err);
        return null;
    }
}

/** Load ALL recordings from IndexedDB. Returns { key: { blob, url, timestamp } } */
export async function loadAllRecordings() {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.openCursor();
            const result = {};

            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    const { blob, timestamp } = cursor.value;
                    result[cursor.key] = {
                        blob,
                        url: URL.createObjectURL(blob),
                        timestamp,
                    };
                    cursor.continue();
                } else {
                    resolve(result);
                }
            };
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.error("Failed to load recordings from IndexedDB:", err);
        return {};
    }
}

/** Delete a recording from IndexedDB. */
export async function deleteRecording(key) {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            tx.objectStore(STORE_NAME).delete(key);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error("Failed to delete recording from IndexedDB:", err);
    }
}
