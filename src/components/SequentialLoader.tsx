import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { sitePath } from '../sitePath';
import './SequentialLoader.css';

type LoaderPhase = 'initial' | 'split' | 'expand' | 'images' | 'collapse' | 'reunite' | 'exit' | 'reveal';

interface SequentialLoaderProps {
  onReveal: () => void;
  onComplete: () => void;
}

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Local adaptation of the supplied Framer Sequential Loader. It keeps its
 * split-text, expanding-image, image-swipe, and masked page-reveal sequence
 * while using the TEDx Meraki visual system and local artwork.
 */
export function SequentialLoader({ onReveal, onComplete }: SequentialLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const images = useMemo(() => [
    sitePath('theme/renaissance_creation.jpg'),
    sitePath('theme/halo_renaissance.png'),
    sitePath('theme/poster_meraki.png'),
  ], []);
  const [phase, setPhase] = useState<LoaderPhase>(prefersReducedMotion ? 'reveal' : 'initial');
  const [imageIndex, setImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(1);

  useEffect(() => {
    const timers: number[] = [];
    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    if (prefersReducedMotion) {
      onReveal();
      schedule(onComplete, 180);
      return () => timers.forEach(window.clearTimeout);
    }

    schedule(() => {
      setPhase('split');
      schedule(() => {
        setPhase('expand');
        schedule(() => {
          setPhase('images');
          let nextImage = 0;
          const advanceImage = () => {
            if (nextImage >= images.length - 1) {
              schedule(() => {
                setPhase('collapse');
                schedule(() => {
                  setPhase('reunite');
                  schedule(() => {
                    setPhase('exit');
                    schedule(() => {
                      setPhase('reveal');
                      onReveal();
                      schedule(onComplete, 1_100);
                    }, 450);
                  }, 600);
                }, 650);
              }, 450);
              return;
            }

            schedule(() => {
              nextImage += 1;
              setSwipeDirection(nextImage % 2 === 0 ? 1 : -1);
              setImageIndex(nextImage);
              advanceImage();
            }, 1_350);
          };
          advanceImage();
        }, 850);
      }, 600);
    }, 500);

    return () => timers.forEach(window.clearTimeout);
  }, [images.length, onComplete, onReveal, prefersReducedMotion]);

  const imageVisible = ['split', 'expand', 'images', 'collapse'].includes(phase);
  const imageExpanded = ['expand', 'images'].includes(phase);
  const textVisible = !['exit', 'reveal'].includes(phase);
  const reveal = phase === 'reveal';
  const firstTextX = phase === 'split' ? 26 : phase === 'expand' || phase === 'images' ? 72 : phase === 'exit' ? -80 : 0;
  const secondTextX = phase === 'split' ? -26 : phase === 'expand' || phase === 'images' ? -72 : phase === 'exit' ? 80 : 0;

  return (
    <div
      className="sequential-loader"
      data-phase={phase}
      aria-live="polite"
      aria-label="Preparing TEDxSIU Hyderabad"
    >
      <motion.div
        className="sequential-loader__mask"
        initial={{ clipPath: 'circle(150% at 50% 50%)' }}
        animate={{ clipPath: reveal ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)' }}
        transition={{ duration: reveal ? 1.1 : 0, ease: EASE_SMOOTH }}
        aria-hidden="true"
      />

      <motion.div
        className="sequential-loader__content"
        animate={{ opacity: reveal ? 0 : 1 }}
        transition={{ duration: reveal ? 0.35 : 0, ease: EASE_SOFT }}
        aria-hidden="true"
      >
        <div className={`sequential-loader__composition ${imageVisible ? 'has-image' : ''}`}>
          <motion.span
            className="sequential-loader__word"
            animate={{ opacity: textVisible ? 1 : 0, x: firstTextX }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
          >
            TEDxSIU
          </motion.span>

          <motion.div
            className="sequential-loader__image-frame"
            animate={{
              width: imageVisible ? (imageExpanded ? 'min(68vw, 680px)' : '190px') : 0,
              height: imageVisible ? (imageExpanded ? 'min(56vh, 540px)' : '82px') : 0,
              marginTop: imageVisible ? 16 : 0,
              marginBottom: imageVisible ? 16 : 0,
              opacity: imageVisible ? 1 : 0,
            }}
            transition={{
              width: { duration: 0.8, ease: EASE_SMOOTH },
              height: { duration: imageExpanded ? 0.85 : 0.65, ease: EASE_SMOOTH },
              marginTop: { duration: 0.5, ease: EASE_SOFT },
              marginBottom: { duration: 0.5, ease: EASE_SOFT },
              opacity: { duration: 0.25, ease: EASE_SOFT },
            }}
          >
            <AnimatePresence initial={false} custom={swipeDirection}>
              <SwipeImage key={`${imageIndex}-${images[imageIndex]}`} src={images[imageIndex]} direction={swipeDirection} />
            </AnimatePresence>
            <div className="sequential-loader__image-veil" />
          </motion.div>

          <motion.span
            className="sequential-loader__word sequential-loader__word--meraki"
            animate={{ opacity: textVisible ? 1 : 0, x: secondTextX }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
          >
            MERAKI
          </motion.span>
        </div>
      </motion.div>

      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Loading TEDxSIU Hyderabad.
      </span>
    </div>
  );
}

function SwipeImage({ src, direction }: { src: string; direction: number }) {
  return (
    <motion.img
      className="sequential-loader__image"
      src={src}
      alt=""
      initial={{ x: direction * 130, scale: 1.08 }}
      animate={{ x: 0, scale: 1.08 }}
      exit={{ x: -direction * 130, scale: 1.08 }}
      transition={{ duration: 0.9, ease: EASE_SMOOTH }}
      draggable={false}
    />
  );
}
