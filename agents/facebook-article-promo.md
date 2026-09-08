# Facebook article promo

Process for promoting a just-published Travelling Seniors article on the Travelling Seniors Facebook Page via the Zapier "Facebook Pages" connector. Read this file directly in scheduled runs instead of trying to load a "facebook-article-promo" Claude skill — attempts to save that as a Claude skill via the app's "Save skill" button have failed (same error on two separate runs), so this doc is the source of truth until that's resolved.

## Prerequisites

Requires the Zapier connector's Facebook Pages connection with the `facebook_pages_create_page_post` action ("Create Page Post") enabled. Check with `inspect_zapier_actions({app: "Facebook Pages"})`. If it isn't enabled, use `discover_zapier_actions({app: "Facebook Pages"})` then `enable_zapier_action`.

Before posting, confirm the connection is healthy: `list_zapier_connections({selected_api: "FacebookV2CLIAPI"})`. If the connection's `is_stale` is true, do not attempt to post — tell Pat the Facebook Pages connection needs reconnecting (share the `reconnect_url`) and stop.

The Page itself is a dynamic enum on the action, not a fixed ID — resolve it fresh each run with:
```
inspect_zapier_actions({tool_name: "facebook_pages_create_page_post", enum_property: "page"})
```
As of the last run there was a single connected Page, "Travelling Seniors" (id 1265889076608766). If more than one Page ever shows up, ask Pat which one to use rather than guessing.

## Step 1 — Find the live article

You need two things from the published post: its live URL and its hero image.

- **Live URL**: read `astro.config.mjs` from the repo for the `site` field (currently `https://travellingseniors.com.au`), and note the routing pattern from `src/pages/news/[slug].astro` — articles live at `<site>/news/<slug>/`. Combine the site's base URL with the slug of the file just committed.
- **Hero image**: the `image.url` field in that post's frontmatter. Use the same image already verified and used as the post's featured image — don't source a new one.

Also pull the post's `title` and `description` from frontmatter as raw material for the caption, but don't copy them verbatim — Facebook copy should sound like a Facebook post, not a headline.

## Step 2 — Draft the Facebook post

Write a short, warm caption (2-4 sentences) aimed at the same audience as the blog — Australian seniors — in a voice that's inviting rather than salesy. Lead with the hook of the article (the scene, the surprising fact, the practical payoff), not a restatement of the title. End with "Read it here:" followed by the live URL on its own line.

Don't invent claims that aren't in the article. Don't use hashtags unless a look at recent Page posts shows a hashtag convention worth matching.

## Step 3 — Attended vs. unattended mode

**Attended** (Pat is in the conversation and can respond): show Pat the drafted message and the image/link, and wait for explicit approval before posting.

**Unattended** (a scheduled/background run, e.g. right after an unattended run that published the article): skip the approval step. Publish directly, then include the exact post text and the article link in the final summary back to Pat so they can review it after the fact.

## Step 4 — Post it

```
execute_zapier_write_action({
  selected_api: "FacebookV2CLIAPI",
  action: "page_stream",
  tool_name: "facebook_pages_create_page_post",
  params: {
    page: "<resolved page id from Prerequisites>",
    message: "<drafted caption, including the Read it here: <url> line>",
    link_url: "<live article URL>",
    source: ["<hero image URL>"]
  }
})
```

`source` takes a list of publicly accessible image URLs (or uploaded files) — pass the hero image URL directly, no need to download and re-upload it.

## Step 5 — Confirm

Report back: which article was promoted, the exact Facebook post text, and the article link. In unattended mode this is Pat's only chance to review what was posted, so don't compress it away.
