import React from 'react';

const BackArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="21" y1="14" x2="7" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <polyline
      points="14,7 7,14 14,21"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BackArrowIcon;
