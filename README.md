# Cook with Luke

This is a simple cookbook app with a list of recipes, their details and a form to add more. It is built with React, NextJS, Tailwind CSS, Redux-Toolkit and Redux-Toolkit Query, React-Hook-Form and Zod. It is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It serves as a solution for this [interview task](https://github.com/AckeeCZ/cookbook-web-task).

## Deployment

The project is deployed via vercel on [this url](https://cook-with-luke.vercel.app/).

## To run it locally:

1. `npm install`
2. `npm run dev`

## To run tests:

1. `npm run test:watch`

## Gotchas

- The backend is not persistent, so it's not possible to add new recipes to the db.
- The ratings endpoint doesn't seem to work, so the request currently fails with a 404.

## Improvements backlog

- Pagination/Endless scroll for the recipe list - as there are only 2 items in the db, it wasn't a priority, but in a serious environment, this should be handled.
- Error & Loading boundary - error handling is currently very naive and could use more work. Same applies to loading states.
- Storybook for components - it would be nice to have some UI tests like these.
- Test coverage - as always, even this project could use more tests.
