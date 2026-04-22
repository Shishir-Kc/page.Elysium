import React, { useState, memo } from 'react';
import { Copy, ThumbsUp, ThumbsDown, Share, RefreshCw, MoreHorizontal, ChevronDown } from 'lucide-react';
import MarkdownContent from './MarkdownContent';

const ChatMessage = memo(({ role, content, thinking }) => {
  const isUser = role === 'user';
  const [showThinking, setShowThinking] = useState(false);

  return (
    <div style={{ marginBottom: '32px' }} className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="w-full max-w-3xl px-6">
        {isUser ? (
          <div className="flex justify-end w-full">
            <div 
              style={{ padding: '12px 24px', borderRadius: '24px' }} 
              className="bg-[#2F2F2F] text-[#EAEAEA] text-[16px] font-normal leading-relaxed shadow-sm"
            >
              {content}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full text-left">
            {/* Thinking Section */}
            {thinking && (
              <div className="mb-2 w-full flex flex-col">
                <button 
                  onClick={() => setShowThinking(!showThinking)}
                  className="flex items-center gap-1.5 text-[#888888] hover:text-[#AAAAAA] transition-colors text-[14px] font-medium group"
                >
                  {showThinking ? "Hide thinking" : "Show thinking"}
                  <div className={`transition-transform duration-300 ${showThinking ? "rotate-180" : ""}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showThinking ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden border-l-2 border-white/5 pl-3">
                    <div className="text-[#888888] text-[14px] italic leading-relaxed whitespace-pre-wrap font-normal">
                      {thinking}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="text-[#F5F5F5] text-[16px] leading-relaxed font-normal">
              <MarkdownContent content={content} />
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-2 mt-2 text-[#888888]">
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="Copy">
                <Copy size={14} />
              </button>
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="Good response">
                <ThumbsUp size={14} />
              </button>
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="Bad response">
                <ThumbsDown size={14} />
              </button>
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="Share">
                <Share size={14} />
              </button>
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="Regenerate">
                <RefreshCw size={14} />
              </button>
              <button className="p-1 rounded-md hover:bg-white/10 hover:text-[#EAEAEA] transition-colors" title="More">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
