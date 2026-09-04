#!/usr/bin/env bash
# Zola renders path: "llms.txt" as public/llms.txt/index.html.
# Flatten to root-level llms.txt and llms-full.txt files for the llms.txt spec.
set -euo pipefail

ROOT="${1:-public}"

flatten() {
  local name="$1"
  local src="${ROOT}/${name}/index.html"
  local dest="${ROOT}/${name}"

  if [[ ! -f "$src" ]]; then
    echo "flatten-llms-output: missing ${src}" >&2
    exit 1
  fi

  mv "$src" "${dest}.tmp"
  rmdir "${ROOT}/${name}"
  mv "${dest}.tmp" "$dest"
}

flatten "llms.txt"
flatten "llms-full.txt"
