import React from 'react';
import { MockContentNode } from '@/types/blog';
import { Quote } from '@/components/blog/Quote';
import { KeyTakeaways } from '@/components/blog/KeyTakeaways';
import { InlineCTA } from '@/components/blog/InlineCTA';
import { WatchLearn } from '@/components/blog/WatchLearn';
import { FAQ } from '@/components/blog/FAQ';
import { ExpertInsight } from '@/components/blog/ExpertInsight';
import { QuickFacts } from '@/components/blog/QuickFacts';
import { Callout } from '@/components/blog/Callout';

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
          <p key={index} className="max-w-[75ch] mx-auto lg:mx-0 font-body-lg text-[1.125rem] leading-[1.85] mb-8 text-on-surface/90">
            {children}
          </p>
        );
      }
      case 'heading-2':
        return (
          <h2 key={index} id={node.id} className="text-3xl font-headline-lg font-bold text-primary mt-14 mb-6 max-w-[75ch] mx-auto lg:mx-0 scroll-mt-header-height leading-snug tracking-tight">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-2'))}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} id={node.id} className="text-2xl font-bold text-primary mt-12 mb-4 font-headline-md max-w-[75ch] mx-auto lg:mx-0 scroll-mt-header-height leading-snug tracking-tight">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'heading-3'))}
          </h3>
        );
      case 'ul':
        return (
          <ul key={index} className="max-w-[75ch] mx-auto lg:mx-0 list-disc list-outside pl-6 mb-8 font-body-lg text-[1.125rem] leading-[1.85] text-on-surface/90 space-y-3">
            {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'ul'))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="max-w-[75ch] mx-auto lg:mx-0 list-decimal list-outside pl-6 mb-8 font-body-lg text-[1.125rem] leading-[1.85] text-on-surface/90 space-y-3">
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
          <blockquote key={index} className="max-w-[75ch] mx-auto lg:mx-0 border-l-4 border-writtenly-orange pl-6 py-2 my-8 bg-transparent">
            <div className="text-xl md:text-[1.375rem] italic font-medium text-primary leading-relaxed">
              {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'blockquote'))}
            </div>
          </blockquote>
        );
      case 'hr':
        return <hr key={index} className="my-12 border-outline-variant/50 max-w-[75ch] mx-auto lg:mx-0" />;
      case 'code-block':
        return (
          <div key={index} className="w-full my-8 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-sm border border-outline-variant/30">
            <div className="flex items-center px-4 py-2 bg-surface-container-highest/10 border-b border-outline-variant/20">
              <span className="text-xs font-mono text-outline-variant uppercase tracking-wider">{node.language || 'code'}</span>
            </div>
            <pre className="p-5 overflow-x-auto text-sm font-mono text-[#d4d4d4] leading-relaxed">
              <code>
                {node.children?.map((child: MockContentNode, i: number) => renderNode(child, i, 'code'))}
              </code>
            </pre>
          </div>
        );
      case 'upload':
        // For Payload media nodes
        return (
          <figure key={index} className="w-full my-12 relative rounded-xl overflow-hidden shadow-sm border border-outline-variant/40">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
                src={node.value?.url || ''} 
                alt={node.value?.alt || 'Blog Image'} 
                className="w-full h-auto object-cover max-h-[70vh]"
             />
             {node.value?.caption && (
               <figcaption className="text-center text-sm text-on-surface-variant mt-4 px-4 pb-4 font-medium italic">
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
      case 'block-quote':
        return <div key={index} className="my-8 max-w-[75ch] mx-auto lg:mx-0"><Quote data={{ quote: node.data?.quote, label: node.data?.label }} /></div>;
      case 'block-keyTakeaways':
        return <div key={index} className="my-10"><KeyTakeaways data={{ title: node.data?.title, items: node.data?.items?.map((i: any) => i.item) || [] }} /></div>;
      case 'block-cta':
        return <div key={index} className="my-10"><InlineCTA data={node.data} /></div>;
      case 'block-watchLearn':
        return <div key={index} className="my-10"><WatchLearn data={node.data} /></div>;
      case 'block-faq':
        return <div key={index} className="my-10"><FAQ data={{ title: node.data?.title, items: node.data?.items?.map((i: any) => ({ question: i.question, answer: i.answer })) || [] }} /></div>;
      case 'block-expertInsight':
        return <ExpertInsight key={index} data={node.data} />;
      case 'block-quickFacts':
        return <QuickFacts key={index} data={node.data} />;
      case 'block-callout':
        return <Callout key={index} data={node.data} />;
      default:
        return null;
    }
  };

  return (
    <div className={`font-body-lg text-[1.125rem] leading-[1.85] text-on-surface/90 w-full ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
