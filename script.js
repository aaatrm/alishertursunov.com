const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
const homeView = document.querySelector('#home-view');
const articleView = document.querySelector('#article-view');
const postList = document.querySelector('#post-list');
const searchInput = document.querySelector('#post-search');
const emptyState = document.querySelector('#empty-state');

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`));

const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

function makePostLink(post, className = '') {
  const link = document.createElement('a');
  link.className = className;
  link.href = `#post/${encodeURIComponent(post.slug)}`;
  link.setAttribute('aria-label', `Read ${post.title}`);
  return link;
}

function renderPosts(query = '') {
  if (!postList || !emptyState) return;

  const term = query.trim().toLocaleLowerCase();
  const matches = sortedPosts.filter((post) =>
    [post.title, post.category, post.excerpt, ...(post.content || [])]
      .join(' ')
      .toLocaleLowerCase()
      .includes(term)
  );

  postList.replaceChildren();
  emptyState.hidden = matches.length > 0;

  matches.forEach((post) => {
    const link = makePostLink(post, 'post-row');
    const meta = document.createElement('div');
    meta.className = 'post-meta';

    const category = document.createElement('span');
    category.className = 'post-category';
    category.textContent = post.category;

    const date = document.createElement('time');
    date.dateTime = post.date;
    date.textContent = formatDate(post.date);
    meta.append(category, date);

    const copy = document.createElement('div');
    copy.className = 'post-copy';

    const title = document.createElement('h3');
    title.textContent = post.title;

    const excerpt = document.createElement('p');
    excerpt.textContent = post.excerpt;
    copy.append(title, excerpt);

    const arrow = document.createElement('span');
    arrow.className = 'post-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';

    link.append(meta, copy, arrow);
    postList.append(link);
  });
}

function renderArticle(post) {
  if (!articleView) return;
  articleView.replaceChildren();

  const back = document.createElement('a');
  back.href = '#';
  back.className = 'back-link';
  back.textContent = '← All writing';

  const header = document.createElement('header');
  header.className = 'article-header';

  const category = document.createElement('p');
  category.className = 'eyebrow';
  category.textContent = post.category;

  const title = document.createElement('h1');
  title.textContent = post.title;

  const date = document.createElement('time');
  date.className = 'article-date';
  date.dateTime = post.date;
  date.textContent = formatDate(post.date);
  header.append(category, title, date);

  const body = document.createElement('div');
  body.className = 'article-body';
  (post.content || []).forEach((text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    body.append(paragraph);
  });

  articleView.append(back, header, body);
  document.title = `${post.title} — Alisher Tursunov`;
}

function renderRoute() {
  if (!homeView || !articleView) return;

  const match = window.location.hash.match(/^#post\/(.+)$/);
  let slug = null;
  try {
    slug = match ? decodeURIComponent(match[1]) : null;
  } catch {
    slug = null;
  }
  const post = slug && sortedPosts.find((item) => item.slug === slug);

  if (post) {
    homeView.hidden = true;
    articleView.hidden = false;
    renderArticle(post);
    window.scrollTo(0, 0);
    return;
  }

  articleView.hidden = true;
  homeView.hidden = false;
  document.title = 'Alisher Tursunov — Notes';
  if (match) window.location.hash = '#';
}

searchInput?.addEventListener('input', (event) => renderPosts(event.target.value));
window.addEventListener('hashchange', renderRoute);
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

renderPosts();
renderRoute();
