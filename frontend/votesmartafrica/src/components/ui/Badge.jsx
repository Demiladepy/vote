import React from "react";

export const Badge = React.forwardRef(({ 
  children, 
  className = "", 
  variant = "default",
  size = "md",
  rounded = "full",
  icon: Icon,
  iconPosition = "left",
  onRemove,
  removable = false,
  ...props 
}, ref) => {
  // Base styles
  const baseStyle = "inline-flex items-center font-medium transition-all duration-200 ease-in-out";
  
  // Size variants
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2"
  };
  
  // Rounded variants
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  
  // Color variants with better contrast and hover states
  const variantStyles = {
    default: "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200",
    success: "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200",
    info: "bg-cyan-100 text-cyan-800 border border-cyan-200 hover:bg-cyan-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200",
    pink: "bg-pink-100 text-pink-800 border border-pink-200 hover:bg-pink-200",
    outline: "bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50",
    solid: {
      default: "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600",
      secondary: "bg-gray-500 text-white border border-gray-600 hover:bg-gray-600",
      destructive: "bg-red-500 text-white border border-red-600 hover:bg-red-600",
      success: "bg-green-500 text-white border border-green-600 hover:bg-green-600",
      warning: "bg-yellow-500 text-white border border-yellow-600 hover:bg-yellow-600",
      info: "bg-cyan-500 text-white border border-cyan-600 hover:bg-cyan-600",
      purple: "bg-purple-500 text-white border border-purple-600 hover:bg-purple-600",
      pink: "bg-pink-500 text-white border border-pink-600 hover:bg-pink-600",
    }
  };

  // Determine if it's a solid variant
  const isSolidVariant = variant.startsWith('solid-');
  const variantKey = isSolidVariant ? variant.replace('solid-', '') : variant;
  
  const getVariantStyle = () => {
    if (isSolidVariant) {
      return variantStyles.solid[variantKey] || variantStyles.solid.default;
    }
    return variantStyles[variantKey] || variantStyles.default;
  };

  const combinedClassName = [
    baseStyle,
    sizeStyles[size],
    roundedStyles[rounded],
    getVariantStyle(),
    className
  ].filter(Boolean).join(" ");

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      ref={ref}
      className={combinedClassName}
      {...props}
    >
      {/* Left Icon */}
      {Icon && iconPosition === "left" && (
        <Icon className="w-3 h-3 flex-shrink-0" />
      )}
      
      {/* Badge Content */}
      <span className="whitespace-nowrap">{children}</span>
      
      {/* Right Icon or Remove Button */}
      {Icon && iconPosition === "right" && (
        <Icon className="w-3 h-3 flex-shrink-0" />
      )}
      
      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1 -mr-1 p-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove badge"
        >
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
});

Badge.displayName = "Badge";