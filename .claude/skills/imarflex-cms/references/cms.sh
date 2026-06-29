#!/usr/bin/env bash
# Tiny curl wrapper for the imarflex-app CMS API.
#
#   Usage:  cms.sh METHOD PATH [JSON_BODY]
#   Examples:
#     cms.sh GET  /cms/content-categories?active=1
#     cms.sh GET  "/cms/content-items?from=2026-06-01&to=2026-06-30"
#     cms.sh POST /cms/content-items '{"contentType":"blog","direction":"buying-guide","scheduledDate":"2026-07-08"}'
#     cms.sh PATCH /cms/content-items/abc123 '{"status":"confirmed"}'
#
# Env (set before calling; the script does NOT print the token):
#   CMS        base origin   — default http://localhost:8787 ; prod = <PROD_CMS_ORIGIN> (confirm first)
#   CHANNEL    X-Channel-Id  — default imarflex ; or manyprofit
#   TOKEN_FILE path to token — default imarflex-app/workers/api/.agent-api-token
#
# For multipart media upload use plain curl instead (this wrapper sends JSON):
#   curl -s -X POST -H "Authorization: Bearer $(cat "$TOKEN_FILE")" -H "X-Channel-Id: $CHANNEL" \
#        -F file=@poster.png -F alt=... "$CMS/cms/media"
set -euo pipefail

CMS="${CMS:-http://localhost:8787}"
CHANNEL="${CHANNEL:-imarflex}"
TOKEN_FILE="${TOKEN_FILE:-/home/lmt/Projects/personal/imarflex-app/workers/api/.agent-api-token}"

method="${1:?usage: cms.sh METHOD PATH [JSON_BODY]}"
path="${2:?usage: cms.sh METHOD PATH [JSON_BODY]}"
body="${3:-}"

token="$(cat "$TOKEN_FILE")"   # read at call time; never echoed

args=(-sS -X "$method"
  -H "Authorization: Bearer $token"
  -H "X-Channel-Id: $CHANNEL")

if [ -n "$body" ]; then
  args+=(-H "Content-Type: application/json" -d "$body")
fi

curl "${args[@]}" "$CMS$path"
