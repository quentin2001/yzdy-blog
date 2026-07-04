import React, { useState, useEffect, useRef } from 'react';

interface SlidePlayerProps {
  title: string;
}

export default function SlidePlayer({ title }: SlidePlayerProps) {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'none'>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOverview, setIsOverview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Parse slides from the hidden source element on mount
  useEffect(() => {
    const source = document.getElementById('slide-source');
    if (!source) return;

    const children = Array.from(source.children);
    const groupedSlides: string[] = [];
    let currentGroup: string[] = [];

    children.forEach((child) => {
      if (child.tagName === 'HR') {
        if (currentGroup.length > 0) {
          groupedSlides.push(currentGroup.join(''));
          currentGroup = [];
        }
      } else {
        currentGroup.push(child.outerHTML);
      }
    });

    if (currentGroup.length > 0) {
      groupedSlides.push(currentGroup.join(''));
    }

    setSlides(groupedSlides);

    // Sync fullscreen state
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Slide navigation
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection('next');
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide(prev => prev - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
    setIsOverview(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOverview) {
        if (e.key === 'Escape') {
          setIsOverview(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case 'Enter':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          setIsOverview(prev => !prev);
          break;
        case '?':
          e.preventDefault();
          setShowHelp(prev => !prev);
          break;
        case 'Escape':
          if (showHelp) setShowHelp(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length, isOverview, showHelp]);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (slides.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0F19] text-gray-400 font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 border-r-2 border-transparent mx-auto mb-4"></div>
          <p className="text-lg">正在加载幻灯片...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-[#0B0F19] text-gray-100 overflow-hidden font-sans select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900 filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900 filter blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Header Info */}
      <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-10 pointer-events-none text-xs tracking-wider text-gray-500 uppercase">
        <div className="font-semibold">{title}</div>
        <div className="bg-gray-800/40 px-2.5 py-1 rounded-md backdrop-blur-sm border border-gray-700/30">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Slide Content Display Area */}
      <div className="w-full h-full flex justify-center items-center px-12 md:px-24 py-16">
        <div 
          key={currentSlide}
          className="slide-content w-full max-w-7xl flex flex-col justify-center items-center text-center animate-fade-in transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: slides[currentSlide] }}
        />
      </div>

      {/* Floating Hover Navigation Edges */}
      {currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/30 text-gray-400 hover:text-white transition-all backdrop-blur-sm z-10 cursor-pointer"
          title="上一页"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/30 text-gray-400 hover:text-white transition-all backdrop-blur-sm z-10 cursor-pointer"
          title="下一页"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Floating Control Panel (Bottom Right) */}
      <div className="absolute bottom-6 right-8 flex items-center gap-2 z-10">
        <button
          onClick={() => setIsOverview(true)}
          className="p-2.5 rounded-lg bg-gray-850 hover:bg-gray-800 border border-gray-750 text-gray-450 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
          title="网格概览 (O)"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-lg bg-gray-850 hover:bg-gray-800 border border-gray-750 text-gray-450 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
          title={isFullscreen ? "退出全屏 (F)" : "全屏播放 (F)"}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 4V10H4m0 0L21 3" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>

        <button
          onClick={() => setShowHelp(true)}
          className="p-2.5 rounded-lg bg-gray-850 hover:bg-gray-800 border border-gray-750 text-gray-450 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
          title="键盘快捷键 (?)"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Grid Overview Modal */}
      {isOverview && (
        <div className="absolute inset-0 bg-[#070A13]/95 z-55 overflow-y-auto p-12 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-gray-150">幻灯片概览</h2>
              <button
                onClick={() => setIsOverview(false)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {slides.map((html, idx) => (
                <div
                  key={idx}
                  onClick={() => jumpToSlide(idx)}
                  className={`aspect-[16/9] p-4 rounded-xl border transition-all cursor-pointer overflow-hidden relative flex flex-col justify-center items-center text-[0.45rem] leading-normal bg-gray-900/60 shadow-lg ${
                    idx === currentSlide
                      ? 'border-indigo-500 ring-2 ring-indigo-500/25 scale-[1.02]'
                      : 'border-gray-800 hover:border-gray-700 hover:scale-[1.01]'
                  }`}
                >
                  <div 
                    className="slide-content w-full pointer-events-none text-center" 
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-500 font-semibold bg-gray-950/80 px-1.5 py-0.5 rounded">
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 bg-[#070A13]/90 z-60 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-100 mb-6">⌨️ 快捷键指南</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span>下一页</span>
                <span className="bg-gray-800 px-2.5 py-1 rounded text-xs font-mono border border-gray-700/50 text-indigo-400">Space / → / Enter</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span>上一页</span>
                <span className="bg-gray-800 px-2.5 py-1 rounded text-xs font-mono border border-gray-700/50 text-indigo-400">← / Backspace</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span>全屏播放 / 退出全屏</span>
                <span className="bg-gray-800 px-2.5 py-1 rounded text-xs font-mono border border-gray-700/50 text-indigo-400">F</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span>网格概览</span>
                <span className="bg-gray-800 px-2.5 py-1 rounded text-xs font-mono border border-gray-700/50 text-indigo-400">O</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>帮助菜单</span>
                <span className="bg-gray-800 px-2.5 py-1 rounded text-xs font-mono border border-gray-700/50 text-indigo-400">?</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowHelp(false)}
              className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-750 text-white rounded-xl transition-all cursor-pointer font-semibold"
            >
              我知道了
            </button>
          </div>
        </div>
      )}

      {/* Styled slide typography injected directly */}
      <style>{`
        .slide-content .header-anchor {
          display: none !important;
        }
        .slide-content h1 {
          font-size: 4.8rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
        }
        .slide-content h1 .emoji-reset {
          -webkit-text-fill-color: initial;
          background: none;
          text-shadow: none;
        }
        .slide-content h2 {
          font-size: 2.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #f3f4f6;
          border-bottom: 2px solid rgba(99, 102, 241, 0.1);
          padding-bottom: 0.5rem;
          display: inline-block;
        }
        .slide-content h3 {
          font-size: 1.6rem;
          color: #9ca3af;
          margin-bottom: 1.5rem;
        }
        .slide-content p {
          font-size: 1.35rem;
          color: #d1d5db;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .slide-content ul {
          display: inline-block;
          text-align: left;
          font-size: 1.4rem;
          color: #d1d5db;
          line-height: 2;
          margin-top: 1rem;
        }
        .slide-content li {
          margin-bottom: 0.75rem;
          list-style-type: disc;
        }
        .slide-content code {
          background: rgba(31, 41, 55, 0.6);
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #f472b6;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .slide-content pre {
          text-align: left;
          background: #0f172a !important;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
          font-size: 1.1rem;
          margin-top: 1.5rem;
          max-width: 100%;
          overflow-x: auto;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
        .slide-content pre code {
          background: transparent;
          border: none;
          padding: 0;
          color: inherit;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
