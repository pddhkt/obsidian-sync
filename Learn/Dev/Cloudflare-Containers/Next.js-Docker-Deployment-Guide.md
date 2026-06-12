# Deploying Next.js Docker Container to Cloudflare Containers

**Date**: 2025-11-14
**Project**: ctint-mf-tts (TTS Portal)
**Status**: ✅ Successfully Deployed

## Overview

Successfully deployed a Next.js application running in a Docker container to Cloudflare's Container platform (Public Beta).

### Deployment URLs
- **Production URL**: https://ctint-mf-tts.pddhkt.workers.dev
- **App Base Path**: https://ctint-mf-tts.pddhkt.workers.dev/ctint/mf-tts

### Container Details
- **Registry**: `registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1`
- **Image Size**: 507MB (under 2GB limit ✓)
- **Base Image**: node:20-alpine
- **Application Port**: 3000

---

## Prerequisites

### Requirements
- Docker installed and running locally
- Node.js and npm installed
- Cloudflare account (paid plan required for Containers beta)
- Pre-built Docker image with your Next.js app

### Cloudflare Containers Limits
- **Max image size**: 2 GB per image
- **Registry storage**: 50 GB total per account
- **Image tags**: No "latest" tags allowed (must use versioned tags)

---

## Step-by-Step Deployment Process

### 1. Install Wrangler CLI

Install Cloudflare's Wrangler CLI as a dev dependency:

```bash
npm install -D wrangler
```

### 2. Authenticate with Cloudflare

Login to your Cloudflare account (opens browser):

```bash
npx wrangler login
```

This will open a browser window for OAuth authentication.

### 3. Create Worker Entry Point

Create `src/index.ts` with proper routing to your container:

```typescript
import { Container } from "@cloudflare/containers";

export class TtsContainer extends Container {
  // Next.js server runs on port 3000
  defaultPort = 3000;
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Redirect root path to the Next.js base path
    if (url.pathname === "/" || url.pathname === "") {
      return Response.redirect(new URL("/ctint/mf-tts", request.url).toString(), 302);
    }

    // Get the container instance by name
    const container = env.TTS_CONTAINER.getByName("tts-app");

    // Forward the request directly to the Next.js app in the container
    return await container.fetch(request);
  },
};
```

**Key Points**:
- Must extend `Container` class from `@cloudflare/containers`
- Set `defaultPort` to match your container's exposed port (3000 for Next.js)
- Use `getByName()` to get container instance
- Forward requests using `container.fetch(request)`

### 4. Install Containers Package

```bash
npm install -D @cloudflare/containers
```

### 5. Create Wrangler Configuration

Create `wrangler.toml` in project root:

```toml
name = "ctint-mf-tts"
compatibility_date = "2025-01-14"
main = "src/index.ts"

[observability]
enabled = true

# Container configuration
[[containers]]
max_instances = 10
class_name = "TtsContainer"
image = "registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1"

[[durable_objects.bindings]]
name = "TTS_CONTAINER"
class_name = "TtsContainer"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["TtsContainer"]
```

**Configuration Explanation**:
- `name`: Your Worker/app name
- `main`: Entry point file (the Worker code)
- `[[containers]]`: Container configuration
  - `class_name`: Must match your exported Container class
  - `max_instances`: Maximum concurrent container instances
  - `image`: Full Cloudflare registry URL (set after pushing image)
- `[[durable_objects.bindings]]`: Binds container to Worker environment
- `[[migrations]]`: Required for Durable Object setup

### 6. Tag and Push Docker Image

**Important**: Cloudflare does NOT accept "latest" tags. Use semantic versioning.

```bash
# Tag your local image with a version
docker tag ctint-mf-tts:latest ctint-mf-tts:v1.0.1

# Push to Cloudflare registry
npx wrangler containers push ctint-mf-tts:v1.0.1
```

This will:
1. Authenticate with Cloudflare registry
2. Upload all image layers
3. Return the full registry URL

**Output Example**:
```
Pushed image: registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1
```

### 7. Update wrangler.toml with Registry URL

Update the `image` field in `wrangler.toml` with the full registry URL from step 6:

```toml
[[containers]]
max_instances = 10
class_name = "TtsContainer"
image = "registry.cloudflare.com/9abdd4944b6a8642bc5a9667524cceaa/ctint-mf-tts:v1.0.1"
```

### 8. Deploy to Cloudflare

```bash
npx wrangler deploy
```

This will:
1. Upload your Worker code
2. Create the container application
3. Deploy and bind everything together
4. Return your production URL

**Output**:
```
SUCCESS  Created application ctint-mf-tts-ttscontainer
Deployed ctint-mf-tts triggers
  https://ctint-mf-tts.pddhkt.workers.dev
```

---

## Verification

### Test Deployment

```bash
# Test root (should redirect)
curl -I https://ctint-mf-tts.pddhkt.workers.dev

# Test app path
curl https://ctint-mf-tts.pddhkt.workers.dev/ctint/mf-tts
```

### View Logs

```bash
npx wrangler tail
```

### Check Container Status

```bash
npx wrangler containers list
```

---

## Project Structure

```
tts-portal/
├── src/
│   └── index.ts              # Worker entry point & routing
├── Dockerfile                # Container definition
├── wrangler.toml            # Cloudflare configuration
├── package.json             # Dependencies (wrangler, @cloudflare/containers)
└── [Next.js app files]
```

---

## Important Notes

### Container Boot Time
- **First request**: 15-20 seconds (cold start)
- **Subsequent requests**: Much faster (container stays warm)
- Containers sleep after inactivity and wake on next request

### Docker Image Requirements
- Must expose a port (default: 3000 for Next.js)
- Should handle the HOSTNAME environment variable
- Container must respond to HTTP requests on the exposed port

### Cloudflare Containers Use Durable Objects
- Each container is a Durable Object instance
- Managed lifecycle (boot, sleep, wake)
- Uses `getByName()` for consistent routing

---

## Updating Deployment

### When You Have a New Image

1. **Tag new version**:
```bash
docker tag your-new-image:tag ctint-mf-tts:v1.0.2
```

2. **Push to registry**:
```bash
npx wrangler containers push ctint-mf-tts:v1.0.2
```

3. **Update wrangler.toml**:
```toml
image = "registry.cloudflare.com/.../ctint-mf-tts:v1.0.2"
```

4. **Deploy**:
```bash
npx wrangler deploy
```

---

## Troubleshooting

### Issue: "latest tags are not allowed"
**Solution**: Always use semantic versioning (v1.0.1, v1.0.2, etc.)

### Issue: "image does not appear to be a valid path"
**Solution**: Must use full Cloudflare registry URL after pushing image

### Issue: "The requested module does not provide export named 'Container'"
**Solution**: Install `@cloudflare/containers` package and import from it, not from `cloudflare:workers`

### Issue: Docker build fails with missing APP_NAME
**Solution**: Either:
1. Use pre-built image and push it directly, OR
2. Configure build arguments in Dockerfile build command

### Issue: 500 errors on deployment
**Solution**:
- Check Worker logs with `npx wrangler tail`
- Ensure `defaultPort` matches your container's exposed port
- Verify container is listening on 0.0.0.0, not localhost

### Issue: Container doesn't start
**Solution**:
- Verify Dockerfile CMD/ENTRYPOINT is correct
- Check that HOSTNAME="0.0.0.0" is set for Next.js
- Ensure port 3000 is properly exposed

---

## Cost Considerations

### Cloudflare Containers Pricing
- Available on **paid Workers plans** only
- Check current pricing at: https://developers.cloudflare.com/workers/platform/pricing/

### Benefits Over Traditional Hosting
- Global edge deployment
- Pay-per-use model
- No idle server costs
- Automatic scaling

---

## Next Steps

### Optional Enhancements

1. **Custom Domain**:
   - Add custom domain in Cloudflare dashboard
   - Configure DNS and route

2. **Environment Variables**:
   ```toml
   [vars]
   API_URL = "https://api.example.com"
   ```

3. **Secrets**:
   ```bash
   npx wrangler secret put API_KEY
   ```

4. **Multiple Environments**:
   - Create `wrangler.production.toml`
   - Deploy with `--env production`

5. **CI/CD Integration**:
   - Add GitHub Actions workflow
   - Use `CLOUDFLARE_API_TOKEN` secret
   - Automate on git push

---

## Reference Links

- **Cloudflare Containers Docs**: https://developers.cloudflare.com/containers/
- **Getting Started**: https://developers.cloudflare.com/containers/get-started/
- **Image Management**: https://developers.cloudflare.com/containers/platform-details/image-management/
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/

---

## Deployment Checklist

- [ ] Docker image built and tested locally
- [ ] Image size under 2GB
- [ ] wrangler installed (`npm install -D wrangler @cloudflare/containers`)
- [ ] Authenticated with Cloudflare (`npx wrangler login`)
- [ ] Worker code created (`src/index.ts`)
- [ ] wrangler.toml configured
- [ ] Image tagged with version (no "latest")
- [ ] Image pushed to Cloudflare registry
- [ ] wrangler.toml updated with registry URL
- [ ] Deployed successfully (`npx wrangler deploy`)
- [ ] Tested deployment URLs
- [ ] Verified frontend accessibility

---

**Last Updated**: 2025-11-14
**Author**: Documented from successful deployment
**Project**: TTS Portal - Next.js Docker to Cloudflare Containers
