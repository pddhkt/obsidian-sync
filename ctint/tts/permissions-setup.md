# TTS Permissions Setup

## Overview

TTS microfrontend uses feature-based permissions with the pattern:
```
ctint-mf-tts.{feature}.{action}
```

---

## Permission Strings (7 total)

| Description                              | Permission                               |     |
| ---------------------------------------- | ---------------------------------------- | --- |
| Access to TTS application                | `ctint-mf-tts.application.visit`         |     |
| View voice prompts listing and details   | `ctint-mf-tts.voice-prompts.view`        |     |
| Create, edit, generate TTS, upload audio | `ctint-mf-tts.voice-prompts.edit`        |     |
| Publish draft to versioned release       | `ctint-mf-tts.voice-prompts.publish`     |     |
| View User Replacements tab               | `ctint-mf-tts.special-words-user.view`   |     |
| Edit user-defined pronunciations         | `ctint-mf-tts.special-words-user.edit`   |     |
| View System Replacements tab             | `ctint-mf-tts.special-words-system.view` |     |

---

## Database Setup

Add permissions to user roles in the database. Example configurations:

### Full Admin (all permissions)
```json
[
  "ctint-mf-tts.application.visit",
  "ctint-mf-tts.voice-prompts.view",
  "ctint-mf-tts.voice-prompts.edit",
  "ctint-mf-tts.voice-prompts.publish",
  "ctint-mf-tts.special-words-user.view",
  "ctint-mf-tts.special-words-user.edit",
  "ctint-mf-tts.special-words-system.view"
]
```

### Editor (can edit but not publish)
```json
[
  "ctint-mf-tts.application.visit",
  "ctint-mf-tts.voice-prompts.view",
  "ctint-mf-tts.voice-prompts.edit",
  "ctint-mf-tts.special-words-user.view",
  "ctint-mf-tts.special-words-user.edit",
  "ctint-mf-tts.special-words-system.view"
]
```

### Viewer (read-only)
```json
[
  "ctint-mf-tts.application.visit",
  "ctint-mf-tts.voice-prompts.view",
  "ctint-mf-tts.special-words-user.view",
  "ctint-mf-tts.special-words-system.view"
]
```

### User Tab Only (no system access)
```json
[
  "ctint-mf-tts.application.visit",
  "ctint-mf-tts.voice-prompts.view",
  "ctint-mf-tts.voice-prompts.edit",
  "ctint-mf-tts.special-words-user.view",
  "ctint-mf-tts.special-words-user.edit"
]
```

---

## Code Configuration

### File: `apps/ctint-mf-tts/components/_hooks/useTTSPermissions.ts`

```typescript
// Toggle this for testing
// true = all permissions granted (bypass backend)
// false = use real permissions from backend API
const DEV_GRANT_ALL_PERMISSIONS = true;  // Change to false for production
```

### File: `apps/ctint-mf-tts/pages/_app.tsx`

Must have `RoleProvider` wrapper to receive permissions from backend:
```typescript
<RoleProvider basePath="">
  <main className="app">
    <Component {...pageProps} />
  </main>
</RoleProvider>
```

---

## Data Flow

```
Backend API (/ctint-auth/token or /ctint-session/...)
    |
    v
Returns: { permissions: ['ctint-mf-tts.application.visit', ...] }
    |
    v
RoleContext.tsx -> setUserConfig({ permissions: [...] })
    |
    v
useTTSPermissions hook -> useRole() -> userConfig.permissions
    |
    v
Components use: canEditVoicePrompts, canPublishVoicePrompts, etc.
```

---

## UI Behavior by Permission

| Permission | UI Effect |
|------------|-----------|
| No `application.visit` | Blocked at app level (AuthChecker) |
| No `voice-prompts.view` | Voice Prompts section hidden |
| No `voice-prompts.edit` | TTS Generator disabled (read-only) |
| No `voice-prompts.publish` | Publish button hidden |
| No `special-words-user.view` | User tab hidden |
| No `special-words-user.edit` | User tab read-only |
| No `special-words-system.view` | System tab hidden |

---

## Deployment Checklist

### For UAT Testing (all features)
- [x] Keep `DEV_GRANT_ALL_PERMISSIONS = true`
- [x] Push and build image
- [x] Test all features work

### For Production / Real Permission Testing
- [ ] Set `DEV_GRANT_ALL_PERMISSIONS = false`
- [ ] Add permissions to database for test users
- [ ] Push and build image
- [ ] Test different permission levels
