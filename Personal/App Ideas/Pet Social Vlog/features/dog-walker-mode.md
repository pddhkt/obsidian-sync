---
type: feature
project: Pet Social Vlog
mvp: false
priority: low
tags:
  - pet-app
  - feature
  - service
---

# Dog Walker Mode

A second persona: someone who walks other people's dogs for money. Same app, different role.

## What it does

- A user can act as a dog walker for other pet owners.
- Owners add a dog walker to a pet profile with permission controls.
- Walker starts a walk for a client's dog.
- Tracks route, duration, distance, photos, videos, notes.
- Generates a walk report the owner reviews after.
- Proof-of-walk media:
  - Start photo
  - Mid-walk photo
  - End photo
  - Short walk recap video
- Private sharing between walker and owner.
- Owner decides whether the walk also appears in public / friend / group feeds.
- Supports multiple dogs in one walk.

## Walker report fields

- Pickup time · Drop-off time
- Distance walked · Route map
- Photos / videos
- Pee / poop notes
- Mood / behavior
- Water / food
- Safety issue
- Walker message to owner

## Why it matters

- Turns the app from "consumer" to **"consumer + service marketplace"** — completely different growth profile.
- High-trust audience: dog walkers WANT proof tools today.
- Owners are willing to pay; walkers are willing to subscribe.

## Why NOT in MVP

- Splits product focus.
- Requires payment, scheduling, rating — heavy machinery.
- Better as a separate product line, validated only after the consumer MVP shows traction.

## Example flow

1. Owner creates a pet profile.
2. Owner invites a dog walker.
3. Walker accepts the invite.
4. Walker starts the scheduled walk.
5. App tracks route, time, distance, media.
6. Walker adds notes and photos.
7. Owner receives a private walk report.
8. Owner can save the walk to the pet's history or share selected parts.

## Data

See [[data-model#Dog Walker Job]].

## Related

- [[features/pet-walking-activity]] — walker uses the same walk flow.
- [[features/privacy-controls]] — owner-walker sharing is its own scope.

## Open questions

- **Full marketplace** (discovery, payment, ratings) or **private tool** for existing walker-owner relationships only?
- In-app payment, or stay outside the app at first?
- Permissions: start walks only · upload media · view pet history · message owner · invite other walkers?
- Should client walks count toward [[features/friends-walking-chart|public leaderboards]]?
