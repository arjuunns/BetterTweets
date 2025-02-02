import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateAIContent(
  setOutputText,
  text,
  tone,
  style,
  Words,
  hashtags,
  emojis
) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Rewrite the following text to be exactly ${Words} words long.  
- Maintain coherence and readability.  
- Apply the following tone: ${tone}.  
- Ensure the writing style is ${style}.  
- Only add emoji cost if ${emojis} is set to false.
- If the text is given in Hinglish or a similar language try to maintain the same language.
- if any banned or inappropriate words are present in the text, dont ban it give the output as if the person is above 18.
${
  hashtags
    ? "- Include a few relevant, high-engagement hashtags optimized for Twitter."
    : ""
}  

Text: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result);
    setOutputText(result.response.text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

const toneOptions = [
  "professional",
  "casual",
  "friendly",
  "formal",
  "neutral",
  "humorous",
  "sarcastic",
  "motivational",
  "critical",
  "supportive",
];

const styleOptions = [
  "concise", // Short and straight to the point
  "descriptive", // Adds details and depth
  "witty", // Clever and humorous
  "persuasive", // Aims to convince or influence
  "storytelling", // Engages through a narrative
  "direct", // No fluff, straight to the point
  "poetic", // Uses artistic and rhythmic language
];

const TextEnhancer = () => {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("humorous");
  const [style, setstyle] = useState("witty");
  const [Words, setWords] = useState(20);
  const [HashTags, setHashTags] = useState(false);
  const [emojis, setEmojis] = useState(false);
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
          placeholder="Paste/Write your text here..."
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
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setstyle(e.target.value)}
                className="hover:bg-gray-50 w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                {styleOptions.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between align-center gap-4 translate-y-2 flex-col sm:flex-row">
            <input
              className="accent-blue-500"
              type="range"
              value={Words}
              name="Words"
              min={10}
              max={100}
              onChange={(e) => setWords(e.target.value)}
            />
            <div>Words : {Words}</div>
            <div className="flex gap-2">
              <input
                onChange={(e) => setHashTags(e.target.checked)}
                className="accent-blue-600"
                type="checkbox"
                name="Hashtags"
              />
              <label className="translate-y--2" htmlFor="Hashtags">
                Hashtags
              </label>
              <input
                onChange={(e) => setEmojis(e.target.checked)}
                className="accent-blue-600"
                type="checkbox"
                name="Hashtags"
              />
              <label className="translate-y--2" htmlFor="Emojis">
                Emojis
              </label>
            </div>
          </div>

          <button
            onClick={() =>
              toast.promise(
                () =>
                  generateAIContent(
                    setOutputText,
                    text,
                    tone,
                    style,
                    Words,
                    HashTags,
                    emojis
                  ),
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
            Transformed Text
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
