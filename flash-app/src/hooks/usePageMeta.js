import { useEffect } from 'react';

/**
 * Sets document.title and the meta description for the current route.
 *
 * This SPA has no server-side rendering, so index.html's <title> and
 * <meta name="description"> are shared defaults only. Each page calls
 * this hook to override them client-side — mirrors what the original
 * static site did with a distinct <title> per .html file, adapted for
 * a single-page app that doesn't reload between routes.
 *
 * Known limitation: because this only updates the DOM after JS runs,
 * a crawler or social-media unfurler that doesn't execute JavaScript
 * will still see index.html's default title/description rather than
 * the per-page one. Fixing that fully requires server-side rendering
 * or prerendering, which is out of scope for this rebuild — documented
 * in the README rather than silently left unmentioned.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let descTag = document.querySelector('meta[name="description"]');
    let prevDescription = null;
    if (description && descTag) {
      prevDescription = descTag.getAttribute('content');
      descTag.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (descTag && prevDescription !== null) {
        descTag.setAttribute('content', prevDescription);
      }
    };
  }, [title, description]);
}
