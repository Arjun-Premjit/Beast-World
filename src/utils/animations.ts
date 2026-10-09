import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const animations = {
  // Hero load reveal sequence
  revealHero(elements: {
    badge?: HTMLElement | null;
    title?: HTMLElement | null;
    subtitle?: HTMLElement | null;
    actions?: HTMLElement | null;
    indicators?: HTMLElement | null;
  }) {
    if (isReducedMotion()) {
      // Immediate opacity
      Object.values(elements).forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return gsap.timeline();
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (elements.badge) {
      tl.fromTo(elements.badge, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
    }
    if (elements.title) {
      tl.fromTo(elements.title, { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.25);
    }
    if (elements.subtitle) {
      tl.fromTo(elements.subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
    }
    if (elements.actions) {
      tl.fromTo(elements.actions, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    }
    if (elements.indicators) {
      tl.fromTo(elements.indicators, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.8);
    }

    return tl;
  },

  // Stagger reveal for cards
  staggerCards(containerSelector: string, cardSelector: string) {
    if (isReducedMotion() || typeof window === 'undefined') return;

    return gsap.fromTo(
      cardSelector,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerSelector,
          start: 'top 82%',
          once: true,
        },
      }
    );
  },

  // Scroll section fade up
  fadeUp(element: HTMLElement | null, triggerElement?: HTMLElement | null) {
    if (!element || isReducedMotion()) {
      if (element) gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 85%',
          once: true,
        },
      }
    );
  },

  // Number counter animation
  animateCounter(el: HTMLElement, targetValue: number, suffix = '') {
    if (isReducedMotion()) {
      el.textContent = `${targetValue.toLocaleString()}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    return gsap.to(obj, {
      val: targetValue,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val).toLocaleString()}${suffix}`;
      },
    });
  },
};
