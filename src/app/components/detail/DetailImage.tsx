import { useState } from "react";

interface DetailImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function DetailImage({ src, alt, caption }: DetailImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="my-4 cursor-zoom-in" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className="w-full rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow" />
        {caption && <p className="text-xs text-slate-500 mt-2 text-center">{caption}</p>}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
