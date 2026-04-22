# NoAgeGate

A Kettu/Vendetta plugin that bypasses the iOS NSFW age gate for 18+ servers and channels.

## What it does

- Removes the age verification prompt on 18+ servers (`shouldNSFWGateGuild`)
- Removes the age-restricted channel gate (`canViewPotentiallyNSFWChannel`)
- Removes the NSFW invite warning (`isNSFWInvite`)

## Install

Add the following URL in Kettu → Plugins → Add Plugin:

```
https://<your-github-username>.github.io/<repo-name>/
```

> The `builds` branch is auto-published by GitHub Actions on every push to `main`.

## Build locally

```bash
npm install
npm run build
# output → dist/index.js + dist/manifest.json
```

## How it works

Uses `after` patches on the three gate functions so they always return the
bypass value. All patches are cleanly removed on plugin unload.
