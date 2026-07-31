import React from 'react';
import { Info, TriangleAlert, Lightbulb, Sparkles } from 'lucide-react';

export interface CalloutProps {
  data: {
    title?: string;
    content?: string;
    type?: 'info' | 'warning' | 'tip' | 'pro-tip';
  };
}

export function Callout({ data }: CalloutProps) {
  if (!data?.content) return null;

  const typeConfig = {
    info: {
      icon: Info,
      bg: 'bg-surface-container-high',
      border: 'border-outline-variant/50',
      text: 'text-writtenly-navy',
      iconColor: 'text-writtenly-navy',
    },
    warning: {
      icon: TriangleAlert,
      bg: 'bg-error-container',
      border: 'border-error/20',
      text: 'text-on-error-container',
      iconColor: 'text-error',
    },
    tip: {
      icon: Lightbulb,
      bg: 'bg-secondary-fixed',
      border: 'border-secondary-fixed-dim/50',
      text: 'text-on-secondary-fixed',
      iconColor: 'text-writtenly-orange',
    },
    'pro-tip': {
      icon: Sparkles,
      bg: 'bg-primary-fixed',
      border: 'border-primary-fixed-dim/50',
      text: 'text-on-primary-fixed',
      iconColor: 'text-writtenly-orange',
    },
  };

  const config = typeConfig[data.type || 'info'] || typeConfig.info;

  return (
    <div className={`my-8 max-w-[75ch] mx-auto lg:mx-0 p-6 rounded-xl border ${config.bg} ${config.border}`}>
      <div className="flex gap-4">
        <config.icon className={`shrink-0 ${config.iconColor}`} size={24} />
        <div className="flex flex-col gap-2">
          {data.title && (
            <span className={`text-sm font-bold tracking-wide ${config.text}`}>
              {data.title}
            </span>
          )}
          <p className={`text-base md:text-lg ${config.text} opacity-90`}>
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
}
