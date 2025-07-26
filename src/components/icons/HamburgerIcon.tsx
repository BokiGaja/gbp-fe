import React from 'react';

interface HamburgerIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const HamburgerIcon = ({ color = '#000D2D', ...props }: HamburgerIconProps) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="6" y="4" width="18" height="2" rx="1" fill={color} />
    <rect x="6" y="10" width="12" height="2" rx="1" fill={color} />
    <rect x="6" y="16" width="6" height="2" rx="1" fill={color} />
  </svg>
);

export default HamburgerIcon;
