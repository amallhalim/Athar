/**
 * TypeScript types for route handle properties
 * Centralized type definitions for better maintainability
 */

/**
 * Complete route handle interface with all professional properties
 */
export interface RouteHandle {
  // ========== BASIC INFO (Required) ==========
  /** Page title displayed in browser tab and navigation */
  title: string;
  /** Breadcrumb label for navigation breadcrumbs */
  breadcrumb: string;
  /** Icon for navigation menus (emoji or icon name) */
  icon: string;
  /** SEO-friendly page description */
  description?: string;

  // ========== AUTHENTICATION & AUTHORIZATION ==========
  /** Does this route require authentication? */
  requiresAuth?: boolean;
  /** Required permissions array (e.g., ["read:projects", "write:projects"]) */
  permissions?: string[];
  /** Allowed user roles (e.g., ["user", "admin"]) */
  roles?: string[];
  /** Minimum role level required */
  minRole?: "guest" | "user" | "admin" | "superadmin";

  // ========== NAVIGATION & UI ==========
  /** Route category for grouping (e.g., "main", "admin", "settings") */
  category?: string;
  /** Navigation group name */
  group?: string;
  /** Hide from navigation menus */
  hidden?: boolean;
  /** Hide on mobile devices */
  hiddenInMobile?: boolean;
  /** Hide on desktop */
  hiddenInDesktop?: boolean;
  /** Display order in navigation (lower numbers appear first) */
  order?: number;
  /** Badge text (e.g., "New", "3", or null) */
  badge?: string | number | null;
  /** Badge color (hex code) */
  badgeColor?: string;
  /** Tooltip text on hover */
  tooltip?: string;
  /** Keyboard shortcut (e.g., "Ctrl+K") */
  shortcut?: string;
  /** Highlight in navigation */
  highlight?: boolean;

  // ========== SEO & META TAGS ==========
  /** SEO meta title (defaults to title if not provided) */
  metaTitle?: string;
  /** SEO meta description */
  metaDescription?: string;
  /** SEO keywords array */
  keywords?: string[];
  /** Page author */
  author?: string;
  /** Robots meta tag (e.g., "index, follow", "noindex, nofollow") */
  robots?: string;
  /** Canonical URL */
  canonical?: string;

  // Open Graph (Social Media)
  /** Open Graph title */
  ogTitle?: string;
  /** Open Graph description */
  ogDescription?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph type (website, article, etc.) */
  ogType?: "website" | "article" | "profile" | "book" | "music" | "video";
  /** Open Graph URL */
  ogUrl?: string;

  // Twitter Card
  /** Twitter card type */
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  /** Twitter title */
  twitterTitle?: string;
  /** Twitter description */
  twitterDescription?: string;
  /** Twitter image URL */
  twitterImage?: string;

  // Schema.org (JSON-LD)
  /** JSON-LD structured data */
  schema?: Record<string, unknown>;

  // ========== ANALYTICS & TRACKING ==========
  /** Analytics configuration */
  analytics?: {
    /** Page view event name */
    pageView?: string;
    /** Event category */
    category?: string;
    /** Track page view? */
    trackPageView?: boolean;
    /** Custom event name */
    eventName?: string;
    /** Custom dimensions for analytics */
    dimensions?: Record<string, unknown>;
    /** Track time on page? */
    trackTime?: boolean;
    /** Track scroll depth? */
    trackScroll?: boolean;
  };

  // ========== LAYOUT & THEMING ==========
  /** Layout variant (default, minimal, fullscreen) */
  layout?: "default" | "minimal" | "fullscreen" | "dashboard" | "admin";
  /** Show sidebar on this route */
  sidebar?: boolean;
  /** Show header */
  header?: boolean;
  /** Show footer */
  footer?: boolean;
  /** Show navbar */
  navbar?: boolean;
  /** Theme variant (light, dark, auto) */
  theme?: "light" | "dark" | "auto";
  /** Background color (hex code) */
  backgroundColor?: string;
  /** Use container wrapper? */
  container?: boolean;
  /** Container max width (sm, md, lg, xl, full) */
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  /** Full width page? */
  fullWidth?: boolean;
  /** Add padding? */
  padding?: boolean;

  // ========== PERFORMANCE & OPTIMIZATION ==========
  /** Prefetch strategy (none, intent, render, viewport) */
  prefetch?: "none" | "intent" | "render" | "viewport";
  /** Loading priority (low, normal, high) */
  priority?: "low" | "normal" | "high";
  /** Cache strategy */
  cache?: "default" | "no-cache" | "force-cache" | "revalidate";
  /** Cache time in seconds */
  cacheTime?: number;

  // ========== INTERNATIONALIZATION (i18n) ==========
  /** Translation key for i18n */
  i18nKey?: string;
  /** Locale-specific route */
  locale?: string;
  /** Available locales for this route */
  availableLocales?: string[];

  // ========== ACCESSIBILITY (a11y) ==========
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA description */
  ariaDescription?: string;
  /** Show skip to content link? */
  skipToContent?: boolean;

  // ========== FEATURE FLAGS & DEVELOPMENT ==========
  /** Feature flag name */
  featureFlag?: string;
  /** Beta feature? */
  beta?: boolean;
  /** Experimental feature? */
  experimental?: boolean;
  /** Route version */
  version?: string;
  /** Deprecated route? */
  deprecated?: boolean;
  /** Deprecation message */
  deprecationMessage?: string;
  /** Migration path for deprecated routes */
  migration?: string;

  // ========== RESPONSIVE & DEVICE ==========
  /** Mobile layout (stack, tabs, drawer) */
  mobileLayout?: "stack" | "tabs" | "drawer";
  /** Tablet layout */
  tabletLayout?: "grid" | "sidebar" | "tabs";
  /** Desktop layout */
  desktopLayout?: "sidebar" | "grid" | "fullscreen";
  /** Breakpoint for layout change */
  breakpoint?: "sm" | "md" | "lg" | "xl";

  // ========== NOTIFICATIONS & ALERTS ==========
  /** Show notification on load? */
  showNotification?: boolean;
  /** Notification message */
  notificationMessage?: string;
  /** Notification type (info, success, warning, error) */
  notificationType?: "info" | "success" | "warning" | "error";
  /** Alert message */
  alert?: string;
  /** Alert type */
  alertType?: "info" | "success" | "warning" | "error";
}

