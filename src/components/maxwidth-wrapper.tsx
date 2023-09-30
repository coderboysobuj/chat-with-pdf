import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

interface MaxwidthWrapperProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function MaxwidthWrapper({ children, className }: MaxwidthWrapperProps) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  )
}
