import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server';
import { db } from '@/db';


export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    // check user is authorized
    if (!user.id || !user.email) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    // check user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    });

    if (!dbUser) {
      // create a user in the database with kinde user data
      await db.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      });
    }

    // return message to client
    return {
      success: true
    }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx
    const files = await db.file.findMany({
      where: {
        userId
      }
    });
    return files;
  })
});


export type AppRouter = typeof appRouter;



