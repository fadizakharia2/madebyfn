import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './testimonials.css';

export interface TestimonialSlide {
  id: string;
  quote: string;
  person: string;
  role?: string | null;
  company?: string | null;
  projectName?: string | null;
  projectHref?: string | null;
}

interface Props {
  items: TestimonialSlide[];
}

/**
 * Kinetic testimonial carousel (Embla): pointer/touch drag with momentum and
 * snapping, previous/next controls, pill progress indicator and keyboard
 * navigation. Reduced-motion users get instant slide changes.
 */
export default function Testimonials({ items }: Props) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [emblaRef, embla] = useEmblaCarousel({
    loop: items.length > 1,
    align: 'start',
    duration: reduced ? 0 : 28,
    skipSnaps: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  const scrollTo = (index: number) => embla?.scrollTo(index);
  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'Home') {
      event.preventDefault();
      scrollTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      scrollTo(items.length - 1);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="tcarousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="tcarousel__viewport" ref={emblaRef} tabIndex={0} onKeyDown={onKeyDown} data-cursor={items.length > 1 ? 'Drag' : undefined}>
        <div className="tcarousel__container">
          {items.map((t, i) => (
            <figure
              key={t.id}
              className="tcarousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={i !== selected}
            >
              <blockquote className="tcarousel__quote">“{t.quote}”</blockquote>
              <figcaption className="tcarousel__meta">
                <span className="tcarousel__rule" aria-hidden="true" />
                <span>
                  <span className="tcarousel__person">{t.person}</span>
                  {(t.role || t.company) && (
                    <span className="tcarousel__role">{[t.role, t.company].filter(Boolean).join(' · ')}</span>
                  )}
                  {t.projectName && t.projectHref && (
                    <a className="tcarousel__project" href={t.projectHref}>
                      {t.projectName} ↗
                    </a>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="tcarousel__controls">
          <div className="tcarousel__pills" role="tablist" aria-label="Choose testimonial">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Testimonial ${i + 1}: ${t.person}`}
                className={`tcarousel__pill${i === selected ? ' is-active' : ''}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
          <div className="tcarousel__arrows">
            <button type="button" className="tcarousel__arrow" onClick={prev} aria-label="Previous testimonial">
              ←
            </button>
            <button type="button" className="tcarousel__arrow" onClick={next} aria-label="Next testimonial">
              →
            </button>
          </div>
          <span className="tcarousel__count" aria-live="polite">
            {String(selected + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
