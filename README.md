# cometa-demo

This project is using NextJS, using SSR capabilities to retrieve data. All the fetching is joined at an API route `/api/all-data`. Styling is made with TailwindCSS. Also, as a little state management there is a simple React Context.

The project is deployed in Vercel [https://cometa-demo.vercel.app/](https://cometa-demo.vercel.app/)


## To run it locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To run frontend tests

The tests are using Jest with testing-library

```bash
npm run test
```

## To run E2E tests

The test are using Cypress

```bash
npm run e2e:headless
```
