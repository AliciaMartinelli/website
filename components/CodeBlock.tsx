'use client';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const codeLines = code.trim().split('\n');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-am-ink/10 shadow-xl bg-white">
      <div className="bg-am-ink/5 px-6 py-3 border-b border-am-ink/10 flex items-center justify-between">
        <span className="text-sm font-medium text-am-ink/70 uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-am-ink/60 hover:text-am-ink hover:bg-white/20 rounded-lg transition-all duration-200"
          title={copied ? 'Kopiert!' : 'Code kopieren'}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Kopiert!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
              </svg>
              Kopieren
            </>
          )}
        </button>
      </div>
      <div className="bg-white p-6 overflow-x-auto">
        <div className="flex">
          {/* Zeilennummern */}
          <div className="flex-shrink-0 pr-6 text-right">
            <div className="text-sm text-am-ink/40 font-mono leading-6">
              {codeLines.map((_, i) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Code */}
          <div className="flex-1 min-w-0">
            <Highlight
              theme={themes.github}
              code={code.trim()}
              language={language}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre 
                  className={`${className} text-sm leading-6 bg-white`} 
                  style={{ ...style, backgroundColor: 'white' }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className="h-6 bg-white">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  );
}
