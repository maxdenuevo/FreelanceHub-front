import React from 'react';
import { cn } from "@/lib/utils";

export const ColorLogo = ({ className = "", size = 40 }) => (
  <svg 
    className={cn("", className)}
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
      </filter>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1a3244"/>
        <stop offset="100%" stop-color="#2c5a7a"/>
      </linearGradient>
    </defs>
    
    {/* Hexagon background */}
    <path 
      d="M60,15 L97,38 L97,82 L60,105 L23,82 L23,38 Z" 
      fill="url(#logoGradient)" 
      filter="url(#shadow)"
    />
    
    {/* Hexagon outline */}
    <path 
      d="M60,15 L97,38 L97,82 L60,105 L23,82 L23,38 Z" 
      fill="none" 
      stroke="white" 
      stroke-width="4" 
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    
    {/* Stylized "F" with checkmark */}
    <g>
      {/* "F" part */}
      <path 
        d="M40,40 L70,40 M40,40 L40,80 M40,60 L65,60" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      
      {/* Checkmark */}
      <path 
        d="M65,70 L75,80 L90,55" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

/**
 * White logo for dark backgrounds
 */
export const WhiteLogo = ({ className = "", size = 40 }) => (
  <svg 
    className={cn("", className)}
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hexagon background */}
    <path 
      d="M60,15 L97,38 L97,82 L60,105 L23,82 L23,38 Z" 
      fill="none"
      stroke="white" 
      stroke-width="4" 
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    
    {/* Stylized "F" with checkmark */}
    <g>
      {/* "F" part */}
      <path 
        d="M40,40 L70,40 M40,40 L40,80 M40,60 L65,60" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      
      {/* Checkmark */}
      <path 
        d="M65,70 L75,80 L90,55" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

/**
 * Monochrome logo that allows custom coloring
 */
export const MonochromeLogo = ({ 
  className = "", 
  size = 40, 
  color = "#1a3244",
  accentColor = "white" 
}) => (
  <svg 
    className={cn("", className)}
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hexagon background */}
    <path 
      d="M60,15 L97,38 L97,82 L60,105 L23,82 L23,38 Z" 
      fill={color}
    />
    
    {/* Stylized "F" with checkmark */}
    <g>
      {/* "F" part */}
      <path 
        d="M40,40 L70,40 M40,40 L40,80 M40,60 L65,60" 
        fill="none" 
        stroke={accentColor} 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      
      {/* Checkmark */}
      <path 
        d="M65,70 L75,80 L90,55" 
        fill="none" 
        stroke={accentColor} 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

/**
 * Small icon version (just the logo mark without text)
 */
export const LogoIcon = ({ className = "", size = 24, color = "#1a3244" }) => (
  <svg 
    className={cn("", className)}
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hexagon background */}
    <path 
      d="M60,15 L97,38 L97,82 L60,105 L23,82 L23,38 Z" 
      fill={color}
    />
    
    {/* Stylized "F" with checkmark - simplified for small sizes */}
    <g>
      <path 
        d="M40,40 L70,40 M40,40 L40,80 M40,60 L65,60" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M65,70 L75,80 L90,55" 
        fill="none" 
        stroke="white" 
        stroke-width="6" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </g>
  </svg>
);


export const LogoWithText = ({ className = "", size = 40 }) => (
  <div className={cn("flex items-center", className)}>
    <ColorLogo size={size} />
    <span className="ml-2 text-xl font-bold tracking-tight">FreelanceHub</span>
  </div>
);