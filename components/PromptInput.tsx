"use client"; // This is a client component 👈🏽
import { useState } from "react";

function PromptInput() {
  const [input, setInput] = useState("");

  return (
    //  creating a prompt input for user to input their prompt for stablediffusion

    <div className="m-10">
      {/* prompt bar */}
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-3xl border-slate-400/10"
          placeholder="Create an abstract painting of a horse using vibrant colors"
        />
        <button
          type="submit"
          className={`p-4 font-bold ${
            input
              ? "bg-orange-400 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-orange-300 text-white transition-colors duration-200 font-bold disabled:text-gray-30 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 text-orange-400 transition-colors duration-200 font-bold disabled:text-gray-30 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
