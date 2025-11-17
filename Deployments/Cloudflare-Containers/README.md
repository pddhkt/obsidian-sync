# Cloudflare Containers Deployment Documentation

This folder contains comprehensive documentation for deploying Docker containers to Cloudflare's Container platform.

## 📁 Documentation Files

### Main Guides
- **[Next.js-Docker-Deployment-Guide.md](Next.js-Docker-Deployment-Guide.md)** - Complete step-by-step deployment guide with troubleshooting
- **[Quick-Reference.md](Quick-Reference.md)** - Quick command reference for daily use
- **[Deployment-History.md](Deployment-History.md)** - Historical log of all deployments

### Templates & Examples
- **[wrangler.toml.example](wrangler.toml.example)** - Configuration file template
- **[worker-template.ts](worker-template.ts)** - Worker code template with routing examples

## 🚀 Quick Start

For deploying a new container:

1. Read: [Next.js-Docker-Deployment-Guide.md](Next.js-Docker-Deployment-Guide.md)
2. Use: [Quick-Reference.md](Quick-Reference.md) for commands
3. Copy: Template files to your project
4. Log: Deployment details in [Deployment-History.md](Deployment-History.md)

## 📊 Current Deployments

### ctint-mf-tts (TTS Portal)
- **URL**: https://ctint-mf-tts.pddhkt.workers.dev
- **Status**: ✅ Active
- **Version**: v1.0.1
- **Deployed**: 2025-11-14

## 🔗 Useful Links

- [Cloudflare Containers Documentation](https://developers.cloudflare.com/containers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Container Platform Details](https://developers.cloudflare.com/containers/platform-details/)

## 📝 Notes

- Cloudflare Containers is in **Public Beta** (as of June 2025)
- Requires a **paid Cloudflare plan**
- **Image size limit**: 2GB
- **Registry storage**: 50GB total per account
- **No "latest" tags** - always use versioned tags

---

**Last Updated**: 2025-11-14
