import React, { useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

// A position: fixed element is positioned relative to the viewport UNLESS an
// ancestor establishes a containing block (transform, perspective, filter,
// will-change of those, or contain). When that happens, the cursor's translate
// no longer maps to viewport coordinates, so we measure and compensate for it.
const getContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement ?? null;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null): { x: number; y: number } => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#e2c17c',
  cursorColorOnTarget = '#eb0028'
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const activeStrengthRef = useRef({ current: 0 });

  const cursorCoords = useRef({ x: 0, y: 0 });
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>('.target-cursor-corner');

    containingBlockRef.current = getContainingBlock(cursor);
    let cachedOffset = getContainingBlockOffset(containingBlockRef.current);
    const getOffset = () => cachedOffset;

    // High performance GSAP quickTo setters for zero-allocation 120fps tracking
    xTo.current = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3.out' });
    yTo.current = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3.out' });

    let activeTarget: Element | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    spinTl.current = gsap
      .timeline({ repeat: -1 })
      .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });

    const moveHandler = (e: MouseEvent) => {
      const targetX = e.clientX - cachedOffset.x;
      const targetY = e.clientY - cachedOffset.y;
      cursorCoords.current.x = targetX;
      cursorCoords.current.y = targetY;
      xTo.current?.(targetX);
      yTo.current?.(targetY);
    };

    window.addEventListener('mousemove', moveHandler, { passive: true });

    const scrollHandler = () => {
      cachedOffset = getContainingBlockOffset(containingBlockRef.current);
      if (!activeTarget || !cursorRef.current) return;
      const rect = activeTarget.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const { x: offsetX, y: offsetY } = cachedOffset;

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
      ];
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.15 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    tickerFnRef.current = () => {
      if (!isActiveRef.current || !targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const { cornerSize } = constants;
      const strength = activeStrengthRef.current.current;
      const cursorX = (cursorRef.current as any)._gsap?.x ?? cursorCoords.current.x;
      const cursorY = (cursorRef.current as any)._gsap?.y ?? cursorCoords.current.y;

      const basePositions = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
      ];

      Array.from(cornersRef.current).forEach((corner, i) => {
        const targetPos = targetCornerPositionsRef.current![i];
        const relTargetX = targetPos.x - cursorX;
        const relTargetY = targetPos.y - cursorY;

        const finalX = basePositions[i].x + (relTargetX - basePositions[i].x) * strength;
        const finalY = basePositions[i].y + (relTargetY - basePositions[i].y) * strength;

        gsap.set(corner, { x: finalX, y: finalY });
      });
    };

    const enterHandler = (e: MouseEvent) => {
      const directTarget = (e.target as Element).closest(targetSelector);
      if (!directTarget || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget && activeTarget !== directTarget) {
        cleanupTarget(activeTarget);
      }

      activeTarget = directTarget;
      const target = directTarget;

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      if (spinTl.current) {
        spinTl.current.pause();
      }

      gsap.to(cursorRef.current, { rotation: 0, duration: 0.2, ease: 'power2.out' });

      const corners = Array.from(cornersRef.current);
      gsap.killTweensOf(corners, 'x,y');

      if (cursorColorOnTarget) {
        gsap.to(corners, {
          borderColor: cursorColorOnTarget,
          duration: 0.2,
          ease: 'power2.out'
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColorOnTarget,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      }

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const { x: offsetX, y: offsetY } = getOffset();
      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current!);

      gsap.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current![i].x - cursorX,
          y: targetCornerPositionsRef.current![i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      const leaveHandler = () => {
        if (tickerFnRef.current) {
          gsap.ticker.remove(tickerFnRef.current);
        }
        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
        activeTarget = null;

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), {
            borderColor: cursorColor,
            duration: 0.15,
            ease: 'power2.out'
          });
          if (dotRef.current) {
            gsap.to(dotRef.current, {
              backgroundColor: cursorColor,
              duration: 0.15,
              ease: 'power2.out'
            });
          }
        }

        if (cornersRef.current) {
          const cornersList = Array.from(cornersRef.current);
          gsap.killTweensOf(cornersList, 'x,y');
          const { cornerSize: cSize } = constants;
          const positions = [
            { x: -cSize * 1.5, y: -cSize * 1.5 },
            { x: cSize * 0.5, y: -cSize * 1.5 },
            { x: cSize * 0.5, y: cSize * 0.5 },
            { x: -cSize * 1.5, y: cSize * 0.5 }
          ];
          const tl = gsap.timeline();
          cornersList.forEach((corner, index) => {
            tl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: 'power3.out' }, 0);
          });
        }
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => {
                spinTl.current?.restart();
              }
            });
          }
          resumeTimeout = null;
        }, 50);
        cleanupTarget(target);
      };
      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler as EventListener);

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
    };
    window.addEventListener('resize', resizeHandler);

    const activeStrengthObj = activeStrengthRef.current;

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler as EventListener);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthObj.current = 0;
    };
  }, [
    targetSelector,
    spinDuration,
    constants,
    hideDefaultCursor,
    isMobile,
    hoverDuration,
    parallaxOn,
    cursorColor,
    cursorColorOnTarget
  ]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration, isMobile]);

  if (isMobile || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      className="target-cursor-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 2147483647,
        willChange: 'transform'
      }}
    >
      <div
        ref={dotRef}
        className="target-cursor-dot"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          backgroundColor: cursorColor
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '12px',
          height: '12px',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: cursorColor,
          borderRight: 'none',
          borderBottom: 'none',
          transform: 'translate(-150%, -150%)',
          willChange: 'transform'
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '12px',
          height: '12px',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: cursorColor,
          borderLeft: 'none',
          borderBottom: 'none',
          transform: 'translate(50%, -150%)',
          willChange: 'transform'
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '12px',
          height: '12px',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: cursorColor,
          borderLeft: 'none',
          borderTop: 'none',
          transform: 'translate(50%, 50%)',
          willChange: 'transform'
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '12px',
          height: '12px',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: cursorColor,
          borderRight: 'none',
          borderTop: 'none',
          transform: 'translate(-150%, 50%)',
          willChange: 'transform'
        }}
      />
    </div>,
    document.body
  );
};

export default TargetCursor;