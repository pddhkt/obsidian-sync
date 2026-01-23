# TTS Local Docker Build Setup

## Overview
Configuration changes needed for building TTS Docker image locally with hardcoded basepath (bypassing placeholder replacement).

## Files to Modify

### 1. `apps/ctint-mf-tts/lib/api/index.ts`

Add hardcoded demo tokens for local testing:

```typescript
// In axiosInstance.interceptors.request.use callback, update/add:
localStorage.setItem(
  'cdss-auth-token',
  'EdOImMlG47o8McBVtqYyQbz7d4nte/7lO8HE7aoFRiivCS7efg8F+A2/7FhKxBNT8+XVFEB4rt+mevJ7Gwv8FxYG9fAayzF2Wg=='
);

// TODO: for demo only
localStorage.setItem('deviceId', uuidv4());
localStorage.setItem(
  'gc-access-token',
  'ofROc0Va1i74x3CKxPJ-et8g9jwo08wFkRgCzCcIYDwdAEmJMCIh-HDn9Sgw_U17WxTvtwnngeOksDWN8Sbatw'
);
localStorage.setItem(
  'cdss-auth-token',
  'EdOImMlG47o8McBVtqYyQbz7d4nte/7lO8HE7aoFRiivCS7efg8F+A2/7FhKxBNT8+XVFEB4rt+mevJ7Gwv8FxYG9fAayzF2Wg=='
);
```

### 2. `apps/ctint-mf-tts/public/config/ctint-global-config-build.yaml`

Change TTS basepath from placeholder to hardcoded value:

```yaml
# Before (placeholder for Kubernetes replacement):
ctint-mf-tts:
  host: http://localhost:4310
  basepath: /__TTS_BASE_PATH_TBM__

# After (hardcoded for local):
ctint-mf-tts:
  host: http://localhost:4310
  basepath: /cdss/tdc/mf-tts
```

### 3. `apps/ctint-mf-tts/replace-basepath-standalone.sh`

Use hardcoded config file and comment out TTS replacement:

```bash
# Change CONFIG_FILE to hardcoded path:
CONFIG_FILE="/app/apps/$APP_NAME_ENV/public/config/ctint-global-config-build.yaml"

# Comment out TTS sed replacements (not needed with hardcoded basepath):
# sed -i "s|http://localhost:4310|$TARGET_PATH_TTS_HOST|g" $(find $dir -type f)
# sed -i "s|/__TTS_BASE_PATH_TBM__|$TARGET_PATH_TTS_BASE_PATH|g" $(find $dir -type f)
```

## Important Notes

- These changes are for **local testing only**
- Do NOT commit these changes to the repository
- The basepath `/cdss/tdc/mf-tts` is different from UAT `/ctint/mf-tts`
- For Kubernetes/UAT deployment, use the placeholder approach with `GLOBAL_CONFIG_FILE` env var

## Production Setup (Kubernetes/UAT)

For production, the deployment needs:
1. `GLOBAL_CONFIG_FILE=ctint-global-config-uat.yaml` env var in Kubernetes deployment
2. Volume mount for config files at `/app/orign_dist/apps/ctint-mf-tts/public/config`
3. Placeholder `/__TTS_BASE_PATH_TBM__` in build yaml (replaced at container startup)

See: [[global config]] for more details on the config system.
