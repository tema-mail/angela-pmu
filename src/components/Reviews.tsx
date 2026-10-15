import { useRef, useState } from 'preact/hooks';

export interface Review { src: string; srcset: string; full: string; ratio: number; pos: string }

// Скриншоты отзывов: на десктопе 4 колонки как в макете, на телефоне карусель; по нажатию – целиком.
export default function Reviews({ columns }: { columns: Review[][] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  const show = (full: string) => {
    setOpen(full);
    dlg.current?.showModal();
  };
  const hide = () => dlg.current?.close();

  let n = 0;
  return (
    <>
      <div class="rv">
        {columns.map((col) => (
          <div class="rv__col">
            {col.map((r) => {
              n += 1;
              return (
                <button class="rv__card" style={`--ratio:${r.ratio};--pos:${r.pos}`} onClick={() => show(r.full)} aria-label={`Открыть отзыв ${n}`}>
                  <img src={r.src} srcset={r.srcset} sizes="(max-width: 899px) 80vw, 320px" alt={`Отзыв клиента ${n}`} loading="lazy" decoding="async" />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <dialog class="rv__dlg" ref={dlg} onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && hide()}>
        {open && <img src={open} alt="Отзыв клиента" />}
        <button class="rv__close" onClick={hide} aria-label="Закрыть">×</button>
      </dialog>
    </>
  );
}
