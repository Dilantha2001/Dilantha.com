import { useMemo } from 'react';
import './StripedSphere.css';

interface StripedSphereProps {
  className?: string;
}

const COLOR_GROUPS = [
  { className: 'white', color: '#e5e7eb', zIndex: 2 },
  { className: 'red', color: '#dc2626', zIndex: 3 },
  { className: 'orange', color: '#ff4d00', zIndex: 2 },
  { className: 'yellow', color: '#facc15', zIndex: 1 },
  { className: 'green', color: '#16a34a', zIndex: 0 },
  { className: 'blue', color: '#0052ff', zIndex: 1 },
];

export default function StripedSphere({ className = '' }: StripedSphereProps) {
  // Generate 360 semicircle slices (60 per color, rotated around Y axis)
  const slices = useMemo(() => {
    const items: Array<{ id: number; colorClass: string; deg: number; zIndex: number }> = [];
    let currentDeg = 0;

    COLOR_GROUPS.forEach((group) => {
      for (let i = 0; i < 60; i++) {
        items.push({
          id: currentDeg,
          colorClass: group.className,
          deg: currentDeg,
          zIndex: group.zIndex,
        });
        currentDeg += 1;
      }
    });

    return items;
  }, []);

  return (
    <div className={`striped-sphere-wrapper ${className}`}>
      <div id="ball" className="striped-ball">
        {slices.map((slice) => (
          <div
            key={slice.id}
            className={`semicircle ${slice.colorClass}`}
            style={{
              transform: `rotateY(${slice.deg}deg)`,
              WebkitTransform: `rotateY(${slice.deg}deg)`,
              zIndex: slice.zIndex,
            }}
          />
        ))}
      </div>
    </div>
  );
}
