'use client'


import { trpc } from "@/app/_trpc/client"
import Link from "next/link"
import { format } from "date-fns"
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import UploadButton from "./upload-button"
import MaxwidthWrapper from "./maxwidth-wrapper"
import { Skeleton } from "./ui/skeleton"

export default function Dashboard() {

  const { data: files, isLoading } = trpc.getUserFiles.useQuery()
  return (
    <MaxwidthWrapper>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-4xl'>
          My Files
        </h1>

        <UploadButton isSubscribed={false} />
      </div>

      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y  md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 divide-y  rounded-lg shadow transition hover:shadow-lg'>
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'>
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium'>
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <Plus className='h-4 w-4' />
                    {format(
                      new Date(file.createdAt),
                      'MMM yyyy'
                    )}
                  </div>

                  <div className='flex items-center gap-2'>
                    <MessageSquare className='h-4 w-4' />
                    mocked
                  </div>

                  <Button
                    onClick={() => { }}
                    size='sm'
                    className='w-full'
                    variant='destructive'>
                    {false ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y  md:grid-cols-2 lg:grid-cols-3'>
          {
            [0, 1, 2, 3, 4].map(item => (
              <FileSkeleton key={item} />
            ))
          }
        </ul>
      )
        : (
          <div className='mt-16 flex flex-col items-center gap-2'>
            <Ghost className='h-8 w-8' />
            <h3 className='font-semibold text-xl'>
              Pretty empty around here
            </h3>
            <p>Let&apos;s upload your first PDF.</p>
          </div>
        )}
    </MaxwidthWrapper>
  )
}


const FileSkeleton = () => {
  return (
    <li
      className='col-span-1 divide-y  rounded-lg shadow transition hover:shadow-lg'>
      <div
        className='flex flex-col gap-2'>
        <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex-1'>
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>

      <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-muted-foreground'>
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </li>
  )
}
