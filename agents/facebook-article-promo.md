# Facebook article promo

Process for promoting a just-published Travelling Seniors article on the Travelling Seniors Facebook Page via the **jinx-facebook-mcp** connector (tools: `get_page_info`, `create_post`, `create_photo_post`, `list_posts`). Read this file directly in scheduled runs instead of trying to load a "facebook-article-promo" Claude skill — attempts to save that as a Claude skill via the app's "Save skill" button have failed (same error on two separate runs), so this doc is the source of truth until that's resolved.

This connector replaces the earlier Zapier "Facebook Pages" connection, which is no longer used for this workflow.

## Prerequisites

Requires the `jinx-facebook-mcp` connector to be attached to the session (scheduled runs need it added to the trigger's connector list, same as any other MCP connector). Confirm it's working before posting by calling `get_page_info` with no arguments — it should return the Page's `id`, `name`, and `link`. As of the last run this resolves to a single Page, "Travelling Seniors" (id `1265889076608766`). If `get_page_info` errors (e.g. an `appsecret_proof` or auth error), do not attempt to post — tell Pat the Facebook connector needs attention (include the exact error) and stop.

There's no dynamic Page selection with this connector — it's scoped to one Page per connection. If `get_page_info` ever returns a different Page than expected, stop and confirm with Pat before posting.

## Step 1 — Find the live article

You need two things from the published post: its live URL and its hero image.

- **Live URL**: read `astro.config.mjs` from the repo for the `site` field (currently `https://travellingseniors.com.au`), and note the routing pattern from `src/pages/news/[slug].astro` — articles live at `<site>/news/<slug>/`. Combine the site's base URL with the slug of the file just committed.
- **Hero image**: the `image.url` field in that post's frontmatter. Use the same image already verified and used as the post's featured image — don't source a new one. With this connector, a link post's preview image is pulled automatically by Facebook from the article page's Open Graph tags, not attached manually — so this is mainly for your own reference and for the fallback in Step 4.

Also pull the post's `title` and `description` from frontmatter as raw material for the caption, but don't copy them verbatim — Facebook copy should sound like a Facebook post, not a headline.

## Step 2 — Draft the Facebook post

Write a short, warm caption (2-4 sentences) aimed at the same audience as the blog — Australian seniors — in a voice that's inviting rather than salesy. Lead with the hook of the article (the scene, the surprising fact, the practical payoff), not a restatement of the title. End with "Read it here:" followed by the live URL on its own line.

Don't invent claims that aren't in the article. Don't use hashtags unless a look at recent Page posts shows a hashtag convention worth matching.

## Step 3 — Attended vs. unattended mode

**Attended** (Pat is in the conversation and can respond): show Pat the drafted message and the image/link, and wait for explicit approval before posting.

**Unattended** (a scheduled/background run, e.g. right after an unattended run that published the article): skip the approval step. Publish directly, then include the exact post text and the article link in the final summary back to Pat so they can review it after the fact.

## Step 4 — Post it

Standard case — a link post, with Facebook auto-generating the preview card (including image) from the article page's Open Graph tags:

```
create_post({
  message: "<drafted caption, including the Read it here: <url> line>",
  link: "<live article URL>"
})
```

To publish at a specific time instead of immediately, add `scheduled_at` (ISO 8601, must be 10 minutes to 30 days out).

Fallback — if the link preview doesn't pick up the right image (spot-check the result, or ask Pat to check), a photo post can be used instead, though note this loses the clickable link card and puts the URL only in the caption text:

```
create_photo_post({
  url: "<hero image URL>",
  caption: "<drafted caption, including the Read it here: <url> line>"
})
```

Prefer `create_post` (the link-post form) unless there's a specific reason to fall back.

## Step 5 — Confirm

Report back: which article was promoted, the exact Facebook post text, and the article link. In unattended mode this is Pat's only chance to review what was posted, so don't compress it away.
