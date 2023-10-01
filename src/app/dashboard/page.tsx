import MaxwidthWrapper from "@/components/maxwidth-wrapper";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  });

  if (!dbUser) redirect('/auth-callback?origin=dashboard');


  return (
    <MaxwidthWrapper>
      <h1 className="text-blue-600 text-3xl font-semibold">
        {user.given_name} {" "} {user.family_name}
      </h1>
    </MaxwidthWrapper>
  )
}
