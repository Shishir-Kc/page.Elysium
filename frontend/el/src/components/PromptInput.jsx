import React, { useState, memo } from 'react';
import { Mic, ChevronDown, AudioLines, ArrowUp } from 'lucide-react';

const PromptInput = memo(({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue("");
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="relative w-full max-w-3xl animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 bg-[#151515] border border-white/5 rounded-full pl-8 pr-1.5 py-1.5 shadow-2xl transition-all duration-300 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10 group">
        
        {/* Main Input */}
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you today?" 
          className="flex-1 w-full bg-transparent border-none outline-none text-[#F5F5F5] placeholder:text-[#555555] text-base h-11"
          style={{ paddingLeft: '32px' }}
        />

        {/* Right Side Actions */}
        <div className="flex items-center gap-5 pr-2 flex-shrink-0">
          {/* Dropdown Selection */}
          <button className="flex items-center gap-1.5 text-[15px] font-medium text-[#AAAAAA] hover:text-[#EAEAEA] transition-colors">
            Auto
            <ChevronDown size={16} strokeWidth={2} className="text-[#888888] mt-0.5" />
          </button>
          
          {/* Microphone */}
          <button className="text-[#888888] hover:text-[#EAEAEA] transition-colors" title="Voice input">
            <Mic size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Voice/Send Button */}
        <button 
          onClick={handleSubmit}
          className="w-[42px] h-[42px] flex-shrink-0 flex items-center justify-center bg-[#EAEAEA] rounded-full hover:bg-white transition-all transform active:scale-95 shadow-md"
        >
          {inputValue.trim() ? (
            <ArrowUp size={20} className="text-[#111111]" strokeWidth={2.5} />
          ) : (
            <AudioLines size={20} className="text-[#111111]" strokeWidth={2.5} />
          )}
        </button>

      </div>
    </div>
  );
});

PromptInput.displayName = 'PromptInput';

export default PromptInput;
