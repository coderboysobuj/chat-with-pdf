import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Icons } from "./icons"
import { Gem } from "lucide-react"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"

interface UserAccountNavProps {
  email: string | undefined
  name: string
  imageUrl: string
}


export default function UserAccountNav({ email, name, imageUrl }: UserAccountNavProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button className='rounded-full h-8 w-8 aspect-square'>
          <Avatar className='relative w-8 h-8'>
            {imageUrl ? (
              <div className='relative aspect-square h-full w-full'>
                <Image
                  fill
                  src={imageUrl}
                  alt='profile picture'
                  referrerPolicy='no-referrer'
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className='sr-only'>{name}</span>
                <Icons.user className='h-4 w-4 text-primary' />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {name && (
              <p className='font-medium text-sm '>
                {name}
              </p>
            )}
            {email && (
              <p className='w-[200px] truncate text-xs text-muted-foreground'>
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/dashboard'>Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          {false ? (
            <Link href='/dashboard/billing'>
              Manage Subscription
            </Link>
          ) : (
            <Link href='/pricing'>
              Upgrade{' '}
              <Gem className='text-blue-600 h-4 w-4 ml-1.5' />
            </Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer'>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}
