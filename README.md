# @plasius/images

[![npm version](https://img.shields.io/npm/v/@plasius/images.svg)](https://www.npmjs.com/package/@plasius/images)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/images/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/images/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/images)](https://codecov.io/gh/Plasius-LTD/images)
[![License](https://img.shields.io/github/license/Plasius-LTD/images)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Public package providing image validation and transformation helpers for Plasius services.


## Install

```bash
npm install @plasius/images
```

## Usage

```ts
import { validateImageUpload } from "@plasius/images";
```

SVG avatar uploads intentionally support a restricted subset of SVG. The
validator rejects CSS-bearing SVG content such as `<style>` elements, inline
`style` attributes, and `url(...)` CSS references instead of attempting partial
CSS sanitization on untrusted input.

## Development

```bash
npm install
npm run build
npm test
```

## Governance

- Security policy: [SECURITY.md](./SECURITY.md)
- Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- ADRs: [docs/adrs](./docs/adrs)
- Legal docs: [legal](./legal)

For `Plasius-LTD/images#7`, the parent hardening flag
`repo-review.2026-05-17.hardening.enabled` is runtime `N/A` because this
package publishes validation helpers and does not evaluate rollout state.

## License

MIT

<!-- BEGIN PLASIUS RELEASE INTEGRITY -->
## Release integrity

CI keeps the administrative contributor registry outside Git and npm package
artifacts using exact, case-normalised path checks. The public CI workflow
accepts only pushes in `Plasius-LTD/images` and resolves both validation jobs
to the literal `Public CI - Quarantined` runner group with
`[self-hosted, Linux, X64]` labels. Fork and pull-request events, reusable calls,
manual dispatch, caller-selected runners and hosted fallback are not admitted.
Branch pushes require explicit reviewed workflow admission in that group;
`main` is already admitted. Jobs have 15/10 minute limits, checkout credential
persistence and package-manager cache finalization are disabled, and clean
`npm ci` retains lint, types, audit, build, 80% LCOV, source/index admission and
final package-manifest gates.

Publication uses the existing literal `ubuntu-latest` GitHub-hosted `production`
job with Node 24 and pinned npm 11.6.2. It is token-free and proceeds only while
the prepared SHA is the exact `main` head after successful push-triggered CI.
Verify public visibility, the production environment, trusted-publisher
repository/workflow/main/environment identity and the next unused version
before dispatching `cd.yml` with `phase=prepare` and `bump=patch`. The pipeline
alone generates release metadata, queues exact-commit CI, and dispatches the
publish phase; do not edit versioned changelog sections or publish locally.

Inherited rollout flag: `platform.public-artifact-integrity.enabled`, evaluated
by the platform's governed feature-flag store for staged public distribution.
Enabled permits verified promotion; disabled stops promotion. Neither state
bypasses mandatory source/package/CI/CD checks. This package has no runtime
flag evaluator, capability, or environment-variable override. Roll back by
stopping promotion and disabling the affected workflow/channel; remove any
temporary branch workflow admission after checks and merge. Never restore the
removed administrative registry or reuse a removed npm version. See
[ADR-0004](docs/adrs/adr-0004-quarantined-public-ci.md).
<!-- END PLASIUS RELEASE INTEGRITY -->
