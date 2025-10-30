import { Title } from "./ui/title"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="mx-4 md:lg:xl:mx-[12.5%]  min-w-3/4 max-w-screen-xl  my-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Title variant="xxl" className="mb-8">
        {title}
      </Title>
      {children}
    </div>
  )
}

export default Layout
