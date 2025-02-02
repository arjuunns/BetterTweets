import "./App.css";
import Original from "./components/Original";
import Heading from "./components/Heading";
const background =
  "absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]";
function App() {
  return (
    <div className={background}>
      <Heading />
      <Original />
      <div></div>
      <p className="text-center mt-12 text-slate-700 font-mono">
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
