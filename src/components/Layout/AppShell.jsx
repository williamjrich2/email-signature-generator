export default function AppShell({ topBar, builder, preview }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      {topBar}
      <main className="mt-6 grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <section className="min-w-0">{builder}</section>
        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">{preview}</aside>
      </main>
    </div>
  )
}
