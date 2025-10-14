import React from "react";

export const ScrollArea = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`overflow-auto ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollArea.displayName = "ScrollArea";

// If you need ScrollBar component as well
export const ScrollBar = React.forwardRef(({ 
  className, 
  orientation = "vertical", 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex touch-none select-none transition-colors
        ${orientation === "vertical" ? "h-full w-2.5 p-1" : "h-2.5 w-full flex-col p-1"}
        ${className || ''}
      `}
      {...props}
    >
      <div
        className={`
          relative rounded-full bg-gray-300
          ${orientation === "vertical" ? "w-2" : "h-2"}
        `}
      />
    </div>
  );
});

ScrollBar.displayName = "ScrollBar";