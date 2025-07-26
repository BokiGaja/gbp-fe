import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-['Work_Sans'] font-[500] text-[32px] leading-[100%] tracking-[0%] text-[#000D2D] mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-['Work_Sans'] font-[500] text-[24px] leading-[100%] tracking-[0%] text-[#000D2D] mb-4">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="font-['Work_Sans'] font-[500] text-[16px] leading-[23px] tracking-[0%] text-[#000D2D]/70 mb-4">
              {children}
            </p>
          ),
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <img
                src={src}
                alt={alt || ''}
                className="my-6 w-full h-auto rounded-lg"
                loading="lazy"
              />
            );
          },
          ul: ({ children }) => (
            <ul className="font-['Work_Sans'] font-[500] text-[16px] leading-[23px] tracking-[0%] text-[#000D2D]/70 mb-4 list-disc list-inside">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="font-['Work_Sans'] font-[500] text-[16px] leading-[23px] tracking-[0%] text-[#000D2D]/70 mb-4 list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-[600] text-[#000D2D]">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-[#000D2D]/80">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#000D2D]/20 pl-4 italic text-[#000D2D]/80 mb-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
