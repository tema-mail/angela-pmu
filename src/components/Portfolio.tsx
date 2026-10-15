import { useEffect, useRef, useState } from 'preact/hooks';

export interface Work { cat: string; src: string; srcset: string; alt: string }

interface Props {
  works: Work[];
  categories: string[];
  prevIcon: string;
  nextIcon: string;
}

const ALL = 'Все работы';

// Фильтр по услугам и карусель работ: на десктопе стрелки, на телефоне свайп.
export default function Portfolio({ works, categories, prevIcon, nextIcon }: Props) {
  const [cat, setCat] = useState(ALL);
  const [edge, setEdge] = useState({ start: true, end: false });
  const track = useRef<HTMLDivElement>(null);
  const list = cat === ALL ? works : works.filter((w) => w.cat === cat);

  const updateEdges = () => {
    const t = track.current;
    if (!t) return;
    setEdge({ start: t.scrollLeft <= 2, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 2 });
  };

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    updateEdges();
  }, [cat]);

  useEffect(() => {
    const onFilter = (e: Event) => {
      const c = (e as CustomEvent<string>).detail;
      if (categories.includes(c)) setCat(c);
    };
    window.addEventListener('portfolio:filter', onFilter);
    window.addEventListener('resize', updateEdges);
    return () => {
      window.removeEventListener('portfolio:filter', onFilter);
      window.removeEventListener('resize', updateEdges);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const t = track.current;
    const card = t?.firstElementChild as HTMLElement | null;
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <div class="pf">
      <div class="pf__arrows">
        <button class="pf__arrow" aria-label="Назад" disabled={edge.start} onClick={() => step(-1)}>
          <img src={prevIcon} alt="" width="68" height="68" style="transform: rotate(180deg)" />
        </button>
        <button class="pf__arrow" aria-label="Вперёд" disabled={edge.end} onClick={() => step(1)}>
          <img src={nextIcon} alt="" width="68" height="68" />
        </button>
      </div>
      <div class="pf__chips" role="tablist" aria-label="Фильтр работ">
        {[ALL, ...categories].map((c) => (
          <button
            class={'chip' + (c === cat ? ' is-active' : '')}
            role="tab"
            aria-selected={c === cat}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div class="pf__track" ref={track} onScroll={updateEdges}>
        {list.map((w) => (
          <figure class="pf__card" key={w.src}>
            <img src={w.src} srcset={w.srcset} sizes="(max-width: 899px) 78vw, 430px" alt={w.alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </div>
  );
}
