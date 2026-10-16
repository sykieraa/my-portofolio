import React, { useRef, useState, useEffect } from 'react';
import type { CertificateItem } from '../data/certificates';
import { CertificateCard } from './CertificateCard';

interface CertificateCarouselProps {
  certificates: CertificateItem[];
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificateCarousel: React.FC<CertificateCarouselProps> = ({
  certificates,
  onSelectCertificate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0 });
  const activeTrackIndexRef = useRef(certificates.length);
  const isDraggingRef = useRef(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(certificates.length);
  const [activeIndex, setActiveIndex] = useState(0);

  const repeatedCertificates = [...certificates, ...certificates, ...certificates];

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!certificates.length || cards.length < certificates.length * 2) return;

    const cycleWidth = cards[certificates.length].offsetLeft - cards[0].offsetLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft < cycleWidth / 2) {
      container.scrollTo({ left: container.scrollLeft + cycleWidth, behavior: 'auto' });
    } else if (container.scrollLeft > maxScrollLeft - cycleWidth / 2) {
      container.scrollTo({ left: container.scrollLeft - cycleWidth, behavior: 'auto' });
    }

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    const nearestIndex = cards.reduce((closestIndex, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closestIndex];
      const closestDistance = Math.abs(
        closestCard.offsetLeft + closestCard.offsetWidth / 2 - containerCenter,
      );
      return Math.abs(cardCenter - containerCenter) < closestDistance ? index : closestIndex;
    }, 0);

    const newIndex = nearestIndex % certificates.length;
    activeTrackIndexRef.current = nearestIndex;
    setActiveTrackIndex(nearestIndex);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);

    if (!isDraggingRef.current) {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => snapToNearestCard(), 100);
    }
  };

  const snapToNearestCard = () => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    const activeCard = cards[activeTrackIndexRef.current];
    if (!activeCard) return;
    container.scrollTo({
      left: activeCard.offsetLeft - (container.clientWidth - activeCard.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  const updateTrackPadding = () => {
    const container = containerRef.current;
    const card = container?.firstElementChild as HTMLElement | null;
    if (!container || !card) return;
    const sidePadding = Math.max(0, (container.clientWidth - card.offsetWidth) / 2);
    container.style.paddingLeft = `${sidePadding}px`;
    container.style.paddingRight = `${sidePadding}px`;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    dragStateRef.current = { startX: event.clientX, startScrollLeft: container.scrollLeft };
    isDraggingRef.current = true;
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || !container.hasPointerCapture(event.pointerId)) return;
    container.scrollLeft = dragStateRef.current.startScrollLeft - (event.clientX - dragStateRef.current.startX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = false;
    container.releasePointerCapture(event.pointerId);
    snapToNearestCard();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      const card = container?.children[certificates.length] as HTMLElement | undefined;
      if (!container || !card) return;
      updateTrackPadding();
      container.scrollTo({
        left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
        behavior: 'auto',
      });
    }, 100);
    const resizeObserver = containerRef.current
      ? new ResizeObserver(() => {
          updateTrackPadding();
          snapToNearestCard();
        })
      : null;
    if (containerRef.current && resizeObserver) resizeObserver.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      resizeObserver?.disconnect();
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [certificates.length]);

  return (
    <div className="relative w-full py-8">
      {/* Carousel Track */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          touchAction: 'pan-y',
        }}
        className="flex cursor-grab items-center gap-6 overflow-x-auto py-8 sm:gap-8 active:cursor-grabbing no-scrollbar"
      >
        {repeatedCertificates.map((cert, idx) => (
          <div key={`${cert.id}-${idx}`} className="flex-shrink-0">
            <CertificateCard
              certificate={cert}
              isCenter={idx === activeTrackIndex}
              onSelect={onSelectCertificate}
            />
          </div>
        ))}
      </div>

    </div>
  );
};
