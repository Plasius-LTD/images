# Changelog

All notable changes to this project will be documented in this file.

The format is based on **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

---

## [Unreleased]

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-10-25).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.24] - 2026-10-21

- **Added**
  - (placeholder)

- **Changed**
  - Restore trusted push-only CI on the approved quarantined self-hosted group, with bounded validation, clean installation, credential isolation and final package admission.

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.23] - 2026-10-18

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-10-18).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.22] - 2026-10-11

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-10-11).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.21] - 2026-10-04

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-10-04).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.20] - 2026-09-28

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-09-28).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.19] - 2026-09-27

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-09-27).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.18] - 2026-09-20

- Refresh npm dependency lockfile to current supported stable versions (weekly maintenance, 2026-09-20).

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.17] - 2026-09-13

### Changed
- Refresh compatible npm dependencies from the registry for the weekly dependency maintenance wave.


- **Added**
  - (placeholder)

- **Changed**
  - Bound npm publication to the exact prepared `main` commit after successful push-triggered CI.
  - (placeholder)

- **Fixed**
  - Added exact-commit CI dispatch and disabled package-manager cache finalization in both hosted validation jobs.
  - (placeholder)

- **Security**
  - Removed the npm write-token path, added a fail-closed npm 11.5.1-or-newer OIDC guard, and denied fork PR code access to reviewed CI.
  - Moved reviewed CI to explicit GitHub-hosted runners while retaining the same-repository pull-request guard.
  - Added fail-closed source and npm-package admission for the administrative contributor registry and pinned the CI/CD runtime to Node.js 24.18.0 LTS.
  - Updated the release dependency lock to resolve the current npm audit findings.
  - (placeholder)

## [1.0.16] - 2026-06-28

- **Added**
  - (placeholder)

- **Changed**
  - Refreshed the published `sharp` dependency to `0.35.2`.
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.15] - 2026-06-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.14] - 2026-06-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.12] - 2026-06-01

- **Added**
  - (placeholder)

- **Changed**
  - Removed the unused `react` and `@azure/cosmos` peer dependencies so the published package contract matches the runtime image helper surface.

- **Fixed**
  - Removed the deprecated direct `@types/uuid` dev dependency because `uuid` now ships its own type definitions.
  - (placeholder)

- **Security**
  - Reject CSS-bearing SVG avatar content such as `<style>` blocks, inline
    `style` attributes, and `url(...)` references.

## [1.0.11] - 2026-05-13

- **Added**
  - (placeholder)

- **Changed**
  - Refreshed dependencies to the latest stable published versions.
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.10] - 2026-04-21

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.9] - 2026-04-02

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.8] - 2026-03-04

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.4] - 2026-03-01

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.3] - 2026-02-28

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.2] - 2026-02-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.1] - 2026-02-13

- **Added**
  - (placeholder)

- **Changed**
  - Replace dual-`tsc` build steps with `tsup` to emit ESM + CJS + types side-by-side in `dist/` (`index.js`, `index.cjs`, `index.d.ts`).

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.0] - 2026-02-12

- **Added**
  - Standalone public package scaffold at repository root with independent CI/CD, ADRs, and legal governance assets.

- **Changed**
  - Add dual ESM + CJS build outputs with `exports` entries and CJS artifacts in `dist-cjs/`.

- **Fixed**
  - Removed monorepo-relative TypeScript configuration coupling for standalone builds.

- **Security**
  - Added baseline public package governance and CLA documentation.

---

## Release process (maintainers)

1. Record user-visible changes under **Unreleased**.
2. Verify public visibility, production environment, npm trusted-publisher identity and the next unused version.
3. Dispatch `.github/workflows/cd.yml` on `main` with `phase=prepare` and the appropriate `bump`.
4. Review and merge the pipeline's release metadata PR after its required checks. The pipeline owns version/changelog promotion and release tags.
5. Verify successful exact-main push CI, hosted production OIDC publication, public registry integrity/provenance and the matching GitHub release.

Never publish locally or manually promote versioned changelog sections. Rollback disables the affected workflow/channel without restoring the administrative registry.

---

[Unreleased]: https://github.com/Plasius-LTD/images/compare/v1.0.24...HEAD

## [1.0.0] - 2026-02-11

- **Added**
  - Initial release.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)
[1.0.0]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.0
[1.0.1]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.1
[1.0.2]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.2
[1.0.3]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.3
[1.0.4]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.4
[1.0.8]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.8
[1.0.9]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.9
[1.0.10]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.10
[1.0.11]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.11
[1.0.12]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.12
[1.0.14]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.14
[1.0.15]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.15
[1.0.16]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.16
[1.0.17]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.17
[1.0.18]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.18
[1.0.19]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.19
[1.0.20]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.20
[1.0.21]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.21
[1.0.22]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.22
[1.0.23]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.23
[1.0.24]: https://github.com/Plasius-LTD/images/releases/tag/v1.0.24
