"use client";

import { useRouter } from "next/navigation";

type Problem = {
  id: number;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
};

export default function ProblemList({
  problems,
}: {
  problems: Problem[];
}) {
  const router = useRouter();

  async function upvote(id: number) {
    const response = await fetch(`/api/problems/${id}/vote`, {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
    }
  }

  if (problems.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
        No problems yet. Be the first to submit one.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <article
          key={problem.id}
          className="flex gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <button
            onClick={() => upvote(problem.id)}
            className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-700 text-zinc-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            <span className="text-lg">▲</span>

            <span className="text-sm font-semibold">
              {problem.votes}
            </span>
          </button>

          <div>
            <h3 className="text-lg font-semibold">
              {problem.title}
            </h3>

            <p className="mt-2 text-zinc-400">
              {problem.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}