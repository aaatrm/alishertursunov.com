# Alisher Tursunov — Notes

A minimal personal blog. No CMS, build tools, or installation required. GitHub Pages publishes changes automatically after you edit the files on GitHub.

## Add a post

1. Open [`posts.js`](posts.js) and click **Edit**.
2. Copy one complete post object, including its `{` and `}`.
3. Paste the copy at the top of the list, after `window.BLOG_POSTS = [`.
4. Add a comma after the new post's closing `}` if another post follows it.
5. Update the slug (unique, lowercase words separated by hyphens), title, date (`YYYY-MM-DD`), category, excerpt, and content.
6. Click **Commit changes**. Wait for the GitHub Pages deployment to finish, then refresh the site.

Example post:

```js
{
  slug: 'my-new-post',
  title: 'My new post',
  date: '2026-11-16',
  category: 'Notes',
  excerpt: 'A short preview shown on the homepage.',
  content: [
    'First paragraph of the post.',
    'Second paragraph. Each item in this array becomes a paragraph.'
  ]
},
```

The site requests `posts.js` with a fresh URL on each page load to avoid showing an old cached post list. After committing a post, GitHub Pages deploys the update automatically; you only need to refresh the website.
