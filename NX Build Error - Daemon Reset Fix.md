# NX Build Error - Daemon Reset Fix

## Problem

When running NX commands like `nx build` or `nx lint`, you may encounter this error:

```
NX   Cannot read properties of null (reading 'message')

Pass --verbose to see the stacktrace.
```

Even with `--verbose`, the error shows:

```
TypeError: Cannot read properties of null (reading 'message')
    at handleWorkspaceChanges (/path/to/node_modules/nx/src/daemon/server/server.js:203:90)
    at /path/to/node_modules/nx/src/daemon/server/watcher.js:36:9
```

## Root Cause

This error is **not a code issue** - it's the NX daemon server in a corrupted state. This typically happens when:

- The file watcher has trouble tracking many rapid file changes
- The daemon state becomes out of sync with the workspace
- Cache corruption from interrupted builds or processes

## Solution

Reset the NX cache and stop the daemon:

```bash
npx nx reset && npx nx daemon --stop
```

This command does two things:
1. **`nx reset`** - Clears the NX workspace cache and stops the daemon
2. **`nx daemon --stop`** - Ensures the daemon is fully stopped

After running this, NX commands should work normally again.

## When to Use This Fix

Use this solution when:
- NX commands fail with daemon-related errors
- Build errors don't match your actual code (TypeScript compiles fine but NX fails)
- After making many file changes at once
- After git operations that modify many files (merge, rebase, checkout)

## Related Commands

### Check Daemon Status
```bash
npx nx daemon
```

### Stop Daemon Only
```bash
npx nx daemon --stop
```

### Reset Cache Only
```bash
npx nx reset
```

### View Daemon Logs
```bash
cat .nx/workspace-data/daemon.log
```

## Prevention

To minimize daemon issues:
- Avoid making too many file changes in rapid succession
- Let builds complete before starting new ones
- Restart the daemon periodically during heavy development

## Related Issues

- NX GitHub issues related to daemon stability
- File watcher limitations on some systems (especially when watching many files)

---

**Last Updated**: 2025-01-16
**Project**: CDSS3-Microfrontend
**Tags**: #nx #build-error #troubleshooting #development
