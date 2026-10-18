# Ads layer

The marketing layer for Better Style, and later for brands using the 3D engine. Our proposal; not built yet.

## Six steps

1. **Catalogue.** Export storefront products to one clean feed (one function, one source of truth).
2. **Creative.** Generate variants per product (hook, image or video, caption) in Python and store them with ids. The 3D engine's clips land here.
3. **Launch.** One adapter per platform (Snap, Meta, TikTok) behind a common `create_campaign()` interface.
4. **Tracking.** UTM on every link plus server-side conversion events (Snap and Meta Conversions API).
5. **Report.** Nightly pull of spend, clicks and orders per creative into one table; flag winners and losers.
6. **Decide.** Simple rules first (pause when spend passes a limit with no orders); models later.

Start with reporting and tracking before launching ads automatically.

## Snap Ads API: the path for one ad

Following Snap's quick start (source claim; not run yet):

1. Sign in once with OAuth 2.0 and the `snapchat-marketing-api` scope. Access tokens last 60 minutes, so the script refreshes them.
2. Create a campaign, then an ad squad with targeting, a bid and a daily budget. Budgets are in micro units (1,000,000 = 1 unit of currency).
3. Create a media slot and upload the MP4 (under 32 MB for a simple upload).
4. Create a `SNAP_AD` creative pointing at the media, with a headline and the brand's public profile.
5. Create the ad. It goes live after Snap's review.
6. Nightly, pull spend, views and swipe-ups per clip into the same database.

The clip: 9:16, 1080×1920, MP4, 3 to 180 seconds; aim for 6 to 10 (close-up on the merch, pull back to full body, end card). A single-video Snap Ad is what plays between Stories; Snap's "Story Ads" format is a branded series of 3 to 20 snaps.

Account setup (Business Manager, ad account, billing, developer app) is done by you in Snap's web tools; the script starts after that.

## Not verified

- Snap's minimum daily budget, from Snap itself
- Whether Ads API access needs approval for a new account
- Whether a Nigerian card works for ad billing
- Meta's side is in [META_API.md](META_API.md) (also unrun)

Sources: [Snap Ads API quick start](https://developers.snap.com/api/marketing-api/Ads-API/quick-start), [Snap Ads API authentication](https://developers.snap.com/api/marketing-api/Ads-API/authentication), [Snapchat ad specs](https://megadigital.ai/en/blog/snapchat-ad-specs/).

Build: `W15` in [../../to_confirm/](../../to_confirm/).
