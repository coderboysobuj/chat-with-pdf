'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { Cloud, FileIcon, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import toast from "react-hot-toast";
import { trpc } from "@/app/_trpc/client";


const UploadDropzone = ({
  isSubscribed,
}: {
  isSubscribed: boolean
}) => {

  const router = useRouter()

  const [isUploading, setIsUploading] =
    useState<boolean>(false)
  const [uploadProgress, setUploadProgress] =
    useState<number>(0)

  const { startUpload } = useUploadThing(
    isSubscribed ? 'proPlanUploader' : 'freePlanUploader'
  )

  const { mutate: startPulling, isLoading } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 500
  });


  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }
  return (
    <Dropzone
      multiple={false}
      onDrop={async (files) => {
        setIsUploading(true)

        const progressInterval = startSimulatedProgress()

        // handle file upload with uploadthing

        const res = await startUpload(files);

        if (!res) {
          return toast.error("Somethign went wrong please try again")
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;

        if (!key) {
          return toast.error("Somethign went wrong please try again")
        }

        // clear progress interval
        clearInterval(progressInterval)
        setUploadProgress(100);

        // start pulling pdf and push to chat page

        startPulling({
          key
        })



      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='border-4 h-64 m-4 border-dashed  rounded-lg'>
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center bg-muted justify-center w-full h-full rounded-lg cursor-pointer'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6 mb-2' />
                <p className='mb-2 text-sm'>
                  <span className='font-semibold'>
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className='text-xs text-muted-foreground'>
                  PDF (up to {isSubscribed ? "16" : "4"}MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-foreground text-primary-foreground flex items-center rounded-md overflow-hidden outline outline-[1px]  divide-x'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <FileIcon className='h-4 w-4 text-blue-500' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    indicatorColor={
                      uploadProgress === 100
                        ? 'bg-green-500'
                        : ''
                    }
                    value={uploadProgress}
                    className='h-1  w-full'
                  />
                  {uploadProgress === 100 || isLoading ? (
                    <div className='flex gap-1 items-center justify-center text-sm  text-center pt-2'>
                      <Loader2 className='h-3 w-3 animate-spin' />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default function UploadButton({ isSubscribed }: { isSubscribed: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          setIsOpen(value)
        }
      }}
    >
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  )
}

