import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateAIContent(setOutputText, text, tone, voice, Words) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Modify "${text}" into a text with exactly ${Words} words the following parameters => Tone: ${tone}, Voice: ${voice}`;

  try {
    const result = await model.generateContent(prompt);
    setOutputText(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

const toneOptions = [
  "professional",
  "casual",
  "friendly",
  "formal",
  "informal",
  "neutral",
  "positive",
  "negative",
];

const voiceOptions = ["active", "passive", "neutral"];

const TextEnhancer = () => {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("professional");
  const [voice, setVoice] = useState("active");
  const [Words, setWords] = useState(10);
  const [outputText, setOutputText] = useState("");
  const originalTextRef = useRef();
  const outputTextRef = useRef();
  function copyText() {
    toast.success("Text SuccessFully Copied");
    window.navigator.clipboard.writeText(outputTextRef.current.value);
  }
  useEffect(() => {
    originalTextRef.current.focus();
  }, []);

  return (
    <div className="w-full p-6 bg-transparent rounded-lg flex justify-center gap-10 flex-wrap">
      <Toaster />
      <div className="w-full border max-w-md border-gray-200 rounded-lg p-4 bg-white flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 translate-y-2">
          Original Text
        </h2>
        <textarea
          ref={originalTextRef}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 translate-y- p-3 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 translate-y-2 flex-col sm:flex-row">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1cw-full">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="hover:bg-gray-50 w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Voice
              </label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="hover:bg-gray-50 w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                {voiceOptions.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between ">
            <input
              className="accent-blue-500"
              type="range"
              value={Words}
              name="Words"
              min={10}
              max={280}
              onChange={(e) => setWords(e.target.value)}
            />
            <div>Words : {Words}</div>
          </div>

          <button
            onClick={() =>
              toast.promise(
                () =>
                  generateAIContent(setOutputText, text, tone, voice, Words),
                {
                  loading: "Enhancing Text...",
                  success: "Text Enhanced Successfully",
                  error: "Sorry, could not enhance text",
                }
              )
            }
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Enhance Text
          </button>
        </div>
      </div>
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg border-[1px]">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Output Text
          </h2>
          <textarea
            placeholder="Enchanced Text will appear here..."
            value={outputText}
            ref={outputTextRef}
            readOnly
            onChange={(e) => setOutputText(e.target.value)}
            className="w-full h-64 p-3 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        <button
          onClick={copyText}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default TextEnhancer;
