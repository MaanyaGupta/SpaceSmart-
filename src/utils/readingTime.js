/**
 * Calculate estimated reading time in minutes based on article content
 * @param {Object} article 
 * @returns {number} reading time in minutes (minimum 1)
 */
export function calculateReadingTime(article) {
  if (!article) return 3;

  let totalWords = 0;

  if (article.directAnswer) {
    totalWords += article.directAnswer.split(/\s+/).length;
  }

  if (Array.isArray(article.keyTakeaways)) {
    totalWords += article.keyTakeaways.join(' ').split(/\s+/).length;
  }

  if (Array.isArray(article.sections)) {
    article.sections.forEach((sec) => {
      if (sec.title) totalWords += sec.title.split(/\s+/).length;
      if (Array.isArray(sec.content)) {
        totalWords += sec.content.join(' ').split(/\s+/).length;
      }
      if (Array.isArray(sec.subsections)) {
        sec.subsections.forEach((sub) => {
          if (sub.title) totalWords += sub.title.split(/\s+/).length;
          if (sub.content) totalWords += sub.content.split(/\s+/).length;
        });
      }
    });
  }

  // Average adult reading speed: 200 words per minute
  const minutes = Math.ceil(totalWords / 200);
  return Math.max(1, minutes);
}
