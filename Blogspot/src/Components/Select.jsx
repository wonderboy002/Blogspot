import React, { useId } from "react";

function Select({ options, className, ...props }, ref) {
  const id = useId();
  return (
    <div>
      <select {...props} id={id} ref={ref} className={`${className}`}>
        {options?.map((option) => {
          <option key={option} value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
