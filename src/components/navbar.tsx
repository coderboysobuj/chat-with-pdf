import Link from 'next/link'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'

import MaxwidthWrapper from "./maxwidth-wrapper";
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import MobileNav from './mobile-nav';
import UserAccountNav from './user-account-nav';

export default function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-background/75 backdrop-blur-lg transition-all'>
      <MaxwidthWrapper>
        <div className='flex h-14 items-center justify-between border-b'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>ChatPDF</span>
          </Link>

          {/* Mobile nav goese here  */}
          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (

              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (

              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  imageUrl={user.picture ?? ''}
                  email={user.email ?? ''}

                />

              </>
            )}

          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  )
}
