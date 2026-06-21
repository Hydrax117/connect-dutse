// App
export const APP_NAME = "Connect Dutse";
export const APP_DESCRIPTION =
  "Find trusted services and products near you in Dutse, Jigawa State.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// Location
export const DEFAULT_LOCATION = {
  city: "Dutse",
  state: "Jigawa",
  country: "Nigeria",
  latitude: 11.7898,
  longitude: 9.3411,
};
export const SEARCH_RADIUS_KM = 50;

// Listings
export const MAX_IMAGES_PER_LISTING = 10;
export const MAX_VIDEO_SIZE_MB = 50;
export const MAX_IMAGE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4"];
export const LISTING_TITLE_MAX_LENGTH = 100;
export const LISTING_DESCRIPTION_MAX_LENGTH = 2000;
export const LISTINGS_PER_PAGE = 20;

// Pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Auth
export const SESSION_COOKIE_NAME = "connect-dutse-session";
export const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 5;

// Reviews
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const REVIEW_COMMENT_MAX_LENGTH = 500;
