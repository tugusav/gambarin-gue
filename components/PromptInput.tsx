  "use client"; // This is a client component 👈🏽
  import { useState } from "react";
  
  interface PromptInputProps {
    onInputChange: (value: string) => void;
  }

  function PromptInput({ onInputChange }: PromptInputProps) {
    const [input, setInput] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInput(value);
      onInputChange(value);
    };

    return (
      //  creating a prompt input for user to input their prompt for stablediffusion
      <div className="w-1/2 rounded-lg">
        {/* prompt bar */}
        <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 lg:divide-x">
          <textarea
            value={input}
            onChange={handleInputChange}
            className="flex-1 p-4 outline-non border-radius border-slate-400/10"
            placeholder="Holiday in a beach"
          />
        </form>
      </div>
    );
  }

  export default PromptInput;
