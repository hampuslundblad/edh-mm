const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {children}
    </div>
  )
}

export default Layout
