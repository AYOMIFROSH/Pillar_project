// ThemeManager.ts - For managing theme across the application

// Key for storing theme preference in localStorage
const THEME_STORAGE_KEY = 'app-theme-mode';

// Set default theme (true = dark mode, false = light mode)
const DEFAULT_THEME = true;

/**
 * Initializes the theme on application load
 * Checks localStorage for theme preference and applies it
 */
export const initializeTheme = (): boolean => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  let isDarkMode: boolean;
  
  if (storedTheme === null) {
    // First time visit, use default and save it
    isDarkMode = DEFAULT_THEME;
    localStorage.setItem(THEME_STORAGE_KEY, String(isDarkMode));
  } else {
    // Use stored preference
    isDarkMode = storedTheme === 'true';
  }
  
  // Apply theme to document body
  applyThemeToBody(isDarkMode);
  
  return isDarkMode;
};

/**
 * Toggle theme between dark and light mode
 * @returns The new theme state (true = dark mode, false = light mode)
 */
export const toggleTheme = (currentTheme: boolean): boolean => {
  const newTheme = !currentTheme;
  
  // Save preference
  localStorage.setItem(THEME_STORAGE_KEY, String(newTheme));
  
  // Apply theme to document body
  applyThemeToBody(newTheme);
  
  return newTheme;
};

/**
 * Get the current theme from localStorage
 * @returns Current theme (true = dark mode, false = light mode)
 */
export const getCurrentTheme = (): boolean => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === null) {
    return DEFAULT_THEME;
  }
  return storedTheme === 'true';
};

/**
 * Apply theme classes to the document body
 * @param isDarkMode Whether to apply dark mode
 */
export const applyThemeToBody = (isDarkMode: boolean): void => {
  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
};

/**
 * Provides the SVG watermark as a background data URI with distributed logos
 * @param isDarkMode Whether to use dark mode styling
 * @returns CSS-compatible data URI for the SVG background
 */
export const getWatermarkBackground = (isDarkMode: boolean): string => {
  // Adjust opacity based on theme
  const baseOpacity = isDarkMode ? '0.05' : '0.07';
  const higherOpacity = isDarkMode ? '0.07' : '0.1';
  
  // The SVG code, modified to work as a data URI with distributed logos
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.15"/>
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4338ca" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#818cf8" stop-opacity="0.15"/>
        </linearGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
      </defs>
      
      <!-- Background elements -->
      <circle cx="200" cy="150" r="100" fill="url(#grad1)" filter="url(#blur)" />
      <circle cx="600" cy="450" r="150" fill="url(#grad2)" filter="url(#blur)" />
      <ellipse cx="400" cy="300" rx="250" ry="200" fill="url(#grad1)" opacity="0.25" filter="url(#blur)" />
      
      <!-- Connection lines -->
      <g opacity="0.2">
        <path d="M200,200 C300,350 450,150 650,300" stroke="#4f46e5" stroke-width="3" fill="none" />
        <path d="M150,400 C250,300 400,450 600,200" stroke="#a855f7" stroke-width="3" fill="none" />
        <path d="M300,150 C400,250 500,200 550,350" stroke="#818cf8" stroke-width="3" fill="none" />
      </g>
      
      <!-- Central abstract logo -->
      <g transform="translate(325, 225)">
        <circle cx="75" cy="75" r="70" fill="none" stroke="#4f46e5" stroke-width="3" opacity="0.4" />
        <path d="M75,30 L120,75 L75,120 L30,75 Z" fill="#4f46e5" opacity="0.2" />
        <circle cx="75" cy="75" r="25" fill="#a855f7" opacity="0.2" />
        <g opacity="0.35">
          <circle cx="75" cy="45" r="12" fill="#4f46e5" />
          <path d="M75,60 C60,60 55,75 55,90 C55,105 65,115 75,115 C85,115 95,105 95,90 C95,75 90,60 75,60" fill="#4f46e5" />
          <circle cx="40" cy="75" r="8" fill="#a855f7" />
          <path d="M40,85 C30,85 25,90 25,105 C25,115 35,120 40,120 C45,120 55,115 55,105 C55,90 50,85 40,85" fill="#a855f7" />
          <circle cx="110" cy="75" r="8" fill="#a855f7" />
          <path d="M110,85 C100,85 95,90 95,105 C95,115 105,120 110,120 C115,120 125,115 125,105 C125,90 120,85 110,85" fill="#a855f7" />
        </g>
      </g>
      
      <!-- Distributed SecretPlace logos with different sizes and rotations -->
      <text x="400" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="48" fill="#4f46e5" opacity="${higherOpacity}">SecretPlace</text>
      
      <text x="200" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="32" fill="#4f46e5" opacity="${baseOpacity}" transform="rotate(-15,200,100)">SecretPlace</text>
      
      <text x="600" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="28" fill="#a855f7" opacity="${baseOpacity}" transform="rotate(10,600,150)">SecretPlace</text>
      
      <text x="150" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="24" fill="#a855f7" opacity="${baseOpacity}" transform="rotate(-5,150,350)">SecretPlace</text>
      
      <text x="650" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="36" fill="#4f46e5" opacity="${baseOpacity}" transform="rotate(5,650,400)">SecretPlace</text>
      
      <text x="350" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="20" fill="#818cf8" opacity="${baseOpacity}" transform="rotate(-8,350,180)">SecretPlace</text>
      
      <text x="450" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="26" fill="#818cf8" opacity="${baseOpacity}" transform="rotate(12,450,320)">SecretPlace</text>
      
      <text x="250" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="22" fill="#4f46e5" opacity="${baseOpacity}" transform="rotate(-10,250,450)">SecretPlace</text>
      
      <text x="550" y="550" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" 
        font-size="30" fill="#a855f7" opacity="${baseOpacity}" transform="rotate(7,550,550)">SecretPlace</text>
    </svg>
  `;
  
  // Convert to a data URI (base64 encoded for better compatibility)
  const encodedSVG = encodeURIComponent(svgContent)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
    
  return `url("data:image/svg+xml,${encodedSVG}")`;
};

// In ThemeManager.ts, add this function:
export const setAuthBackground = (isDarkMode: boolean): void => {
  const backgroundUrl = getWatermarkBackground(isDarkMode);
  document.documentElement.style.setProperty('--auth-background-image', backgroundUrl);
};