import Uploader from '@/components/uploader'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="z-10 w-full items-center justify-center font-mono text-sm flex flex-col tracking-wide">
      <h1 className="sm:text-6xl text-4xl flex-1 font-bold text-slate-900 text-center max-w-m animate-typing overflow-hidden  whitespace-nowrap mb-8 pb-2">
        Transcribe
        <div className="text- -rotate-2 text-red-900">Audio</div>
        Effortlessly
      </h1>
      <p className="sm:text-l text-xl flex-x1 font-semibold text-slate-500 text-center max-w-l pb-5">
        Unleash the power of Whisper AI to transcribe audio effortlessly-
        crystal-clear transcripts at lightning speed, 100% free. Start
        transcribing today!
      </p>
      <div className="flex flex-row justify-center items-center mb-10">
        <a
          className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-5"
          href={"https://www.github.com/linxy97"}
        >
          {"Learn how it's built"}
        </a>
        
      </div>
      <Uploader />
    </div>
  );
}
