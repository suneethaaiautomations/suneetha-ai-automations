import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  aspectClassName?: string;
}

export function MediaImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${aspectClassName} w-full rounded-xl border border-white/10 bg-gradient-to-br from-[#172036] via-[#0E1529] to-[#080B18] flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 flex items-center justify-center text-[#22D3EE] mb-3">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-[#F8FAFC] max-w-xs">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`${aspectClassName} w-full overflow-hidden rounded-xl bg-[#0D1326] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
      />
    </div>
  );
}
