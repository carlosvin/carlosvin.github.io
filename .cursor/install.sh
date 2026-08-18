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

if ! command -v zola >/dev/null 2>&1 || [ "$(zola --version)" != "zola ${ZOLA_VERSION#v}" ]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "${tmp}"' EXIT
  curl -fsSL -o "${tmp}/zola.tar.gz" "${ZOLA_URL}"
  tar -xzf "${tmp}/zola.tar.gz" -C "${tmp}"
  sudo install -m 0755 "${tmp}/zola" /usr/local/bin/zola
fi

zola --version

# Validate that the site builds cleanly (also checks internal links).
zola build
