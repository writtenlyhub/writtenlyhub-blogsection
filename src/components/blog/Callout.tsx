import React from 'react';

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
      icon: 'info',
      bg: 'bg-surface-container-high',
      border: 'border-outline-variant/50',
      text: 'text-writtenly-navy',
      iconColor: 'text-writtenly-navy',
    },
    warning: {
      icon: 'warning',
      bg: 'bg-error-container',
      border: 'border-error/20',
      text: 'text-on-error-container',
      iconColor: 'text-error',
    },
    tip: {
      icon: 'lightbulb',
      bg: 'bg-secondary-fixed',
      border: 'border-secondary-fixed-dim/50',
      text: 'text-on-secondary-fixed',
      iconColor: 'text-writtenly-orange',
    },
    'pro-tip': {
      icon: 'stars',
      bg: 'bg-primary-fixed',
      border: 'border-primary-fixed-dim/50',
      text: 'text-on-primary-fixed',
      iconColor: 'text-writtenly-orange',
    },
  };

  const config = typeConfig[data.type || 'info'] || typeConfig.info;

  return (
    <div className={`my-10 max-w-[75ch] mx-auto lg:mx-0 p-6 rounded-xl border ${config.bg} ${config.border}`}>
      <div className="flex gap-4">
        <span className={`material-symbols-outlined shrink-0 text-[24px] ${config.iconColor}`}>
          {config.icon}
        </span>
        <div className="flex flex-col gap-2">
          {data.title && (
            <span className={`font-bold uppercase tracking-wider text-sm ${config.text}`}>
              {data.title}
            </span>
          )}
          <p className={`text-base leading-relaxed ${config.text} opacity-90`}>
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
}
