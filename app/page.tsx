import { prisma } from "@/lib/prisma";
import SubmitProblem from "@/components/SubmitProblem";
import ProblemList from "@/components/ProblemList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const problems = await prisma.problem.findMany({
    orderBy: {
      votes: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium text-blue-400">
            DEPLOYVOTE
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What makes deployment painful?
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            A tiny community for developers to share, discuss, and vote on
            deployment problems.
          </p>
        </header>

        <SubmitProblem />

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Deployment problems
            </h2>

            <span className="text-sm text-zinc-500">
              {problems.length} problems
            </span>
          </div>

          <ProblemList problems={problems} />
        </section>

        <footer className="mt-16 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          Built as a Railway developer-growth experiment.
        </footer>
      </div>
    </main>
  );
}