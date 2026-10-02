const PRELOADER_SESSION_KEY = 'tedx-meraki-preloader-seen';
const PAGE_TRANSITION_KEY = 'tedx-page-transition';

export const shouldShowLandingPreloader = () => {
  try {
    // A route/site switch already has its own lightweight skeleton transition.
    // Do not stack the long cinematic intro on top of it.
    if (sessionStorage.getItem(PAGE_TRANSITION_KEY) === 'true') return false;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const isBrowserReload = navigation?.type === 'reload';

    // New visits get the sequence once, and a deliberate browser reload gets it
    // again. Normal same-tab page navigation remains loader-free.
    return isBrowserReload || sessionStorage.getItem(PRELOADER_SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
};

export const markLandingPreloaderSeen = () => {
  try {
    sessionStorage.setItem(PRELOADER_SESSION_KEY, 'true');
  } catch {
    // Private browsing can deny session storage; the preloader can still run.
  }
};
