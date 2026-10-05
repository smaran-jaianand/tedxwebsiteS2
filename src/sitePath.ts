export const sitePath = (path = '') =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const currentRoute = () => {
  const queryPage = new URLSearchParams(window.location.search).get('page');
  if (queryPage === 'speakers') return '/speakers';
  if (queryPage === 'team') return '/team';
  if (queryPage === 'archive') return '/archive';

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = window.location.pathname;
  const route = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;

  return route.replace(/\/+$/, '') || '/';
};
