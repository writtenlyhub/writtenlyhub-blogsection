'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

export default function AnimatedMetric({ value, className }: { value: string, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Remove once: true so it triggers every time it comes into view
  const isInView = useInView(ref, { amount: 0.1 });
  
  const [displayValue, setDisplayValue] = useState("0");
  const [parts, setParts] = useState({ prefix: "", num: 0, suffix: "", decimals: 0, isNumber: false });
  
  useEffect(() => {
    const match = value.trim().match(/^([^0-9.-]*)([0-9.,]+)(.*)$/);
    if (match) {
      const p = match[1];
      const nStr = match[2].replace(/,/g, '');
      const s = match[3];
      const target = parseFloat(nStr);
      const dec = nStr.includes('.') ? nStr.split('.')[1].length : 0;
      setParts({ prefix: p, num: target, suffix: s, decimals: dec, isNumber: true });
    } else {
      setParts({ prefix: "", num: 0, suffix: "", decimals: 0, isNumber: false });
    }
  }, [value]);

  useEffect(() => {
    if (isInView && parts.isNumber) {
      // Animate from 0 to target when scrolling into view
      const controls = animate(0, parts.num, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          const formattedNumber = Number(latest.toFixed(parts.decimals)).toLocaleString('en-US', {
            minimumFractionDigits: parts.decimals,
            maximumFractionDigits: parts.decimals
          });
          setDisplayValue(formattedNumber);
        }
      });
      
      return controls.stop;
    } else if (!isInView && parts.isNumber) {
      // When scrolling out of view, snap to the final assigned value.
      // This prevents it from getting stuck at 0 or a partial number.
      const formattedNumber = Number(parts.num.toFixed(parts.decimals)).toLocaleString('en-US', {
        minimumFractionDigits: parts.decimals,
        maximumFractionDigits: parts.decimals
      });
      setDisplayValue(formattedNumber);
    }
  }, [isInView, parts]);

  return (
    <span ref={ref} className={className}>
      {!parts.isNumber ? (
        value
      ) : (
        <>{parts.prefix}{displayValue}{parts.suffix}</>
      )}
    </span>
  );
}
