---
name: engineering-practices
description: >-
  Use when writing code, fixing bugs, refactoring, or reviewing changes. Use when
  creating an implementation plan, technical design, architecture proposal, or
  choosing between solution approaches. Also when a simplification PR adds more lines
  than it removes, legacy or dead code may remain, comment noise accumulates, planning
  greenfield work without checking for reusable code, fixing a bug without an automated
  regression test, tempted to guess, skip tests, optimize early, or claim work is done
  without lint or test validation.
---

# Engineering practices

Apply on every substantive coding or design task unless the user or project docs
explicitly override them.

## When to use

- Implementing, refactoring, or reviewing code
- **Fixing a bug** — every fix ships with an automated regression test
- **Planning or designing software** — implementation plans, tech specs, API
  shapes, module boundaries, data models, migration strategies
- Comparing solution options before committing to one

## 1. When uncertain, escalate before guessing

Do not invent APIs, behavior, or architecture when you are unsure.

1. **Try to resolve from primary sources** — official docs, in-repo code, types,
   and tests.
2. **If still unsure, ask someone smarter** — hand off to a stronger or more
   specialized model (e.g. a higher-capability model, a domain-specific subagent,
   or a dedicated review pass) with a focused question and the context already
   gathered.
3. **If that does not resolve it, ask the human** — state what you checked, what
   remains ambiguous, and a concrete question or choice (not an open-ended "what
   should I do?").

Never silently assume correctness on security, data integrity, auth, migrations,
or production behavior.

## 2. Design from established guidance

When designing or changing a solution:

- **Follow official documentation** for frameworks, libraries, and platform APIs.
  Prefer current docs over training-data recall when they may differ.
- **Apply well-known patterns** where they fit: SOLID, DRY, KISS, YAGNI, and
  pragmatic programming (simplest thing that works; avoid speculative abstraction).
- **Prefer explicit over implicit** — obvious types, names, and control flow;
  explicit configuration and errors; no magic, hidden side effects, or clever
  indirection that forces readers to hunt for meaning.
- **Match the codebase** — naming, layering, error handling, and testing style
  already present in the project trump generic textbook patterns.

Choose boring, well-understood approaches over clever ones unless there is a
clear, stated reason otherwise. See **Design ethos** below.

### During planning: find reuse opportunities

Before proposing new modules, helpers, or abstractions, **search the codebase** for
code you can reuse or extend. Reuse should **simplify** the plan — fewer new
moving parts, less duplication, clearer boundaries.

- Look for existing functions, hooks, services, utilities, and patterns that
  already solve part of the problem.
- Prefer **compose or extend** over copy-paste or parallel implementations.
- Call out reuse in the plan (what you’ll reuse and where); if nothing fits, say
  what you searched and why new code is justified.
- Do not force reuse that adds indirection without reducing complexity — YAGNI
  still applies.

### Simplify deliberately

Treat simplification as an architectural outcome, not a refactor label. A PR
marketed as "simplification" that **adds more lines than it removes** is a signal
to dig deeper — local reshuffling often masks missing structural cleanup.

- Aim for code reduction and simplification in every change; an ideal diff should
  remove more lines than it adds.

Before adding new code to "simplify," audit for:

- **Architecture** — Can layers merge? Can abstractions collapse? Is there one
  obvious path instead of parallel implementations?
- **Legacy and dead code** — Unused exports, feature flags past their date,
  compatibility shims, duplicate helpers, unreachable branches.
- **Net deletion** — Prefer plans that delete or inline more than they introduce.
  If new code is required, justify why deletion alone cannot reach the goal.

When asked to simplify, produce a **pragmatic staff-engineer plan**:

1. Map what can be **removed** (dead code, redundant abstractions, legacy paths).
2. Map what can be **merged** (duplicate logic, thin wrappers, overlapping modules).
3. Only then specify minimal **additions** — and tie each to a deletion or merge
   it replaces.

Do not stop at cosmetic refactors when structural simplification is still available.

## 3. Optimize for readability, testability, and maintainability

Default priorities (in order):

1. **Readability** — clear names, small focused units, obvious control flow.
2. **Testability** — dependencies injectable or mockable; pure logic separated
   from I/O when practical.
3. **Maintainability** — minimal scope, consistent conventions, no dead code.

**Defer early performance optimization** unless there is measured need, a stated
SLA, or the user asks for it. Do not add caching, parallelism, or micro-optimizations
"just in case."

### Comments: default to none

- Avoid adding comments unless documenting an exported public element; prefer
  metadata attached to schemas or fields over comments.

Good code should mostly explain itself. **Avoid unnecessary comments.**

When a comment is warranted, keep it **concise** — one line for non-obvious intent,
not a restatement of what the code already says.

| Surface | Comment? |
|---------|----------|
| Exported/public API members | Yes — document contract and non-obvious behavior |
| Schemas, tool definitions, typed configs with embedded metadata | No — schema/docs/types are the documentation |
| Inline implementation | Only when business rules or non-obvious constraints cannot be expressed in names/types |

Red flags: comments that narrate control flow, duplicate type signatures, or
explain obvious variable assignments.

## 4. Validate before claiming done

Before saying work is complete, fixed, or ready to merge:

- Run the project's **lint** and **typecheck** commands when they exist.
- Run **tests** relevant to the change (at minimum the tests you added or touched).
- Fix failures you introduced; do not hand off broken lint or test output.

If you cannot run checks (missing env, permissions), say so explicitly and list
what the human should run.

## 5. Bug fixes require an automated regression test

**If you are fixing a bug, ship an automated test that proves it cannot happen again.**

A bug fix is not done until the test exists, runs in CI, and would have failed on
the broken behavior.

### Requirements

- Add or extend an **automated** test (unit, integration, or e2e — match the
  project’s existing test style) that **would have failed before the fix** and
  **passes after**.
- The test must assert the **correct behavior**, not merely execute the changed code.
- Name or comment the test so future readers know which bug it guards against.

### When you may skip (rare)

Only skip when the user explicitly declines tests, the repo has no harness for that
layer, or automation is genuinely impractical — and **explain why in your response**.
Manual verification alone does not satisfy this rule.

### Red flags — stop and add the test

- “The fix is too small to test”
- “I’ll add a test in a follow-up”
- “Manual testing is enough”
- “There’s no easy way to reproduce it” (find a minimal repro or document why not)

| Excuse | Reality |
|--------|---------|
| Too small to test | Small bugs regress constantly; the test is cheap insurance. |
| Test in follow-up | Follow-ups rarely happen; the fix is incomplete without it. |
| Manual testing only | Manual checks don’t run in CI and won’t catch the next regression. |
| Hard to reproduce | Narrow to the smallest failing case; if impossible, say so explicitly. |

Features may include tests when they add meaningful coverage; **bug fixes require
an automated regression test by default.**

## Design ethos (Zen of Python)

Use as judgment guides when planning and implementing — not as excuses to ignore
context or repo conventions.

- Beautiful is better than ugly.
- **Explicit is better than implicit.**
- Simple is better than complex.
- Complex is better than complicated.
- Flat is better than nested.
- Sparse is better than dense.
- Readability counts.
- Special cases aren't special enough to break the rules.
- Although practicality beats purity.
- Errors should never pass silently.
- Unless explicitly silenced.
- In the face of ambiguity, refuse the temptation to guess.
- There should be one — and preferably only one — obvious way to do it.
- Although that way may not obvious at first unless you're Dutch.
- Now is better than never.
- Although never is often better than *right* now.
- If the implementation is hard to explain, it's a bad idea.
- If the implementation is easy to explain, it may be a good idea.

**Reinforces this skill:** explicit over implicit; no guessing under ambiguity
(escalate instead); readability over cleverness; practicality over purity when
shipping; errors surfaced, not swallowed.

## Quick checklist

Before finishing:

- [ ] Uncertainty resolved via docs/code, stronger model, or human — not guessed
- [ ] Design aligned with official docs, patterns, repo conventions, and explicit APIs
- [ ] Plan checked for reuse opportunities (or documents why new code is needed)
- [ ] Simplification work deletes/merges more than it adds (or explains why not)
- [ ] Legacy and dead code audited — not just reshuffled
- [ ] Comments limited to exported APIs and genuinely non-obvious logic
- [ ] Plan or code favors clarity and maintainability over premature optimization
- [ ] Lint and tests run (or blockers documented)
- [ ] Bug fix includes an automated regression test (fails before fix, passes after)
