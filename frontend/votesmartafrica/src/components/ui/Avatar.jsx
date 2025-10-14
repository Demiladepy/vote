import React from "react";

// Main Avatar component
const Avatar = React.forwardRef(({ 
  className = "", 
  size = "md",
  shape = "circle",
  ...props 
}, ref) => {
  const sizeStyles = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl"
  };

  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-lg"
  };

  return (
    <div
      ref={ref}
      className={`
        relative flex shrink-0 overflow-hidden
        ${sizeStyles[size]} 
        ${shapeStyles[shape]}
        ${className}
      `}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

// Avatar Image component
const AvatarImage = React.forwardRef(({ 
  className = "", 
  src,
  alt = "Avatar",
  ...props 
}, ref) => {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

// Avatar Fallback component
const AvatarFallback = React.forwardRef(({ 
  className = "", 
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        flex h-full w-full items-center justify-center
        bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600
        font-semibold ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

// Avatar Group component
const AvatarGroup = React.forwardRef(({ 
  children, 
  className = "",
  max = 5,
  ...props 
}, ref) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const hiddenCount = avatars.length - max;

  return (
    <div
      ref={ref}
      className={`flex -space-x-2 ${className}`}
      {...props}
    >
      {visibleAvatars}
      {hiddenCount > 0 && (
        <Avatar className="border-2 border-white bg-gray-400">
          <AvatarFallback>+{hiddenCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };