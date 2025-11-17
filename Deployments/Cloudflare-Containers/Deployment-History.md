# Deployment History - Cloudflare Containers

## 2025-11-14 - Initial Deployment ✅

### Project: ctint-mf-tts (TTS Portal)

**Status**: Successfully Deployed

**URLs**:
- Production: https://ctint-mf-tts.pddhkt.workers.dev
- App Path: https://ctint-mf-tts.pddhkt.workers.dev/ctint/mf-tts

**Image Details**:
- Registry: `registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1`
- Size: 507MB
- Base: node:20-alpine
- Port: 3000

**Configuration**:
- Worker: `src/index.ts`
- Container Class: `TtsContainer`
- Max Instances: 10
- Root redirect: `/` → `/ctint/mf-tts`

**Challenges Resolved**:
1. ❌ Initial attempt with Dockerfile path failed (build args not passed)
2. ❌ "latest" tag rejected by Cloudflare
3. ✅ Solution: Tag image with version, push to registry
4. ❌ Wrong import from `cloudflare:workers`
5. ✅ Solution: Use `@cloudflare/containers` package
6. ✅ Root path 500 error - fixed with redirect logic

**Lessons Learned**:
- Always use versioned tags (v1.0.X), never "latest"
- Must install `@cloudflare/containers` npm package
- Container class must extend Container and set defaultPort
- First request takes ~15-20s (cold start)
- Use `getByName()` for consistent container instances

**Files Created**:
- `wrangler.toml` - Cloudflare configuration
- `src/index.ts` - Worker routing logic
- Updated `package.json` with wrangler dependencies

---

## Template for Future Deployments

### Deployment: [Project Name]

**Date**: YYYY-MM-DD

**Status**:

**URLs**:
- Production:
- App Path:

**Image Details**:
- Registry:
- Size:
- Base:
- Port:

**Configuration**:
- Worker:
- Container Class:
- Max Instances:

**Notes**:
-

**Challenges**:
-

---
