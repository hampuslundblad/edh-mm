import { forwardRef } from "react"
import { cn } from "@/lib/cn"

type TitleVariant = "xxl" | "xl" | "l" | "m" | "s"
type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: TitleVariant
  tag?: TitleTag
  children: React.ReactNode
}

const variantStyles: Record<TitleVariant, string> = {
  xxl: "text-2xl font-bold ",
  xl: "text-xl font-bold ",
  l: "text-lg font-bold ",
  m: "text-base font-bold ",
  s: "text-sm font-bold ",
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ variant = "m", tag = "h1", className, children, ...props }, ref) => {
    const Component = tag

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Title.displayName = "Title"

export { Title, type TitleProps, type TitleVariant, type TitleTag }
