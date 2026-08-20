#!/usr/bin/env bash
set -euo pipefail

# Pin the same Zola as .github/workflows/main.yml (shalzz/zola-deploy-action@v0.23.3).
ZOLA_VERSION="v0.23.3"
ZOLA_ARCHIVE="zola-${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
ZOLA_URL="https://github.com/getzola/zola/releases/download/${ZOLA_VERSION}/${ZOLA_ARCHIVE}"

# github.com 302s release downloads onto these CDN hosts; all must be allowlisted.
ZOLA_EGRESS_DOMAINS=(
  "github.com"
  "release-assets.githubusercontent.com"
  "objects.githubusercontent.com"
)

if ! command -v zola >/dev/null 2>&1 || [ "$(zola --version)" != "zola ${ZOLA_VERSION#v}" ]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "${tmp}"' EXIT
  curl_opts=(-fsSL --retry 5 --retry-delay 2 --connect-timeout 30 --max-time 300)
  # --retry-all-errors needs curl >= 7.71
  if curl --help all 2>/dev/null | grep -q -- '--retry-all-errors' \
     || curl --help 2>/dev/null | grep -q -- '--retry-all-errors'; then
    curl_opts+=(--retry-all-errors)
  fi
  if ! curl "${curl_opts[@]}" -o "${tmp}/zola.tar.gz" "${ZOLA_URL}"; then
    {
      echo "ERROR: Failed to download Zola ${ZOLA_VERSION} from ${ZOLA_URL}"
      echo "Allowlist these egress domains and re-run setup:"
      printf '  - %s\n' "${ZOLA_EGRESS_DOMAINS[@]}"
    } >&2
    exit 1
  fi
  tar -xzf "${tmp}/zola.tar.gz" -C "${tmp}"
  if [ ! -f "${tmp}/zola" ]; then
    echo "ERROR: ${ZOLA_ARCHIVE} did not contain a zola binary" >&2
    exit 1
  fi
  if [ -w /usr/local/bin ]; then
    install -m 0755 "${tmp}/zola" /usr/local/bin/zola
  else
    sudo install -m 0755 "${tmp}/zola" /usr/local/bin/zola
  fi
fi

zola --version
zola build

# Cloud Agents load ~/.cursor/skills on the VM; they do not sync laptop home dirs.
skill_src="$(cd "$(dirname "$0")" && pwd)/skills/engineering-practices"
if [ -d "$skill_src" ]; then
  mkdir -p "${HOME}/.cursor/skills" "${HOME}/.agents/skills"
  rm -rf "${HOME}/.cursor/skills/engineering-practices" "${HOME}/.agents/skills/engineering-practices"
  cp -a "$skill_src" "${HOME}/.cursor/skills/engineering-practices"
  cp -a "$skill_src" "${HOME}/.agents/skills/engineering-practices"
fi
