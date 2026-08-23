#!/bin/bash
# Checks every resource URL. Cloudflare-fronted sites answer 403 to curl even when
# healthy, so treat 403/401 as "reachable" and eyeball anything else by hand.
set -u
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
cd "$(dirname "$0")/.."
grep -o 'url: "[^"]*"' src/data/resources.ts | sed 's/url: "//;s/"$//' |
  xargs -P 12 -I{} bash -c 'printf "%s %s\n" "$(curl -sS -o /dev/null -w "%{http_code}" -L --max-time 25 -A "$0" "$1")" "$1"' "$UA" {} |
  sort | awk '$1 ~ /^(200|201|202|30[0-9]|40[13])$/ {ok++; next} {bad++; print} END {printf "\n%d reachable, %d suspect\n", ok, bad}'
