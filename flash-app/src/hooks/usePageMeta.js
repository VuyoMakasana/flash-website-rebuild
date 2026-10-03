import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Primary production origin. www.flashdelivery.co.za redirects here,
// so canonicals must point at the apex domain, not www.
export const SITE_URL = 'https://flashdelivery.co.za';

/**
 * Sets the per-route document title, meta description, canonical URL and
 * Open Graph / Twitter title, description and URL (og:url, twitter:url).
 *
 * This SPA has no server-side rendering. index.html carries the homepage's
 * canonical / og:url / twitter:url statically, inside a block that is
 * stripped from shell.html (served for every other route — see
 * vite.config.js), so non-JS crawlers never see the homepage's URL on
 * another page. Each page calls this hook to set the real values
 * client-side.
 *
 * Known limitation: because this only updates the DOM after JS runs,
 * a crawler or social-media unfurler that doesn't execute JavaScript
 * will still see index.html's default title/description rather than
 * the per-page one. Fixing that fully requires server-side rendering
 * or prerendering, which is out of scope for this rebuild — documented
 * in the README rather than silently left unmentioned.
 *
 * Pass `{ noindex: true }` for pages that shouldn't be indexed (the 404):
 * they get a robots noindex tag and no canonical.
 */

function upsertHead(selector, create) {
  let el = document.head.querySelector(selector);
  const existed = Boolean(el);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return { el, existed };
}

function setTag(selector, create, attr, value) {
  const { el, existed } = upsertHead(selector, create);
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => {
    if (existed && prev !== null) el.setAttribute(attr, prev);
    else el.remove();
  };
}

function metaCreator(key, name) {
  return () => {
    const el = document.createElement('meta');
    el.setAttribute(key, name);
    return el;
  };
}

function setMeta(key, name, content) {
  return setTag(`meta[${key}="${name}"]`, metaCreator(key, name), 'content', content);
}

function canonicalUrl(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return `${SITE_URL}${path}`;
}

export function usePageMeta(title, description, { noindex = false } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const restore = [];
    const prevTitle = document.title;

    if (title) {
      document.title = title;
      restore.push(setMeta('property', 'og:title', title));
      restore.push(setMeta('name', 'twitter:title', title));
    }

    if (description) {
      restore.push(setMeta('name', 'description', description));
      restore.push(setMeta('property', 'og:description', description));
      restore.push(setMeta('name', 'twitter:description', description));
    }

    if (noindex) {
      restore.push(setMeta('name', 'robots', 'noindex'));
    } else {
      const url = canonicalUrl(pathname);
      restore.push(
        setTag(
          'link[rel="canonical"]',
          () => {
            const el = document.createElement('link');
            el.setAttribute('rel', 'canonical');
            return el;
          },
          'href',
          url
        )
      );
      restore.push(setMeta('property', 'og:url', url));
      restore.push(setMeta('name', 'twitter:url', url));
    }

    return () => {
      document.title = prevTitle;
      restore.reverse().forEach((fn) => fn());
    };
  }, [title, description, noindex, pathname]);
}
