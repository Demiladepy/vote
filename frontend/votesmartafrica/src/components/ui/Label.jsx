import React from 'react';


const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
  className={`text-sm font-medium text-gray-700 ${className || ""}`}

    {...props}
  />
));
Label.displayName = "Label";

export { Label };