import React from 'react';
import Link from 'next/link';
import { AuthorProfile } from '@/types/blog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Globe, Mail, Rss, Check } from 'lucide-react';

interface AuthorHeroProps {
  author: AuthorProfile;
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452H16.892V14.88C16.892 13.551 16.868 11.841 15.044 11.841C13.197 11.841 12.913 13.283 12.913 14.786V20.452H9.363V8.995H12.775V10.562H12.823C13.297 9.664 14.457 8.718 16.182 8.718C19.775 8.718 20.447 11.082 20.447 14.17V20.452ZM5.337 7.433C4.195 7.433 3.272 6.509 3.272 5.37C3.272 4.232 4.195 3.308 5.337 3.308C6.476 3.308 7.4 4.232 7.4 5.37C7.4 6.509 6.476 7.433 5.337 7.433ZM7.118 20.452H3.556V8.995H7.118V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.225 0Z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className={className} aria-hidden="true">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

export function AuthorHero({ author }: AuthorHeroProps) {
  const {
    name,
    designation,
    bio,
    avatarUrl,
    linkedin,
    twitter,
    website,
    verified = true,
    expertise = [],
  } = author;

  return (
    <section className="w-full bg-white border-b border-outline-variant/20 pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-container-max mx-auto px-6 md:px-gutter">
        {/* Breadcrumbs with generous breathing room */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10 md:mb-14 font-label-md text-xs sm:text-sm text-on-surface-variant/80">
          <Link href="/" className="hover:text-writtenly-navy transition-colors">
            Home
          </Link>
          <span className="text-outline-variant/60">/</span>
          <Link href="/blog" className="hover:text-writtenly-navy transition-colors">
            Authors
          </Link>
          <span className="text-outline-variant/60">/</span>
          <span className="text-writtenly-navy font-bold">{name}</span>
        </nav>

        {/* Author Identity Grid */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 sm:gap-14 lg:gap-20">
          {/* Portrait & Quick Actions */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-surface-container shadow-xl border-4 border-white">
              <ImageWithFallback
                alt={`Portrait of ${name}`}
                src={avatarUrl}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 192px, 240px"
                priority
              />
              {verified && (
                <div
                  className="absolute bottom-3 right-3 bg-writtenly-orange text-white p-2 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  title="Verified Contributor"
                  aria-label="Verified Contributor"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>

            {/* Social / Profile Links */}
            <div className="flex items-center gap-3 mt-8 flex-wrap justify-center">
              {linkedin && (
                <a
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on LinkedIn`}
                  className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-writtenly-navy hover:bg-writtenly-navy hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <LinkedInIcon />
                </a>
              )}

              {twitter && (
                <a
                  href={twitter.startsWith('http') ? twitter : `https://${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on Twitter/X`}
                  className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-writtenly-navy hover:bg-writtenly-navy hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <TwitterIcon />
                </a>
              )}

              {website && (
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}'s Personal Website`}
                  className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-writtenly-navy hover:bg-writtenly-navy hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}

              <a
                href={`mailto:services@writtenlyhub.com?subject=Inquiry regarding ${encodeURIComponent(name)}`}
                aria-label={`Contact editorial desk about ${name}`}
                className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-writtenly-navy hover:bg-writtenly-navy hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
              </a>

              <Link
                href="/blog"
                aria-label="Author Articles Feed"
                className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-writtenly-navy hover:bg-writtenly-orange hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                title="View All WrittenlyHub Articles"
              >
                <Rss className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="flex-1 flex flex-col text-center lg:text-left pt-2">
            <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-writtenly-orange"></span>
              <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                Contributing Author
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-writtenly-navy tracking-tight mb-3">
              {name}
            </h1>

            <p className="font-headline-md text-lg sm:text-xl font-bold text-writtenly-orange mb-6 tracking-wide">
              {designation}
            </p>

            {bio ? (
              <p className="font-body-md text-base sm:text-lg text-on-surface-variant/90 leading-[1.8] max-w-3xl mb-8 mx-auto lg:mx-0">
                {bio}
              </p>
            ) : (
              <p className="font-body-md text-base sm:text-lg text-on-surface-variant/90 leading-[1.8] max-w-3xl mb-8 italic mx-auto lg:mx-0">
                Editorial contributor and content strategist crafting deep-dive industry research, technical guides, and thought leadership at WrittenlyHub.
              </p>
            )}

            {/* Expertise Chips */}
            {expertise && expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1 justify-center lg:justify-start">
                {expertise.map((chip, idx) => (
                  <span
                    key={idx}
                    className="font-label-md text-xs uppercase px-4 py-2 rounded-full bg-surface-container text-writtenly-navy font-semibold tracking-wider hover:bg-surface-container-high transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
