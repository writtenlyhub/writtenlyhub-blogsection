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
          <p key={index} className="max-w-[72ch] text-lg leading-[1.8] mb-6">
            {children}
          </p>
        );
      }
      case 'heading-2':
        return (
          <h2 key={index} className="text-3xl font-headline-lg font-bold text-primary mt-10 mb-4 max-w-[72ch] scroll-mt-header-height">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-2'))}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} className="text-2xl font-bold text-primary mt-8 mb-3 font-headline-md max-w-[72ch] scroll-mt-header-height">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-3'))}
          </h3>
        );
      case 'link':
        return (
          <a 
            key={index} 
            href={node.url} 
            className="text-writtenly-orange hover:text-writtenly-orange/80 underline decoration-writtenly-orange/40 hover:decoration-writtenly-orange/80 decoration-1 hover:decoration-2 underline-offset-4 transition-all duration-300"
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
    <div className={`text-lg leading-[1.8] text-on-surface-variant ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
