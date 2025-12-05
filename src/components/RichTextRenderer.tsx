import React from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface RichTextRendererProps {
  content: unknown; // Strapi blocks format
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Ensure content is an array (BlocksContent is RootNode[])
  if (!Array.isArray(content)) {
    return null;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <BlocksRenderer
        content={content as BlocksContent}
        blocks={{
          paragraph: ({ children }) => (
            <p className="font-['Merriweather',serif] font-[400] text-[16px] leading-[28px] tracking-[0%] text-[#000D2D]/70 mb-4 text-justify">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            const baseClasses = "font-['Work_Sans'] font-[500] text-[#000D2D] mb-4 text-center";
            const sizeClasses = {
              1: 'text-[32px] leading-[100%] mb-6',
              2: 'text-[24px] leading-[100%] mb-4',
              3: 'text-[20px] leading-[100%] mb-3',
              4: 'text-[18px] leading-[100%] mb-3',
              5: 'text-[16px] leading-[100%] mb-2',
              6: 'text-[14px] leading-[100%] mb-2',
            };
            const className = `${baseClasses} ${sizeClasses[level as keyof typeof sizeClasses] || sizeClasses[2]}`;

            switch (level) {
              case 1:
                return <h1 className={className}>{children}</h1>;
              case 2:
                return <h2 className={className}>{children}</h2>;
              case 3:
                return <h3 className={className}>{children}</h3>;
              case 4:
                return <h4 className={className}>{children}</h4>;
              case 5:
                return <h5 className={className}>{children}</h5>;
              case 6:
                return <h6 className={className}>{children}</h6>;
              default:
                return <h2 className={className}>{children}</h2>;
            }
          },
          list: ({ children, format }) => {
            const ListTag = format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag className="font-['Merriweather',serif] font-[400] text-[16px] leading-[28px] tracking-[0%] text-[#000D2D]/70 mb-4 list-disc pl-6 text-justify">
                {children}
              </ListTag>
            );
          },
          'list-item': ({ children }) => <li className="mb-1">{children}</li>,
          quote: ({ children }) => (
            <blockquote className="font-['Merriweather',serif] border-l-4 border-[#000D2D]/20 pl-4 italic text-[#000D2D]/80 mb-4 text-justify">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ),
          link: ({ children, url }) => (
            <a
              href={url}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          image: ({ image }) => {
            if (!image?.url) return null;
            return (
              <img
                src={image.url}
                alt={image.alternativeText || ''}
                className="my-6 w-full h-auto rounded-lg"
                loading="lazy"
              />
            );
          },
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-[600] text-[#000D2D]">{children}</strong>,
          italic: ({ children }) => <em className="italic text-[#000D2D]/80">{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <s>{children}</s>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ),
        }}
      />
    </div>
  );
};

export default RichTextRenderer;
