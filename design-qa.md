# Design QA — Apple / Glass Iteration

## Comparison target

- Source visual truth (homepage before this iteration): `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-before-home.png`
- Source visual truth (resume before this iteration): `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-before-resume.png`
- Product requirements applied: remove the homepage portrait; move portrait to resume; add three company logos and the Guangdong Ocean University crest; make work/project history more classic and visual; center the homepage on Cloud Native, DevOps, and SRE; remove the Tools navigation tab; retain Gallery; increase Apple-like glass styling; preserve Vercel deployability.
- Implementation URL: `http://127.0.0.1:3000/`
- Final homepage screenshot: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-home-final-v2.png`
- Final resume screenshot: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-resume-final.png`
- Final mobile homepage screenshot: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-home-mobile-final.png`
- State: public light-theme portfolio; homepage at top; resume at top; desktop and mobile navigation states tested.

## Viewport and normalization

- Desktop CSS viewport: 1280 × 720 CSS px.
- Source homepage and resume screenshots: 1265 × 712 px.
- Final homepage and resume screenshots: 1265 × 712 px.
- Mobile CSS viewport: 390 × 844 CSS px; screenshot: 375 × 812 px.
- Density normalization: equal-size desktop screenshots were downsampled into two 600 × 338 px panels with a 20 px divider. No aspect-ratio stretching was introduced.

## Comparison evidence

- Full-view homepage comparison: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/design-qa-iteration2-home.png`
- Focused resume comparison: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/design-qa-iteration2-resume.png`
- Focused company-logo evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-work-logos-pass1.png`
- Focused project-card evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-resume-projects-pass1.png`
- Focused school-crest evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-education-pass2.png`

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the system/SF Pro-style font stack, display weights, tight tracking, and restrained small labels preserve the selected Apple-like direction. The final headline wraps into two intentional desktop lines and three balanced mobile lines without splitting key phrases.
- Spacing and layout rhythm: the homepage now uses a single large rounded hero surface, generous breathing room, a translucent metric strip, and consistent 30–42 px corner radii. Resume sections use a predictable card rhythm and clearer grouping than the source.
- Colors and visual tokens: the existing blue, near-black, white, and soft-gray palette is preserved. Semi-transparent white surfaces, thin white borders, restrained shadows, and backdrop blur create the requested glass hierarchy without reducing text contrast.
- Image quality and asset fidelity: the homepage portrait is fully removed. The original portrait is cropped into a face-forward resume avatar. All three company logos and the official school crest load at their native aspect ratios with `object-contain`; no logo is redrawn or replaced with text/CSS art.
- Copy and content: the homepage now leads with Cloud Native, DevOps, and SRE and renders three JSON-backed capability cards. Work history, all three projects, skills, education, and certificates remain present and readable.
- Navigation and affordances: desktop and mobile navigation now contain only 首页、项目、简历、相册. The primary homepage CTA scrolls to capabilities; the resume CTA navigates to `/resume`.
- Responsive behavior: no horizontal overflow occurs at 390 × 844. Hero controls, metrics, resume identity, work cards, and project cards stack cleanly.
- Accessibility: meaningful image alt text is present for portrait, company logos, and school crest. Navigation labels, focus-visible treatment, reduced-motion behavior, and mobile expanded state remain intact.

## Comparison history

### Pass 1

- [P2] Homepage headline wrapped an important phrase into a visually isolated final character on desktop.
  - Fix: shortened the headline to “云原生系统，可靠、可观测、可演进。” and reduced the responsive display-size ceiling.
- [P2] Resume avatar crop placed the face too low and clipped the chin.
  - Fix: changed the portrait scale and transform origin so the face is centered on desktop and mobile.

### Post-fix evidence

- Homepage: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-home-final-v2.png`
- Resume: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-resume-final.png`
- Mobile homepage: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-2-home-mobile-final.png`

## Primary interactions and runtime checks

- “完整简历” navigates from the homepage to `/resume`.
- Mobile menu opens and lists exactly four destinations: 首页、项目、简历、相册.
- Homepage renders 3 capability cards and no portrait.
- Resume renders 1 portrait, 3 loaded company logos, 3 project cards, and 1 loaded school crest.
- Homepage and resume browser consoles checked: no errors.
- `npm run build` completed with Nitro preset `vercel` and generated `.vercel/output`.

## Open Questions

- None.

## Implementation Checklist

- [x] Remove homepage portrait.
- [x] Add resume portrait.
- [x] Add real company logos and official school crest.
- [x] Render work and project history as classic resume cards.
- [x] Reframe homepage around Cloud Native, DevOps, and SRE.
- [x] Add Apple-like translucent surfaces and blur.
- [x] Remove Tools tab and retain Gallery.
- [x] Verify desktop, mobile, navigation, assets, console, and Vercel production build.

## Follow-up Polish

- No blocking polish remains.

final result: passed

# Design QA — Configurable Resume & Brand Iteration

## Comparison target

- Source resume before this iteration: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-before-resume.png`
- Final resume after implementation: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-resume-postbuild.png`
- Side-by-side comparison input: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-resume-comparison.png`
- Final homepage: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-home-postbuild.png`
- Final portfolio placeholder: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-portfolio-postbuild.png`
- Final external-writing page: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-blog-postbuild.png`
- Final mobile resume: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-5-resume-mobile-postbuild.png`

## Findings

No actionable P0, P1, or P2 findings remain.

- Brand: the navigation now uses a generated blue K mark, with matching PNG favicon and Apple touch icon assets.
- Navigation: desktop and mobile navigation expose exactly 简历、作品集、博客. The brand remains the simple home entry point.
- Resume sequence: personal profile with portrait appears first, followed by education, work, and projects. The previous skills interruption has been removed from this route.
- Resume assets: the school crest, all three company logos, and all three project visuals load with meaningful alternative text and retain their intended aspect ratios.
- Configuration: site/resume/home content lives in `data/profile.json`; the portfolio shell lives in `data/portfolio.json`; external article previews live in `data/blog.json`.
- Blog behavior: the website contains no internal article body experience. Configured items open external URLs; the empty state explains how future entries are added.
- Responsive behavior: the 390 × 844 mobile layout has no horizontal overflow. The identity card, navigation, work entries, and project content stack cleanly.
- Runtime and deployment: the production build passed with Nitro preset `vercel` and generated `.vercel/output`.

## Final result

final result: passed

# Design QA — White / Mist Blue Glass Iteration

## Comparison target

- Source before palette correction: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-4-before-home.png`
- Final homepage: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-4-home-postbuild.png`
- Final projects chapter: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-4-projects-final.png`
- Final resume: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-4-resume-final.png`
- Comparison image: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/design-qa-iteration4-home.png`

## Findings

No actionable P0, P1, or P2 findings remain.

- Palette: removed the warm-neutral and deep-ink chapter treatments. The site now stays inside a white, mist-gray, and pale-blue family.
- Glass hierarchy: all content surfaces use translucent white, white borders, restrained cool shadows, and backdrop blur. This keeps hierarchy without forcing a hard visual reset.
- Section cut: reduced overlap depth and shadow weight; each incoming chapter is now a thin white-edged frosted sheet rather than a heavy, high-contrast panel.
- Readability: the project sections have returned to dark text on pale-blue glass surfaces; content, metrics, tags, and existing workflow imagery retain clear contrast.
- Runtime: browser console has no errors. `npm run build` completed with the Vercel Nitro preset and produced `.vercel/output`.

## Final result

final result: passed

---

# Design QA — Tonal Chapters Iteration

## Comparison target

- Source homepage before tonal-separation refinement: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-3-before-home.png`
- Source resume before tonal-separation refinement: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-3-before-resume.png`
- Final homepage desktop: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-3-home-desktop-final.png`
- Final resume desktop: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-3-resume-final.png`
- Final homepage mobile: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-3-home-final.png`
- Visual comparison input: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/design-qa-iteration3-home.png`

## Viewport and checks

- Desktop: 1280 × 720 CSS px; captured image: 1265 × 712 px.
- Mobile: 390 × 844 CSS px; captured image: 375 px wide, with no horizontal overflow.
- The comparison combines matching-size source and final homepage captures without stretching.
- The navigation, resume entry point, mobile menu, desktop page width, and browser console were checked after the redesign.

## Findings

No actionable P0, P1, or P2 findings remain.

- Section separation: the homepage now moves through cool blue introduction, warm neutral capability space, a deep ink project chapter, and a pale blue contact finish. The resume follows the same narrative rhythm across profile, experience, projects, skills, and education.
- Scene transitions: generous top radii and overlapping section edges create a deliberate handoff between chapters, rather than a uniform stack of cards.
- Contrast and reading: the dark project chapter uses white/blue text and translucent dark surfaces; all primary copy, tags, metrics, and calls to action remain legible.
- Responsive behavior: at the mobile viewport, the homepage fits within its visual width and the expandable navigation exposes exactly 首页、项目、简历、相册.
- Runtime and deployment: `npm run build` passed with Nitro preset `vercel` and generated `.vercel/output`.

## Final result

final result: passed

---

# Design QA — Unified Homepage & Resume Iteration

## Comparison target

- Source visual truth: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-before-home.png`
- Final browser-rendered implementation: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-unified-final.png`
- Full-view comparison evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-final-comparison.png`
- Focused project-navigation evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-project-final.png`
- Focused profile-navigation evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-profile-nav.png`
- Mobile evidence: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-6-mobile-final.png`

## Viewport and state

- Desktop CSS viewport: 1280 × 720; source and implementation captures: 1265 × 712 px.
- Mobile CSS viewport: 390 × 844; implementation capture: 375 × 812 px.
- Density normalization: source and final desktop captures have matching dimensions and were placed side by side without stretching.
- State: light theme, homepage top, profile anchor, project anchor, and mobile chapter rail tested.

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the existing system/SF-style hierarchy, optical weights, Chinese fallback stack, tight display tracking, and readable body line height are preserved.
- Spacing and layout rhythm: the left rail takes a dedicated 112 px desktop lane, keeping it clear of the hero. Section sheets retain the established radii, overlap depth, padding, and cool-shadow rhythm.
- Colors and visual tokens: the unified page stays inside the approved white, mist-gray, and pale-blue palette. Active navigation uses the existing primary blue and maintains clear contrast.
- Image quality and asset fidelity: portrait, school crest, three company logos, and three project visuals remain real image assets with stable crops and meaningful alt text.
- Copy and content: the former homepage introduction now flows directly into technology, profile, education, work, projects, and contact without duplicated project content.
- Interaction and accessibility: the desktop rail tracks the visible section and every chapter link scrolls to its anchor. Mobile uses a horizontally scrollable, scrollbar-free chapter bar. Both navigation surfaces have descriptive labels.
- Runtime: final browser session reported no application errors or application warnings. The Vercel production build completed and generated `.vercel/output`.

## Comparison history

### Pass 1

- [P2] The top navigation's hash-based active class could differ during hydration after moving between resume anchors.
  - Fix: defer hash-sensitive active-state styling until the client has mounted.
  - Post-fix evidence: a fresh browser session reported no application errors or application warnings.
- [P3] The mobile chapter bar exposed a native horizontal scrollbar.
  - Fix: reused the project's scrollbar-hiding utility while preserving touch scrolling.

## Open Questions

- None.

## Implementation Checklist

- [x] Merge homepage and resume into one continuous page.
- [x] Add a compact left-side desktop chapter rail with active state.
- [x] Add a responsive mobile chapter bar.
- [x] Preserve JSON-driven content and existing visual assets.
- [x] Redirect legacy `/resume` links to the unified profile section.
- [x] Verify anchors, responsive states, browser runtime, and Vercel build.

## Follow-up Polish

- No blocking polish remains.

final result: passed

---

# Design QA — Navigation Motion & Responsive Iteration

## Comparison target

- Source implementation: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-7-before-wide.png`
- Final implementation: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-7-final-wide.png`
- Side-by-side comparison: `/Users/libokai/.codex/visualizations/2026/09/04/01a06c6d-a69d-7931-9d3e-b2876dd7714a/iteration-7-final-comparison.png`
- Responsive evidence: 1024 × 900, 768 × 900, and 390 × 844 browser captures.

## Findings

No actionable P0, P1, or P2 findings remain.

- Top navigation: the active item now uses a translucent white/pale-blue capsule with a 220 ms fade and a spring-like 360 ms scale transition. The selected state is clearer without overpowering the header.
- Wide desktop: the compact chapter rail remains visible and preserves the approved composition.
- Tablet and small desktop: the chapter rail switches to a sticky horizontal bar below 1280 px, returning the full content width to the resume and capability cards.
- Mobile: direct hash navigation lands below both sticky bars, the active chapter is visible, touch scrolling is preserved, and the native scrollbar is hidden.
- Overflow: 1440, 1024, 768, and 390 px viewports report no document-level horizontal overflow.
- Accessibility: the existing reduced-motion rule shortens navigation transitions for users who request reduced motion.
- Runtime: the production Nuxt/Vercel build completes successfully.

## Open Questions

- None.

final result: passed
