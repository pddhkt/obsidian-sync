# Cloudflare Containers - Quick Reference

## One-Time Setup Commands

```bash
# 1. Install dependencies
npm install -D wrangler @cloudflare/containers

# 2. Login to Cloudflare
npx wrangler login
```

## Deploy New Image

```bash
# 1. Tag with version (NO "latest" tags!)
docker tag your-image:latest your-image:v1.0.X

# 2. Push to Cloudflare
npx wrangler containers push your-image:v1.0.X

# 3. Update wrangler.toml with the registry URL from step 2
# Edit: image = "registry.cloudflare.com/.../your-image:v1.0.X"

# 4. Deploy
npx wrangler deploy
```

## Useful Commands

```bash
# View logs (real-time)
npx wrangler tail

# List containers
npx wrangler containers list

# Check deployment info
npx wrangler deployments list

# Test locally
npx wrangler dev
```

## Current Deployment

**URL**: https://ctint-mf-tts.pddhkt.workers.dev
**Image**: registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1
**Version**: v1.0.1

## Key Files

- `src/index.ts` - Worker routing code
- `wrangler.toml` - Cloudflare config
- `Dockerfile` - Container definition

## Important Notes

- ⚠️ NO "latest" tags - always use versions (v1.0.1, v1.0.2, etc.)
- ⚠️ First request takes 15-20s (container boot)
- ⚠️ Max image size: 2GB
- ⚠️ Must extend Container class and set defaultPort
