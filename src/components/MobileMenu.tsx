import { useEffect, useState } from 'preact/hooks';

interface Props {
  nav: { href: string; label: string }[];
  phone: string;
  phoneHref: string;
  hours: string;
  bookHref: string;
  telegram: string;
  whatsapp: string;
  tgIcon: string;
  waIcon: string;
  arrowIcon: string;
}

// Бургер и выезжающее меню для экранов уже 1100px.
export default function MobileMenu(p: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        class={'burger' + (open ? ' is-open' : '')}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>
      <div id="mobile-menu" class={'mmenu' + (open ? ' is-open' : '')} aria-hidden={!open} inert={!open}>
        <nav class="mmenu__nav" aria-label="Меню">
          {p.nav.map((i) => (
            <a href={i.href} onClick={close}>{i.label}</a>
          ))}
        </nav>
        <div class="mmenu__bottom">
          <a class="mmenu__phone" href={p.phoneHref}>{p.phone}</a>
          <div class="mmenu__hours">{p.hours}</div>
          <div class="mmenu__icons">
            <a class="icon-btn icon-tg" href={p.telegram} target="_blank" rel="noopener" aria-label="Telegram"><img src={p.tgIcon} alt="" width="15" height="24" /></a>
            <a class="icon-btn" href={p.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp"><img src={p.waIcon} alt="" width="15" height="16" /></a>
          </div>
          <a class="cta mmenu__cta" href={p.bookHref} target="_blank" rel="noopener" onClick={close}>
            Записаться на консультацию
            <span class="cta__dot" aria-hidden="true"><img src={p.arrowIcon} alt="" width="33" height="32" /></span>
          </a>
        </div>
      </div>
    </>
  );
}
