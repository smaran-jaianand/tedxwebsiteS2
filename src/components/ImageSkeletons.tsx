import { useEffect } from 'react';

const LOADING_CLASS = 'image-skeleton--loading';
const LOADED_CLASS = 'image-skeleton--loaded';
const ERROR_CLASS = 'image-skeleton--error';

export const ImageSkeletons = () => {
  useEffect(() => {
    const cleanups = new Map<HTMLImageElement, () => void>();

    const finish = (image: HTMLImageElement, state: 'loaded' | 'error') => {
      image.classList.remove(LOADING_CLASS, LOADED_CLASS, ERROR_CLASS);
      image.classList.add(state === 'loaded' ? LOADED_CLASS : ERROR_CLASS);
      image.setAttribute('aria-busy', 'false');
      cleanups.get(image)?.();
      cleanups.delete(image);
    };

    const watch = (image: HTMLImageElement) => {
      cleanups.get(image)?.();
      cleanups.delete(image);

      if (image.complete) {
        finish(image, image.naturalWidth > 0 ? 'loaded' : 'error');
        return;
      }

      image.classList.remove(LOADED_CLASS, ERROR_CLASS);
      image.classList.add(LOADING_CLASS);
      image.setAttribute('aria-busy', 'true');

      const onLoad = () => finish(image, 'loaded');
      const onError = () => finish(image, 'error');
      image.addEventListener('load', onLoad, { once: true });
      image.addEventListener('error', onError, { once: true });
      cleanups.set(image, () => {
        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);
      });
    };

    const scan = (node: Node) => {
      if (node instanceof HTMLImageElement) watch(node);
      if (node instanceof Element) {
        node.querySelectorAll<HTMLImageElement>('img').forEach(watch);
      }
    };

    scan(document.body);

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
          watch(record.target);
          return;
        }
        record.addedNodes.forEach(scan);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset'],
    });

    return () => {
      observer.disconnect();
      cleanups.forEach(cleanup => cleanup());
      cleanups.clear();
    };
  }, []);

  return null;
};

export default ImageSkeletons;
