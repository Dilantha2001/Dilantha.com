import './GlossyRedBall.css';

interface GlossyRedBallProps {
  className?: string;
}

export default function GlossyRedBall({ className = '' }: GlossyRedBallProps) {
  return (
    <div className={`glossy-ball-container ${className}`}>
      {/* 3D Glossy Red Ball */}
      <div className="glossy-ball">
        {/* Specular Highlight / Glassy Shine */}
        <div className="glossy-shine" />
        {/* Secondary Light Reflection */}
        <div className="glossy-rim" />
      </div>
    </div>
  );
}
