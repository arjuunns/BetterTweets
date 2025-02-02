import "./App.css";
import Original from "./components/Original";
import Heading from "./components/Heading";
import { useEffect, useState } from "react";
import { Moon, Sun } from 'lucide-react';
const background =
  " inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-900 dark:bg-[radial-gradient(#3b3b3b_1px,transparent_1px)] bg-repeat";
function App() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const isDarkMode = 
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
    document.documentElement.classList.toggle('dark', newDarkMode);
  };
  return (
    <div className={background}>
      <div className="flex justify-end p-4 ">
       <button
        onClick={toggleDarkMode}
        className="sticky p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>
      </div>
      <Heading />
      <Original />
      <div></div>
      <p className="text-center mt-12 text-slate-700 font-mono dark:text-white pb-12">
        Made with 💙 by{" "}
        <a
          className="text-blue-600 font-bold underline"
          href="https://github.com/arjuunns"
        >
          Arjun
        </a>
      </p>
    </div>
  );
}

export default App;
