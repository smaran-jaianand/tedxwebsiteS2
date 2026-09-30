import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Home, Flame, Clock, Type, Users, Calendar, MapPin, History, ArrowUp } from 'lucide-react';

interface DockItem {
  id: string;
  title: string;
  icon: any;
  href?: string;
  action?: () => void;
  accentColor: string;
}

export const MacDock: React.FC = () => {
  const dockRef = useRef<HTMLUListElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const isHome = window.location.pathname.replace(/\/+$/, '') === '' || window.location.pathname === '/';
  const homeHref = (anchor: string) => (isHome ? anchor : `/${anchor}`);

  const dockItems: DockItem[] = [
    {
      id: 'home',
      title: 'Prologue / Home',
      icon: Home,
      href: homeHref('#hero'),
      accentColor: 'var(--ted-red)',
    },
    {
      id: 'theme',
      title: 'The Meraki Mythos',
      icon: Flame,
      href: homeHref('#theme'),
      accentColor: 'var(--greek-gold)',
    },
    {
      id: 'countdown',
      title: '9th Oct Countdown',
      icon: Clock,
      href: homeHref('#countdown'),
      accentColor: 'var(--ted-red)',
    },
    {
      id: 'scroller',
      title: 'Meraki Scroller',
      icon: Type,
      href: homeHref('#scroller'),
      action: isHome ? () => document.querySelector('.Horizontal')?.scrollIntoView({ behavior: 'smooth' }) : undefined,
      accentColor: 'var(--greek-gold)',
    },
    {
      id: 'speakers',
      title: 'Visionary Speakers',
      icon: Users,
      href: '/speakers',
      accentColor: 'var(--ted-red)',
    },
    {
      id: 'team',
      title: 'Working Team',
      icon: Users,
      href: '/team',
      accentColor: 'var(--greek-gold)',
    },
    {
      id: 'schedule',
      title: '9th Oct Itinerary',
      icon: Calendar,
      href: homeHref('#schedule'),
      accentColor: 'var(--greek-gold)',
    },
    {
      id: 'venue',
      title: 'SIUH Campus Venue',
      icon: MapPin,
      href: homeHref('#venue'),
      accentColor: 'var(--ted-red)',
    },
    {
      id: 'season1',
      title: 'Season 1 Legacy Archive',
      icon: History,
      href: '/season1/index.html',
      action: () => {
        window.open('/season1/index.html', '_blank');
      },
      accentColor: 'var(--greek-gold)',
    },
    {
      id: 'top',
      title: 'Scroll to Top',
      icon: ArrowUp,
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      accentColor: '#94a3b8',
    },
  ];

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll<HTMLElement>('.toolbarItem');
    if (!icons.length) return;

    const firstIcon = icons[0];
    const min = 50; // 42 + margin
    const max = 115;
    const bound = min * Math.PI;

    gsap.set(icons, {
      transformOrigin: '50% 120%',
      height: 42,
    });

    gsap.set(dock, {
      position: 'relative',
      height: 64,
    });

    let rafId: number | null = null;
    let cachedOffset = dock.getBoundingClientRect().left + firstIcon.offsetLeft;

    const updateOffset = () => {
      cachedOffset = dock.getBoundingClientRect().left + firstIcon.offsetLeft;
    };

    const handleMouseEnter = () => {
      updateOffset();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId !== null) return;
      const clientX = event.clientX;
      rafId = requestAnimationFrame(() => {
        updateIcons(clientX - cachedOffset);
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      gsap.to(icons, {
        duration: 0.3,
        scale: 1,
        x: 0,
        overwrite: 'auto',
      });
      setActiveTooltip(null);
    };

    function updateIcons(pointer: number) {
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        const distance = i * min + min / 2 - pointer;
        let x = 0;
        let scale = 1;

        if (-bound < distance && distance < bound) {
          const rad = (distance / min) * 0.5;
          scale = 1 + (max / min - 1) * Math.cos(rad);
          x = 2 * (max - min) * Math.sin(rad);
        } else {
          x = (-bound < distance ? 2 : -2) * (max - min);
        }

        gsap.to(icon, {
          duration: 0.25,
          x: x,
          scale: scale,
          overwrite: 'auto',
        });
      }
    }

    dock.addEventListener('mouseenter', handleMouseEnter);
    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateOffset);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      dock.removeEventListener('mouseenter', handleMouseEnter);
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <div className="wrapper" style={{ zIndex: 900 }}>
      {/* Active Tooltip */}
      {activeTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-38px',
            background: 'var(--text-main)',
            color: 'var(--bg-dark)',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontFamily: 'var(--font-classical)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            border: '1px solid var(--border-gold)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
            pointerEvents: 'none',
          }}
        >
          {activeTooltip}
        </div>
      )}

      <ul
        ref={dockRef}
        className="toolbar"
        style={{
          border: '1px solid var(--border-gold)',
          borderBottom: 'none',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 -6px 30px rgba(0, 0, 0, 0.15)',
          padding: '10px 16px',
        }}
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className="toolbarItem"
              onMouseEnter={() => setActiveTooltip(item.title)}
              style={{
                width: '42px',
                height: '42px',
                margin: '0 4px',
              }}
            >
              <a
                className="toolbarLink cursor-target"
                href={item.href || '#!'}
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    item.action();
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--bg-surface)',
                  border: `1.5px solid ${item.accentColor}`,
                  color: item.accentColor,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'background 0.2s, transform 0.2s',
                }}
              >
                <Icon size={18} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
