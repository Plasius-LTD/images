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
