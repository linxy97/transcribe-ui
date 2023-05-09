"use client";

import { useState, useCallback, ChangeEvent, useMemo } from "react";

export type UploaderProps = {
};

export default function Uploader(props: UploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [transcription, setTranscription] = useState("");
  const validateAndSetAudio = useCallback(
    (file: File | null) => {
      if (file) {
        // check file size (<20mb)
        if (file.size > 20 * 1024 * 1024) {
          alert("File size must be less than 20mb");
          return;
        }
        // check file type
        if (!file.type.startsWith("audio/")) {
          alert("File must be an audio file");
          return;
        }
        // check file duration (<120 min)
        const audio = document.createElement("audio");
        audio.src = URL.createObjectURL(file);
        audio.addEventListener("loadedmetadata", () => {
          const duration = audio.duration;
          if (duration > 120 * 60) {
            alert("Audio must be less than 120 minutes");
            return;
          }
        });
        setAudio(audio);
        setFile(file);
        setConfirm(false);
      }
    },
    [setAudio]
  );
  const onChangeAudio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      validateAndSetAudio(file);
    },
    [validateAndSetAudio]
  );
  const confirmDisabled = useMemo(() => !audio, [audio]);
  return (
    <form
      className="grid gap-6"
      onSubmit={async (event) => {
        if (!file) return;
        event.preventDefault();
        setConfirm(true);
        // TODO: api call
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", "whisper-1");
        fetch("/api/transcribe", {
          method: "POST",
          headers: {},
          body: formData,
        }).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setTranscription(data.data.text);
              setLoading(false);
              setAudio(null);
              setFile(null);
            });
          } else {
            alert(
              "Error in Transcription. Please try again. Error Code: " +
                response.status
            );
          }
        });
      }}
    >
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Upload your audio</h2>
          <p className="text-sm text-gray-500">
            Supported formats: mp3, wav, m4a, aac, flac, aiff
          </p>
        </div>
        <div>
          <label
            htmlFor="audio-upload"
            className="group relative mt-1 flex items-center justify-center w-full h-72 px-4 py-6 text-sm border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-50 bg-white shadow-sm transition-all"
          >
            {/* Upload UI */}
            <div
              className="absolute flex z-[5] h-full w-full rounded-md"
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragActive(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragActive(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragActive(false);
                const file = event.dataTransfer.files[0];
                validateAndSetAudio(file);
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setDragActive(true);
              }}
            />
            {/* File upload */}
            <div
              className={`${
                dragActive ? "border-2 border-black" : ""
              } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                audio
                  ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                  : "bg-white opacity-100 hover:bg-gray-50"
              }`}
            >
              <svg
                className={`${
                  dragActive ? "scale-110" : "scale-100"
                } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m16 16-4-4-4 4"></path>
              </svg>
              <p className="mt-2 text-center text-sm text-gray-500">
                Drag and drop or click to upload.
              </p>
              <p className="mt-2 text-center text-sm text-gray-500">
                Max length: 20 minutes
              </p>
              <span className="sr-only">Audio upload</span>
            </div>
            {/* Audio preview */}
            {audio && file && (
              <div className="absolute z-[1] flex h-full w-full flex-col items-center justify-center rounded-md px-10 bg-white/80 opacity-100 hover:opacity-0 hover:backdrop-blur-md transition-all">
                {/* file name and duration */}
                <p className="mt-2 text-center text-sm text-gray-500">
                  Name: {file?.name}
                </p>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Duration: {Math.ceil(audio.duration)} sec
                </p>
                <span className="sr-only">Audio preview</span>
              </div>
            )}
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="audio-upload"
              name="audio"
              type="file"
              accept="audio/*"
              className="sr-only"
              onChange={onChangeAudio}
            />
          </div>
        </div>
        <button
          disabled={confirmDisabled}
          className={`${
            confirmDisabled
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : `border-black bg-black text-white hover:bg-white hover:text-black`
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {confirm ? (loading ? "Uploading..." : "Done") : "Confirm Upload"}
        </button>
        <textarea
          value={transcription}
          contentEditable={confirm && !loading}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
          placeholder={
            "Once you upload your audio, transcription will appear here. You can paste or edit it here."
          }
          onChange={(event) => {
            setTranscription(event.target.value);
          }}
        />
      </div>
    </form>
  );
}
