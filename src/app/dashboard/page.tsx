import MaxwidthWrapper from "@/components/maxwidth-wrapper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  redirect('/auth-callback?origin=dashboard');
  return (
    <MaxwidthWrapper>
      <h1 className="text-blue-600 text-3xl font-semibold">
        {user.given_name} {" "} {user.family_name}
      </h1>
    </MaxwidthWrapper>
  )
}
