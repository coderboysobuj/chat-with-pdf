"use client"

import { Loader2 } from "lucide-react";
import { trpc } from "../_trpc/client"
import { useRouter, useSearchParams } from 'next/navigation';


export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in')
      }
    },
  })

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}
