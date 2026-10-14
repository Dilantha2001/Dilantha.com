import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(function SmartVideo(
  { src, className = '', ...props },
  ref
) {
  const innerRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement);

  useEffect(() => {
    const video = innerRef.current;
    if (!video) return;

    let isVisible = false;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    const pauseVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && document.visibilityState === 'visible') {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.05, rootMargin: '120px' }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isVisible) {
        playVideo();
      } else {
        pauseVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [src]);

  return (
    <video
      ref={innerRef}
      src={src}
      muted
      playsInline
      loop
      preload="metadata"
      className={className}
      {...props}
    />
  );
});

export default SmartVideo;
