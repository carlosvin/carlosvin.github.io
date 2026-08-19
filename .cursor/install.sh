#!/usr/bin/env bash
set -euo pipefail

# Idempotent Cloud Agent bootstrap for this Zola static site.
#
# The live site is published by the main-branch deploy job in
# .github/workflows/main.yml, which uses shalzz/zola-deploy-action@v0.21.0
# (that action bundles Zola v0.21.0). We pin the same Zola version here so the
# dev environment matches what actually deploys the site. The branch preview
# build in that same workflow uses @master, which tracks the latest Zola.

ZOLA_VERSION="v0.21.0"
ZOLA_ARCHIVE="zola-${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
ZOLA_URL="https://github.com/getzola/zola/releases/download/${ZOLA_VERSION}/${ZOLA_ARCHIVE}"

# GitHub redirects release downloads to a separate CDN host. In Cloud Agent
# environments that enforce a restricted egress allowlist, allowing only
# github.com (needed for the git clone) is NOT enough to fetch this binary.
# If the download fails, add these domains to the environment egress allowlist.
ZOLA_EGRESS_DOMAINS=(
  "github.com"
  "release-assets.githubusercontent.com"
  "objects.githubusercontent.com"
)

if ! command -v zola >/dev/null 2>&1 || [ "$(zola --version)" != "zola ${ZOLA_VERSION#v}" ]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "${tmp}"' EXIT
  # -f: fail on HTTP errors, -sS: quiet but still show errors, -L: follow the
  # release CDN redirect. Retries/timeouts keep transient network issues from
  # aborting setup. --retry-all-errors needs curl >= 7.71, so feature-detect it
  # rather than passing an unknown flag (which would fail on older curl).
  curl_opts=(-fsSL --retry 5 --retry-delay 2 --connect-timeout 30 --max-time 300)
  if curl --help all 2>/dev/null | grep -q -- '--retry-all-errors' \
     || curl --help 2>/dev/null | grep -q -- '--retry-all-errors'; then
    curl_opts+=(--retry-all-errors)
  fi
  if ! curl "${curl_opts[@]}" -o "${tmp}/zola.tar.gz" "${ZOLA_URL}"; then
    {
      echo "ERROR: Failed to download Zola ${ZOLA_VERSION} from:"
      echo "  ${ZOLA_URL}"
      echo
      echo "This usually means the Cloud Agent environment's egress allowlist is"
      echo "blocking GitHub's release CDN. Add these domains to the environment's"
      echo "allowed egress domains and re-run setup:"
      for d in "${ZOLA_EGRESS_DOMAINS[@]}"; do echo "  - ${d}"; done
    } >&2
    exit 1
  fi
  tar -xzf "${tmp}/zola.tar.gz" -C "${tmp}"
  sudo install -m 0755 "${tmp}/zola" /usr/local/bin/zola
fi

zola --version

# Validate that the site builds cleanly (also checks internal links).
zola build
