import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';

export default function Window({
  id,
  title,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  children,
  width = 700,
  height = 500,
  defaultX = 100,
  defaultY = 80,
  desktopRef,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const [dimensions, setDimensions] = useState({ width, height });

  // Handle responsive dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: isMobile ? window.innerWidth - 32 : width,
        height: isMobile ? window.innerHeight - 150 : height,
      });
    }
  }, [width, height]);

  if (!isOpen) return null;

  const handlePointerDown = (e) => {
    onFocus(id);
    if (!isMaximized) {
      dragControls.start(e);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, x: defaultX, y: defaultY }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        width: isMaximized ? '100%' : dimensions.width,
        height: isMaximized ? '100%' : dimensions.height,
        borderRadius: isMaximized ? 0 : 14,
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', duration: 0.4 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={desktopRef}
      dragMomentum={false}
      style={{
        zIndex,
        position: 'absolute',
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
      }}
      className="os-window"
      onMouseDown={() => onFocus(id)}
      onTouchStart={() => onFocus(id)}
    >
      {/* Title Bar Header */}
      <div
        className="os-window-header"
        onPointerDown={handlePointerDown}
      >
        {/* macOS Window Controls */}
        <div className="os-window-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="os-window-control-btn os-window-control-close"
            title="Close"
            aria-label="Close window"
          >
            <svg className="os-window-control-icon" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3 3l6 6M9 3L3 9" stroke="#4c0002" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            className="os-window-control-btn os-window-control-minimize"
            title="Minimize"
            aria-label="Minimize window"
          >
            <svg className="os-window-control-icon" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M2.5 6h7" stroke="#975700" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
            className="os-window-control-btn os-window-control-maximize"
            title="Toggle Maximize"
            aria-label="Toggle maximize window"
          >
            <svg className="os-window-control-icon" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3 9h3.5L3 5.5V9zM9 3H5.5L9 6.5V3z" fill="#006500" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="os-window-title">
          {title}
        </div>

        {/* Right side spacer for centering */}
        <div style={{ width: '64px' }} />
      </div>

      {/* Body Content */}
      <div className="os-window-body">
        {children}
      </div>
    </motion.div>
  );
}
