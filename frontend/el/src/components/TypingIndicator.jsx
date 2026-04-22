import React, { memo } from 'react';

const TypingIndicator = memo(() => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 w-fit">

      <span className="text-[#888888] text-[14px] font-medium">Thinking </span>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#888888] animate-bounce"></div>
      </div>
    </div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';

export default TypingIndicator;
