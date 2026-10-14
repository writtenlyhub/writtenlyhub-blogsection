export interface TitlePart {
  text: string;
  className?: string;
  noSpaceAfter?: boolean;
}

interface AnimatedHeroTitleProps {
  parts?: TitlePart[];
  className?: string;
  baseDelay?: number;
  letterDelay?: number;
}

const DEFAULT_PARTS: TitlePart[] = [
  { text: "Let's", className: 'text-writtenly-navy' },
  { text: 'talk!', className: 'text-writtenly-orange' },
];

/**
 * Server-rendered letter-by-letter hero title animation.
 * Reuses the proven pure CSS animation pattern from the Blog and Our Work sections.
 */
export function AnimatedHeroTitle({
  parts = DEFAULT_PARTS,
  className = 'font-display text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-extrabold tracking-tight leading-[1] mb-5',
  baseDelay = 0.1,
  letterDelay = 0.04,
}: AnimatedHeroTitleProps) {
  const fullText = parts.map((p) => p.text).join(' ');

  let globalCharIndex = 0;

  return (
    <h1 className={className} aria-label={fullText}>
      {/* Screen-reader accessible plain text */}
      <span className="sr-only">{fullText}</span>

      {/* Visually animated letter-by-letter presentation */}
      <span aria-hidden="true" className="inline-block">
        {parts.map((part, pIdx) => {
          const words = part.text.split(' ');
          return (
            <span key={pIdx} className={part.className}>
              {words.map((word, wIdx) => {
                const chars = Array.from(word);
                return (
                  <span
                    key={wIdx}
                    className="inline-block whitespace-nowrap"
                  >
                    {chars.map((char, cIdx) => {
                      const delay = baseDelay + globalCharIndex * letterDelay;
                      globalCharIndex++;
                      return (
                        <span
                          key={cIdx}
                          className="animate-letter"
                          style={{
                            animationDelay: `${Math.round(delay * 1000)}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                    {/* Space within words in the same part */}
                    {wIdx < words.length - 1 && (
                      <span className="inline-block">&nbsp;</span>
                    )}
                  </span>
                );
              })}
              {/* Space between parts */}
              {pIdx < parts.length - 1 && !part.noSpaceAfter && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
