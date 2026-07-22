import React from 'react';
import { MockContentNode } from '@/types/blog';

export interface RichTextProps {
  content: MockContentNode[];
  className?: string;
}

export function RichText({ content, className = '' }: RichTextProps) {
  const renderNode = (node: MockContentNode, index: number, parentType?: string) => {
    switch (node.type) {
      case 'paragraph': {
        const children = node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'paragraph'));
        if (parentType === 'paragraph') {
          return <span key={index} className="block mb-6">{children}</span>;
        }
        return (
          <p key={index} className="max-w-[75ch] mx-auto lg:mx-0 text-lg leading-[1.8] mb-6">
            {children}
          </p>
        );
      }
      case 'heading-2':
        return (
          <h2 key={index} className="text-3xl font-headline-lg font-bold text-primary mt-12 mb-6 max-w-[75ch] mx-auto lg:mx-0 scroll-mt-header-height">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-2'))}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} className="text-2xl font-bold text-primary mt-10 mb-4 font-headline-md max-w-[75ch] mx-auto lg:mx-0 scroll-mt-header-height">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-3'))}
          </h3>
        );
      case 'ul':
        return (
          <ul key={index} className="max-w-[75ch] mx-auto lg:mx-0 list-disc list-outside pl-5 mb-6 text-lg leading-[1.8] text-on-surface-variant space-y-2">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'ul'))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="max-w-[75ch] mx-auto lg:mx-0 list-decimal list-outside pl-5 mb-6 text-lg leading-[1.8] text-on-surface-variant space-y-2">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'ol'))}
          </ol>
        );
      case 'li':
        return (
          <li key={index} className="pl-2">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'li'))}
          </li>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="max-w-[75ch] mx-auto lg:mx-0 border-l-4 border-writtenly-orange pl-6 py-2 my-8 bg-surface-container-low/50 rounded-r-xl">
            <div className="text-xl italic font-medium text-primary leading-[1.7]">
              {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'blockquote'))}
            </div>
          </blockquote>
        );
      case 'hr':
        return <hr key={index} className="my-10 border-outline-variant/50 max-w-[75ch] mx-auto lg:mx-0" />;
      case 'code-block':
        return (
          <div key={index} className="w-full my-8 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-md border border-outline-variant/30">
            <div className="flex items-center px-4 py-2 bg-surface-container-highest/10 border-b border-outline-variant/20">
              <span className="text-xs font-mono text-outline-variant uppercase">{node.language || 'code'}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-[#d4d4d4] leading-[1.6]">
              <code>
                {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'code'))}
              </code>
            </pre>
          </div>
        );
      case 'upload':
        // For Payload media nodes
        return (
          <figure key={index} className="w-full my-10 relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant/50">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
                src={node.value?.url || ''} 
                alt={node.value?.alt || 'Blog Image'} 
                className="w-full h-auto object-cover max-h-[80vh]"
             />
             {node.value?.caption && (
               <figcaption className="text-center text-sm text-on-surface-variant mt-3 px-4 pb-3">
                 {node.value.caption}
               </figcaption>
             )}
          </figure>
        );
      case 'link':
        return (
          <a 
            key={index} 
            href={node.url} 
            className="text-writtenly-orange hover:text-writtenly-orange/80 underline decoration-writtenly-orange/40 hover:decoration-writtenly-orange/80 decoration-1 hover:decoration-2 underline-offset-4 transition-all duration-300 break-words"
          >
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'link'))}
          </a>
        );
      case 'text':
        return <React.Fragment key={index}>{node.text}</React.Fragment>;
      default:
        return null;
    }
  };

  return (
    <div className={`text-lg leading-[1.8] text-on-surface-variant w-full ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
