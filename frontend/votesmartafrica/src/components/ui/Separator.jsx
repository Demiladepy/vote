import React from "react";

export const Separator = React.forwardRef(({ 
  className = "", 
  orientation = "horizontal",
  decorative = true,
  spacing = "default",
  variant = "default",
  ...props 
}, ref) => {
  const Component = decorative ? "div" : "hr";
  
  // Base styles
  const baseStyles = "shrink-0";
  
  // Orientation styles
  const orientationStyles = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px"
  };
  
  // Spacing styles
  const spacingStyles = {
    none: "",
    tight: orientation === "horizontal" ? "my-2" : "mx-2",
    default: orientation === "horizontal" ? "my-4" : "mx-4",
    loose: orientation === "horizontal" ? "my-6" : "mx-6"
  };
  
  // Variant styles
  const variantStyles = {
    default: "bg-border",
    subtle: "bg-gray-200",
    strong: "bg-gray-400",
    dashed: "border border-dashed border-gray-300 bg-transparent"
  };

  const combinedClassName = [
    baseStyles,
    orientationStyles[orientation],
    spacingStyles[spacing],
    variantStyles[variant],
    className
  ].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

// Optional: Default props
Separator.defaultProps = {
  orientation: "horizontal",
  decorative: true,
  spacing: "default",
  variant: "default"
};