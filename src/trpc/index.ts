import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'


export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return "Hello world"
  })
});


export type AppRouter = typeof appRouter;



