---
type: sales-content-timeline
status: active
area: online-marketing
cycle: 2026-06
start-date: 2026-06-04
finish-date: 2026-07-03
tags:
  - online-marketing
  - sales-content
  - timeline
  - gantt
---

# Production Timeline Gantt — 2026-06 Sales Content Cycle

This note estimates the first sales-content cycle from setup to month-end review. It is designed for display in Obsidian using Mermaid Gantt charts.

> [!note]
> Dates are based on starting Thursday 2026-06-04. The first full production week starts Monday 2026-06-08.

## High-level cycle Gantt

```mermaid
gantt
    title Imarflex Sales Content Cycle — 2026-06
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    excludes    weekends

    section Setup
    Confirm inputs, access, URLs, tracking              :a1, 2026-06-04, 2d
    Finalize UTM rule and approval flow                 :a2, after a1, 1d

    section Topic and Campaign Planning
    Gather 20-30 signals and 12-16 topic ideas          :b0, 2026-06-08, 1d
    Score 8-12 candidates and approve 4 topics          :b1, 2026-06-08, 1d
    Lock 4 campaigns and 15 social post records         :b2, 2026-06-08, 1d

    section Week 1 Rice Cooker
    Draft rice cooker blog and social angles            :c1, 2026-06-09, 1d
    Produce IG carousel, FB post, Reel script           :c2, 2026-06-10, 1d
    QA, approve, schedule W1 assets                     :c3, 2026-06-11, 1d
    Publish W1 and log URLs                             :milestone, c4, 2026-06-12, 0d

    section Week 2 Air Fryer
    Confirm recipe angle and product destination        :d1, 2026-06-15, 1d
    Draft / adapt recipe blog and social copy           :d2, 2026-06-16, 1d
    Produce Reel, carousel, FB recipe post              :d3, 2026-06-17, 1d
    QA, approve, schedule W2 assets                     :d4, 2026-06-18, 1d
    Publish W2 and log URLs                             :milestone, d5, 2026-06-19, 0d

    section Week 3 Fan
    Confirm fan cleaning angle and destination          :e1, 2026-06-22, 1d
    Draft / adapt maintenance guide and social copy     :e2, 2026-06-23, 1d
    Produce checklist, Reel, FB safety post             :e3, 2026-06-24, 1d
    QA, approve, schedule W3 assets                     :e4, 2026-06-25, 1d
    Publish W3 and log URLs                             :milestone, e5, 2026-06-26, 0d

    section Week 4 Warranty
    Draft warranty guide, FAQ carousel, FB trust post   :f1, 2026-06-29, 1d
    QA, approve, publish W4 assets                      :milestone, f2, 2026-06-30, 0d

    section Review
    Collect SEO, social, lead, and sales signals        :g1, 2026-07-01, 1d
    Review assumptions and ad candidates                :g2, 2026-07-02, 1d
    Decide July topics and cadence changes              :milestone, g3, 2026-07-03, 0d
```

## Detailed weekly production Gantt

Use this chart for each full production week. The same rhythm repeats for W1, W2, and W3.

```mermaid
gantt
    title Weekly Content Production Rhythm
    dateFormat  YYYY-MM-DD
    axisFormat  %a %m/%d

    section Monday
    Confirm 1 campaign topic from 2-3 candidates        :m1, 2026-06-08, 1d
    Update 1 campaign and 3-4 social post records       :m2, 2026-06-08, 1d

    section Tuesday
    Draft blog / support content                        :t1, 2026-06-09, 1d
    Draft IG / FB channel angles                        :t2, 2026-06-09, 1d

    section Wednesday
    Produce carousel copy and visual brief              :w1, 2026-06-10, 1d
    Produce Reel / Story script                         :w2, 2026-06-10, 1d
    Add UTM and product links                           :w3, 2026-06-10, 1d

    section Thursday
    QA SEO, claims, links, CTA, mobile readability      :th1, 2026-06-11, 1d
    Client/internal approval                            :th2, 2026-06-11, 1d
    Schedule blog, IG, FB                               :th3, 2026-06-11, 1d

    section Friday
    Publish assets                                      :milestone, f1, 2026-06-12, 0d
    Update post cards with URLs                         :f2, 2026-06-12, 1d
    Check early link / UTM tracking                     :f3, 2026-06-12, 1d

    section Next Monday
    Early performance review                            :nm1, 2026-06-15, 1d
```

## Step estimate

| Step | Quantity target | Estimated time | Owner / input | Output |
|---|---:|---:|---|---|
| Confirm product/category focus | 3-4 monthly categories | 0.5 day | Marketing + product owner | Final monthly focus |
| Gather raw signals | 20-30 signals | 0.5-1 day | Search/customer/competitor/product sources | Raw topic pool |
| Capture raw topic ideas | 12-16 ideas | 0.5 day | Content owner | Candidate topic list |
| Score candidate topics | 8-12 candidates | 0.5 day | Content owner + product owner | 4 approved + 4-8 backlog |
| Confirm destination and CTA | 0.5 day | Product URLs / WhatsApp / support page | One clear CTA |
| Create or update post records | 4 campaign + 15 social records monthly | 0.25-0.5 day | Content owner | Posts appear in [[../_sales-content.base]] |
| Blog / support draft | 1 per week / 4 monthly | 1 day | Writer / SEO | Draft article or support page |
| IG carousel / Reel / Story concept | 3-4 per week / 11 monthly | 0.5-1 day | Social producer | Social content outline |
| FB link / trust / offer post | 1 per week / 4 monthly | 0.25-0.5 day | Social producer | FB caption and link |
| Visual production or image brief | 1 day | Designer / image owner | Carousel/Reel/image assets |
| SEO and claim QA | 0.5 day | SEO / product reviewer | Approved facts, links, meta |
| Approval and scheduling | 0.5 day | Approval owner | Scheduled posts |
| Publish and URL logging | 0.25 day | Content owner | Post cards updated |
| Early performance check | 0.5 day | Analytics owner | Keep / boost / revise decision |
| Month-end report | 2-3 days | Marketing + analytics | [[online-marketing/reports/2026-06-sales-content-review]] |

## Quantity targets

The full quantity target is defined in [[production-volume-targets-2026-06]].

| Output | Target |
|---|---:|
| Raw signals to gather | 20-30 |
| Raw topic ideas to capture | 12-16 |
| Candidate topics to score | 8-12 |
| Campaign topics to approve | 4 |
| Backlog topics to keep | 4-8 |
| Campaign bundle records | 4 |
| Blog / support outputs | 4 |
| Instagram posts | 11 |
| Facebook posts | 4 |
| Total social posts | 15 |
| Post-level ad candidates to review | 2-5 |
| Actual paid tests | 0-2 |

## Critical path

The fastest safe path for one weekly campaign is 5 working days:

1. Monday: topic, destination, CTA, post records.
2. Tuesday: blog and channel drafts.
3. Wednesday: creative and links.
4. Thursday: QA, approval, schedule.
5. Friday: publish and log.

The critical blockers are:

- No product destination URL.
- No product facts / price / stock confirmation.
- No image or visual asset.
- No approval owner.
- No UTM / tracking rule.

## If timing slips

| Slip | What to do |
|---|---|
| Blog not ready by Thursday | Publish IG/FB lighter post only if the CTA still works; move blog to next week. |
| Visual not ready | Use text/table carousel for education posts; do not fake product imagery. |
| Product URL not ready | Do not publish sales CTA. Use trust/education CTA or wait. |
| Approval not ready | Keep as `draft-ready`; do not schedule. |
| Tracking not ready | Organic can publish with UTM draft, but paid ads should wait. |

## Display notes

In Obsidian reading view, the Mermaid blocks should render as Gantt charts. If the chart is too wide, open this note in a wider pane or switch to reading view.
