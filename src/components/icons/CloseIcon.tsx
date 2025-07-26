import React from 'react';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="7" y1="7" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="7" x2="7" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default CloseIcon;
