# qwik-starter

> my personal qwik template

## 🥳 Features

- ⚡ [Qwik 1.14](https://qwik.dev/)
  - 🧩 [Qwik City 1.14](https://qwik.dev/)
  - 💙 [Typescript](https://typescriptlang.org)
  - 💅 [Prettier](https://prettier.io/)
  - 🧹 [Eslint](https://eslint.org/)
- 🌬 [Tailwind](https://tailwindcss.com)
- 📽 [AOS](https://michalsnik.github.io/aos/)

## 🚀 Getting Started

1. Clone this repo:

    ```bash
    bunx degit@latest https://github.com/grngxd/qwik-starter
    ```

2. Install dependencies:

    ```bash
   bun i
    ```

3. Start the dev server:

    ```bash
    bun dev
    ```

## 📜 Scripts

- `bun dev` – Start development server
- `bun build` – Build for production

## Static Site Generator (Node.js)

Be sure to configure your server to serve very long cache headers for the `build/**/*.js` files.

Typically you'd set the `Cache-Control` header for those files to `public, max-age=31536000, immutable`.

```shell
bun build.server
```
