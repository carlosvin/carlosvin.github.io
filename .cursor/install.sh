#!/usr/bin/env bash
set -euo pipefail

# Idempotent Cloud Agent bootstrap for this Zola static site.
# Installs the Zola binary pinned to the version used by CI
# (shalzz/zola-deploy-action@v0.21.0) and verifies the site builds.

ZOLA_VERSION="v0.21.0"
ZOLA_ARCHIVE="zola-${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
ZOLA_URL="https://github.com/getzola/zola/releases/download/${ZOLA_VERSION}/${ZOLA_ARCHIVE}"

if ! command -v zola >/dev/null 2>&1 || [ "$(zola --version)" != "zola ${ZOLA_VERSION#v}" ]; then
  tmp="$(mktemp -d)"
  curl -fsSL -o "${tmp}/zola.tar.gz" "${ZOLA_URL}"
  tar -xzf "${tmp}/zola.tar.gz" -C "${tmp}"
  sudo install -m 0755 "${tmp}/zola" /usr/local/bin/zola
  rm -rf "${tmp}"
fi

zola --version

# Validate that the site builds cleanly (also checks internal links).
zola build
