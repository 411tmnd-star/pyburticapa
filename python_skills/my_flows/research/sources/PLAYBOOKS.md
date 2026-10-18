# Playbooks

The playbooks collected in the Video Stack Library (chat artifact), grouped by goal. Each keeps its origin label. The ones that became Claude chat skills are copied in [`llm_instructions/chat_skills/`](../../../llm_instructions/chat_skills/).

## Design and motion

### Keep an AI-built storefront from looking generic
*our inference*

Checklist from the talk, applied to a site like Better Style. Her ideas; the checklist wording is mine.

- Write a one-page brand and customer brief first: who it is for, what they care about, how the brand should feel. Give it to the AI every time.
- Save standards as files the AI reads (colours, tone, example pages, things to avoid), rather than re-explaining in each chat.
- Give specific prompts, not 'make a clothing marketplace'. Include your own beliefs and examples you like.
- Treat the first draft as unfinished. Go one level deeper than a customer would look: spacing, small details, empty and error states.
- Click through the whole customer journey like a buyer, not page by page.
- Ask a second AI session to critique it, then you decide.
- Keep one person as the editor who can say no after the build.

Video: [GLvFTMtw4Jk](https://www.youtube.com/watch?v=GLvFTMtw4Jk)

### De-zombie a landing page
*our inference*

Count the template formula, then rebuild from a three-line point of view with one fact, unit or image only that business has.

- Formula counted across her 9-page grid: tinted 2-line hero 9/9, muted subhead 9/9, pill pair 8/9, decorative glow 8/9, product mock 7/9, serif display 6/9, KPI numbers 6/9.
- Worked example: zombie-bbq.html vs bulmat.html in UI Specifics.

Video: [GLvFTMtw4Jk](https://www.youtube.com/watch?v=GLvFTMtw4Jk)

### Lettered-pin crit sheet
*source claim*

One OVERALL line, then lettered fixes (A, B, C...) pinned to exact spots on the image; 'same note as A' instead of repeating; go one level deeper than the customer will look.

- From the talk at ~7:54: the AI-made ad crit ended with 17 notes A-Q.
- Tool version in UI Specifics (crit.html) with an original Better Style example.

Video: [GLvFTMtw4Jk](https://www.youtube.com/watch?v=GLvFTMtw4Jk)

### 3D blockout to AI film (campfire pipeline)
*our inference*

Block out in 3D, explore style per element on a node canvas, animate each shot from a key frame, review all versions on a wall, edit on hidden wipes.

- Seen in frame: Cinema 4D file v025 with CAM/LIGHTS/GEO, 46-frame timeline; node canvas 'Design Frames Explorations' with 6 groups x ~10 outputs; an 8x7 wall of 56 versions.
- Final film grammar: lateral track, trunk wipe, dolly in, leaf wipe, arc, trunk wipe, title revealed as camera clears, 7 s hero hold.
- Version 1 problems seen: 4.3 s of continuous hard motion, camera clipping through foliage, scale jump, 8 s static hold.
- Blender route: diorama_blockout.py -> clay/depth frames -> ComfyUI + ControlNet depth -> Wan 2.2 image-to-video -> contact_sheet.py wall.

Video: [GLvFTMtw4Jk](https://www.youtube.com/watch?v=GLvFTMtw4Jk)

### Design it twice + whiteboard argument session
*source claim*

Two cheap habits from a software design book's author for better decisions on code, products or the business.

- Before building, write a second design that is genuinely different (pretend the first is banned). Compare, then pick or combine.
- In a design doc, add an 'alternatives considered' section with at least one option (a practice described in the interview).
- Stuck debate: one person at the whiteboard lists every argument for and against; any argument may go up, none may repeat; when nobody has anything new, straw poll. Works best when the group shares a goal.
- Applies to verify.py / leads.py style tools: keep the interface small and push complexity inside.

Video: [lz451zUlF-k](https://www.youtube.com/watch?v=lz451zUlF-k)

### Five-step app design framework
*source claim* · Video BMMcmmnjrM8 summary (24:02 chapter); step wording from the summary, not the transcript

1 Core function. 2 Core loop. 3 Accessory features. 4 Surface-area check. 5 Retention hook. Use it to cut an idea down before building.


Video: [BMMcmmnjrM8](https://www.youtube.com/watch?v=BMMcmmnjrM8)

### Mobile app flow with Claude Code (Expo + Supabase)
*source claim* · Full transcript of BMMcmmnjrM8 read 2026-10-17 (about 300,000 characters). Figures and prices are the presenter's statements, not checked against Apple, Google, Expo or Supabase docs.

the presenter's full mobile-app loop, read from the whole 4-hour transcript: design (5 steps), build locally, three-stage test, add Supabase and login, add AI via edge function, polish design from references, security audit twice, three-stage test again, build with EAS, privacy and support pages, submit.

- 0 Setup: Claude subscription (the presenter says Pro at $20/month is enough to start), Claude Code inside Anti-Gravity or VS Code, Expo Go on your phone and an Expo account. The presenter turns on 'skip permissions' so Claude works without stopping.
- 1 Scope the MVP with the five steps: core function, core loop (action to reward under about 30 s, using sound, animation, haptics), accessory features, surface-area check (5 to 7 screens, fewer for simple apps), retention hook (daily push check-ins, a 3-day challenge, trees that wither after 72 h).
- 2 Scaffold: tell Claude 'build a mobile app with Expo and React Native, set up my workspace'. Run /init so a CLAUDE.md records the architecture, then /clear. Voice-dictate the scope (the presenter uses Aqua) and tell Claude to do all phases, not just phase 1.
- 3 Build locally first (local storage, no database), then iterate in short rounds: fix visible bugs, add a developer test menu (skip onboarding, force-complete a challenge, clear data), add per-item reminders.
- 4 Three-stage test every time: Chrome on the computer, then iPhone mirroring, then the real phone via Expo Go. Push notifications and haptics only work on the phone. Real-phone-only bugs the presenter hit: emojis cut off, status-bar icons invisible, an old AsyncStorage version not supported by Expo Go. Paste error text into Claude to fix.
- 5 Commit: update CLAUDE.md, push to GitHub (version history lets you roll back), name the repo properly.
- 6 Add Supabase: new project, set password, tick 'enable automatic RLS', choose a nearby region, give Claude the project URL, publishable key, connection string and CLI commands; run 'supabase login' in a separate terminal. Claude creates tables (habits, completions, challenges, profiles), auth (email/password; Google/Apple possible) and keeps local caching so the app feels instant. Turn off email confirmation while testing. Check rows in the Table Editor.
- 7 Add AI features through Supabase edge functions: app calls the function, the function reads your tables, sends data and a prompt to the Claude API (the presenter uses Sonnet models), stores the result, and the app shows it as a notification. Create an API key at the Anthropic console, keep it in .env or Supabase secrets, never in chat. Test prompts with 10 simulated examples first; the presenter banned em dashes and allowed emojis only in titles.
- 8 Calorie-app specifics: photo sent to the Claude API returns name, calories, protein, carbs, fat; user can edit before saving; estimates are about plus or minus 10 to 15 percent; onboarding computes targets with the Mifflin-St Jeor equation; add back-dated logging, weight log with chart, and reminders the user can rename or delete. The presenter notes the final product should not ship with the user's own API key inside the app.
- 9 Design pass after function works: screenshot a reference (Dribble, an app you like, or mockups made with GPT Image 2) and ask Claude to match it; use a palette tool such as UI Colors; ask Claude to open every screen with Chrome DevTools MCP, list inconsistencies and fix them in a loop. For art assets, generate one image at a time with a transparent background (about 10 to 20 cents), not grids that Claude has to crop.
- 10 Speed: ask Claude what slows loading; the presenter cut home-screen load from about 254 ms to 219 ms and mobile latency by about half a second with fewer database calls. Compact the chat with /compact around 250k to 300k tokens; start new tasks with /clear.
- 11 Security audit: in a fresh chat paste the presenter's long audit prompt (from the presenter's older course, not shown in tthe presenter's video), have Claude fix reds and yellows, clear, and run it again because fixes can create new issues. Findings the presenter lists: hard-coded secrets, missing server-side validation, open database policies, inconsistent auth middleware, expensive operations an attacker could repeat.
- 12 Repeat the three-stage test after the database and again after the audit.
- 13 Production: ask Claude to prepare app.json (name, identifier, version, icons, splash, adaptive icon for Android, permissions such as camera) and eas.json; install EAS CLI, log in, build (free queue is slow).
- 14 Accounts: Apple developer account and App Store Connect; Google Play console account (needs a business-style email and an Android phone for testing). The presenter mentions a Google Workspace email at about 6 to 7 dollars a month; Apple and Google fees are not stated.
- 15 Store pages: a public privacy policy page and a support page (Claude writes and hosts them), screenshots for 6.5-inch iPhone and iPad, icon, description, keywords, marketing URL, version 1.0, a test login for the reviewer, age rating, category, privacy details, pricing schedule (free), in-app purchase disclosure. Then 'eas submit' for iOS, finish the forms, press Submit for Review.
- 16 After launch: TestFlight for friendly testers, then analytics and growth work. The presenter says approval is not guaranteed and reviewers return guidance if they reject.

Video: [BMMcmmnjrM8](https://www.youtube.com/watch?v=BMMcmmnjrM8)

## Research and verification

### Demand research loop (7 steps)
*source claim*

Our design, built from the two research videos; not yet run on a real question.

- 1. One falsifiable question, plus what would prove you wrong.
- 2. Wide pass for leads only (Perplexity, Gemini, HARPA, YouTube): URLs, no claims.
- 3. Capture each lead yourself to snapshots with URL and date.
- 4. Extract claims with exact quotes, with two tools independently.
- 5. Run verify_quotes.py; compute counts by code, not by model.
- 6. Adversarial pass: search for evidence the demand does not exist.
- 7. You accept or reject each row; only accepted rows feed the write-up.

Video: [KV0LzamE0gc](https://www.youtube.com/watch?v=KV0LzamE0gc), [nvX2ML8IPwg](https://www.youtube.com/watch?v=nvX2ML8IPwg)

### Source-of-truth routine (from the Bell Library workshop)
*source claim*

Steps are the workshop's, ordered into a routine by us. Not tested against your own workflow yet.

- 1. Rate the stakes first: low (ideas, keywords) or high (anything you will build, publish or sell on).
- 2. Ask for references, not just an answer: count, date range, format, and a link for each.
- 3. Open every link. Does it exist? Does that page contain the exact claim?
- 4. Judge the source: peer-reviewed, preprint, thesis, Wikipedia, vendor page? Currency and authority.
- 5. For high stakes, pull the primary document yourself and read the passage; do not rely on the summary.
- 6. Run the same question through a second tool or Google Scholar and compare side by side.
- 7. Write down what is verified, what is a source claim and what is your inference (the library's origin labels).

Video: [KV0LzamE0gc](https://www.youtube.com/watch?v=KV0LzamE0gc)

### Three rules for research work
*source claim*

- Never let the model that explained also grade you. Explain in one tool, check in another.
- Redo it closed-book. After reading a paper or repo, write what it does and why from memory, then check against the source.
- Tag every note by origin: mine, sourced or AI-asserted. It matches how you already treat provenance in 411.

Video: [FSXHk4hMrY8](https://www.youtube.com/watch?v=FSXHk4hMrY8)

### Starter loop: map, attempt, check
*source claim*

Start with one loop and add roles once it holds.

- Map: get a curriculum with a closed-book test per module.
- Attempt: do the module or explain it from memory with no assistant.
- Check: send your attempt to a different tool and ask for faults only.
- Log the gaps it found, and rerun the quiz on them a few days later.

Video: [FSXHk4hMrY8](https://www.youtube.com/watch?v=FSXHk4hMrY8)

### Fitting the roles to your projects
*source claim*

- Python curation (900 entries): use the examiner on it. For each entry ask when you would pick X over Y, one question at a time, harder each round. That tests pattern mastery, which collecting more entries does not.
- 411 contracts and architecture decisions: spar before you build. Have a hostile reviewer attack the design while you defend it on a timer.
- Monthly diagnostician: export your chats and ask which mistakes keep repeating. A recurring gap beats any single answer.

Video: [FSXHk4hMrY8](https://www.youtube.com/watch?v=FSXHk4hMrY8)

### Which tool for which learning role
*source claim*

A starting split for a research engineer who uses several assistants. Treat it as a hypothesis to test, not a fact.

- Perplexity and Google AI: map maker and find-material-at-my-level. Ask for the best papers, repos or tutorials for your exact gap, then open the sources yourself.
- Claude: Socratic questioner, examiner and checker. Give it your work and ask for faults only, with no rewrite.
- Gemini: listener and diagnostician. Attach a long source and your own explanation, or a pile of past mistakes, and have it grade or find the pattern.
- ChatGPT: sparring partner. Voice mode suits mock design reviews and interviews.
- Re-test the split whenever a model changes, using a few learning tasks in your fixed eval.

Video: [FSXHk4hMrY8](https://www.youtube.com/watch?v=FSXHk4hMrY8)

### Decision tools for research work
*source claim*

Our application of the presenter's models to your kind of work. Not from the video.

- Pre-mortem: before building each 411 stage, assume it failed in six months and list how.
- Goodhart's law: a fixed 10-task eval is a measure; once you tune toward it, check it still reflects real use.
- Chesterton's fence: before dropping a step from your workflow or architecture, write down why it was there.
- Judge decisions by process, not outcome: log the reasoning and what you knew, so a bad result does not rewrite a good decision.
- Fermi estimates and the 1.5 to 3 times rule: use them for API cost and time estimates before committing.
- Map versus territory: a registry or inventory is a map of your tools, so check it against what actually runs.

Video: [QLLuZbuTIRc](https://www.youtube.com/watch?v=QLLuZbuTIRc)

### Confusion Compass for learning a new tool
*source claim*

Turn 'I don't get this' into a list of questions you can answer, when picking up a new library, platform or topic.

- Open the docs or video. If you feel nothing, ask: how does tthe presenter's help the work I'm doing, and what changes for me?
- Write every question that, if answered, would reduce your confusion. Examples: how is it different from what I already use, how do I add it to my workflow, what does it cost, how long will it take, can I see a real example?
- Answer the questions one at a time, from the docs, a search, or by running a small test.
- New answers will raise new questions; add them to the list and repeat.
- Stop when the questions run out and you can explain it in your own words.

Video: [nIABz0Z4IRA](https://www.youtube.com/watch?v=nIABz0Z4IRA)

### Outlier-video digest for any niche
*source claim* · Video eFtBMe96E-s summary; the Python idea is our inference

Track channels, store each video's stats, compare each video with its channel's average, and email the ones above a multiple. Useful for demand research on what a niche responds to.

- 1 List the channels to watch.
- 2 Pull each channel's videos and stats from the YouTube Data API; drop Shorts by duration.
- 3 Store one row per video, updating views when you see it again.
- 4 Compute each channel's average views; flag videos above your chosen multiple.
- 5 Send yourself a digest of the flagged videos.
- Our idea, untested: a Python version could run tthe presenter's and write each flagged video as a markdown snapshot with url and retrieved_at, so verify.py can check any claim about it.

Video: [eFtBMe96E-s](https://www.youtube.com/watch?v=eFtBMe96E-s)

## Sales, marketing and 3D

### Sales and marketing starter path for a research engineer
*source claim*

Built from the course, ordered for someone who is new to selling and would rather avoid cold approaches. The ordering and fit are our judgment, not the presenter's.

- 1. Write down the offer and the one customer type you want (your ideal customer), in two sentences each. Your demand-discovery research is the natural way to find this.
- 2. Find the bottleneck: count each stage of the funnel by hand for two weeks (seen, enquired, spoke, bought). Automate only the narrowest stage.
- 3. Build speed to lead first if anyone already contacts you through a form: a fast, human-sounding reply by email and text. It is reactive, so no cold approach is needed.
- 4. Add follow-ups: a daily check at 1, 2, 3, 7, 14, 21, 28, 56 and 84 days, reading past messages first so you never nudge someone who opted out.
- 5. Build the tracking dashboard. Tthe presenter's is your home ground, and it shows where the bottleneck moves.
- 6. Only then try outbound: a lead list with a quality gate, short personalized lines, no hard numeric claims, and a small volume at first.
- Throughout: you define the process and judge the output. Do not let AI invent the process, and do not automate the conversations where someone needs to feel a human cares.

Video: [yulWjh3rq28](https://www.youtube.com/watch?v=yulWjh3rq28)

### Better Style ads layer: Python workflow (draft)
*our inference*

A proposed shape for the marketing layer. Our inference, not yet built or tested.

- 1. Catalog: export storefront products to a clean feed (one function, one source of truth).
- 2. Creative: generate variants per product (hook, image/video, caption) in Python, store them with IDs.
- 3. Launch: one adapter per platform (TikTok, Snap, Meta) behind a common create_campaign() interface.
- 4. Tracking: UTM on every link plus server-side conversion events (Snap and Meta Conversions API; TikTok events).
- 5. Report: nightly pull of spend, clicks, orders per creative into one table; flag winners and losers.
- 6. Decide: simple rules first (pause if spend is above X with no orders), models later.
- Start with reporting and tracking before launching ads automatically. Ask first: what Better Style sells, who buys, budget, and country.

### 3D marketing engine: staged plan (draft)
*source claim*

Revised: the merch must sit on a 3D model, so the build is a body + garment + render pipeline. Our proposal, untested.

- A. Body: license-clean parametric body (Anny, Apache 2.0 per NAVER) fitted to the model's photos. SMPL-X is non-commercial, so avoid it unless licensed.
- B. Garment library: each merch item becomes a 3D garment (sewing pattern or scan) with texture/print from the brand's artwork. One-time cost per item.
- C. Fit and drape: cloth simulation of garment on the posed body (Blender via Python is the likely scriptable route; unverified for this).
- D. Render: pose presets, camera moves (the zoom-out 'new arrivals' shot), export mp4.
- E. Swap: swapping merch = swap garment asset + texture, re-run C and D. Pure Python batch job.
- F. Ship: upload the clips through the ad platform APIs.
- Prove first on ONE body and THREE garments. If the draped result looks believable, then open it to brands.
- Reality check: realistic fabric on an avatar is the step most likely to look fake. Test it before promising brands anything.

### Pitch: 3D CEO lookbook engine (draft)
*source claim*

Offer: the brand sends photos of its own founder or model; we return 3D clips wearing their merch for Snap Stories. Our proposal, untested.

- Input: 30+ photos of one consenting person (founder/CEO is easiest: it is their own likeness) plus merch artwork.
- Output: short 3D motion clips (zoom-out 'new arrivals' style) for Snap Stories and ads. Viewers watch a preview; they do not swap.
- Flagship demo: the official Better Style model (CEO and model confirmed, per the user). For other brands, use their own founder or model.
- Capture: a dedicated turnaround (still A-pose, even light, slow 360, face close-ups) beats reusing styled studio footage for reconstruction. Studio clips stay useful for pose and motion reference.
- Everything runs as a Python batch: photos in, avatar, garments, drape, render, upload.
- Unchecked: Snap Story ad format specs and the organic-vs-paid posting route. Read the Snap Ads docs before promising a format.

### Check an idea against NFX's patterns
*source claim*

A quick scorecard for a startup or product idea, from the NFX masterclass.

- Does it have a network effect, and which kind?
- Is it simple, scalable and similar to something already working? What are the 2-3 obvious changes?
- List every risk; is it mostly execution risk or market risk?
- Is there a recent platform or regulation shift that makes it newly possible?
- Users x revenue per user: does it clear the boundary layer?
- Does it create new transactions (non-users) rather than move old ones online?
- Is there evidence of real transactions, not just people saying they'd want it?

Video: [My02IkUg7Ug](https://www.youtube.com/watch?v=My02IkUg7Ug)

### AI job-application pipeline
*source claim* · Transcript of ntSbFUQZHJ0; the Python mapping is our inference

Scrape postings, filter with AI, tailor the resume, find the decision maker, draft the email. Original is n8n; a Python version is our own mapping.

- 1 Read the template resume (Google Docs API).
- 2 Scrape postings: POST to the Apify actor endpoint with the search URL as input and an Authorization bearer token; read the dataset items.
- 3 Filter: send skills text plus job JSON to an LLM, ask for a JSON verdict, keep 'true' and rows with a company website.
- 4 Tailor: LLM rewrites the resume as markdown, using the job JSON; convert markdown to HTML.
- 5 Publish: create a Google Doc, upload the HTML into it through the Drive upload endpoint, set link sharing.
- 6 Enrich: Anymailfinder decision-maker search by domain; skip rows with no result instead of failing.
- 7 Draft: create a Gmail draft with a short pitch and the doc link; review each draft before sending.
- Our mapping, untested: requests for steps 2 and 6, an LLM SDK for steps 3 and 4, google-api-python-client for steps 1, 5 and 7, with a loop that logs each failure and continues.
- Check before use: LinkedIn terms on scraping, and cold-email rules where the recipients live. Neither has been checked.

Video: [ntSbFUQZHJ0](https://www.youtube.com/watch?v=ntSbFUQZHJ0)

## Working with Claude and skills

### Stretching Claude Pro: general workflow
*our inference*

Three tiers (Claude, cheaper model, plain code) and a six-step loop with .md brief files. Doc: Stretching Claude Pro (chat doc)

Habits that save allowance without any proxy:

- **Short sessions.** Start a new session about every 50,000 tokens (the video's rule; quality drops past that).
- **One task per session.** A sprawling session carries more history on every request.
- **Brief files instead of chat history.** A 10-line brief costs less than re-explaining the project.
- **Show only what is needed.** Give Claude the file or the diff, not the whole folder.
- **Move mechanical work to code.** If a script can do it, no model should.
- **Expect a fixed overhead.** In the video's log a one-word "Hello" used about 30,000 input tokens (Claude Code's system prompt). Fewer, larger requests waste less than many tiny ones.

Open and unchecked: whether a proxy fits Anthropic's terms for your account, and whether you can switch between your Pro login and the proxy inside one session. The three tiers, the brief files and the review loop are our practice, not from the video. Our rule is Claude for the model step, so tier B means a cheaper Claude model or a short focused session.


Video: [U6gg_bi1I70](https://www.youtube.com/watch?v=U6gg_bi1I70)

### Run Claude Code on a cheap model
*source claim*

Steps from the video, to redo with the current README.

- 1. Install the proxy from the repo README (the video used git clone and an .env file).
- 2. Add one provider key (OpenRouter, NVIDIA NIM) or point to local Ollama, and set the model name with the provider prefix.
- 3. Start the proxy, then run Claude Code with the base URL set to localhost:8082 and an auth token.
- 4. Turn off features the model lacks, such as fast mode.
- 5. Keep sessions short (the presenter's rule: new session about every 50,000 tokens).

Video: [U6gg_bi1I70](https://www.youtube.com/watch?v=U6gg_bi1I70)

### Turn an SOP into a Claude Skill
*source claim* · Video sduaTkhIm_w

Write the SOP, ask the agent to convert it to .claude/skills/<name>/SKILL.md with scripts, run it end to end, fix failures, repeat. Keep the front-matter summary short so it loads cheaply.


Video: [sduaTkhIm_w](https://www.youtube.com/watch?v=sduaTkhIm_w)

### Prompt to skill to loop to routine, for research work
*source claim*

Our application of the presenter's four levels to your workflow. Sales and marketing is a direction you want to move into, so the course's builds matter too: see the sales and marketing starter path.

- Prompt: run a new research step by hand until it reliably works. The interviewer and examiner prompts are at tthe presenter's level.
- Skill: save the steps that keep recurring, such as intake of a new video or a curation pass on a Python entry, so one command repeats them.
- Loop or routine: schedule only the steps that are safe to run unattended, such as a weekly check of your library for entries marked unchecked.
- Self-healing and error logging: have a scheduled step report failures somewhere you look, so it does not fail silently.
- Do not automate the judgment steps: deciding what goes into 411, and verifying claims.

Video: [yulWjh3rq28](https://www.youtube.com/watch?v=yulWjh3rq28)

### Rebuild momentum with small wins
*source claim*

A practical loop from the interview on confidence for when you feel stuck or behind.

- Name the one habit or excuse holding you back.
- Shrink the goal to the next small win you know you can finish tthe presenter's week (the presenter's 'make $100' example).
- Do it, record it, then pick the next one. Mastery experiences are the strongest source of confidence.
- Choose your environment on purpose: who gives honest feedback without punishing mistakes?
- Check which source is dragging you down: old failures, other people's opinions, comparison, or body state.

Video: [JOh-9iaPcGU](https://www.youtube.com/watch?v=JOh-9iaPcGU)
