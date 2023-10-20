This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies

-   [Pocketbase](https://pocketbase.io/) - A database that is easy to use and deploy.
-   [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static web applications.
-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces.
-   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
-   [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
-   [Prettier](https://prettier.io/) - An opinionated code formatter.

## Getting Started

First clone the repo:

```bash
git clone https://github.com/NWZX/NWZX_13_16102023
# or
gh repo clone NWZX/NWZX_13_16102023
```

Then install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

And, start the database:

```bash
pocketbase serve
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the **User chat** part of the project.

Open [http://localhost:3000/admin](http://localhost:3000/admin) with your browser to see the **Admin chat** part of the project.

Open [http://localhost:8090/\_/](http://localhost:8090/_/) with your browser to see the **Pocketbase Admin UI** _(demo@admin.com/0123456789)_
