import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export function FloatingTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 w-48">
      <ul className="space-y-1.5 border-l border-slate-200 pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() =>
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
              }
              className={`block text-left text-xs leading-snug py-1 transition-colors ${
                activeId === item.id
                  ? "text-blue-600 font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
