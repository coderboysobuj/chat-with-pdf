import Link from 'next/link'
import MaxwidthWrapper from "./maxwidth-wrapper";
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
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

          <div className='hidden items-center space-x-4 sm:flex'>
            <>
              <Link
                href='/pricing'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}>
                Pricing
              </Link>
              <Link
                href='/login'
                className={buttonVariants({
                  size: 'sm',
                })}>
                Get started{' '}
                <ArrowRight className='ml-1.5 h-5 w-5' />
              </Link>
            </>

            <>
              <Link
                href='/dashboard'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}>
                Dashboard
              </Link>

            </>
          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  )
}
