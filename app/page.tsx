"use client";

import { useState } from "react";

type Problem = {
  id: number;
  title: string;
  description: string;
  votes: number;
};

const initialProblems: Problem[] = [
  {
    id: 1,
    title: "Deployment takes too long",
    description:
      "My application builds successfully but takes several minutes before it is available.",
    votes: 12,
  },
  {
    id: 2,
    title: "Environment variables are confusing",
    description:
      "I wasn't sure which variables belonged in development versus production.",
    votes: 8,
  },
  {
    id: 3,
    title: "Database connection failed",
    description:
      "My application deployed successfully but couldn't connect to PostgreSQL.",
    votes: 5,
  },
];

export default function Home() {
  const [problems, setProblems] = useState(initialProblems);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitProblem(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const newProblem: Problem = {
      id: Date.now(),
      title,
      description,
      votes: 0,
    };

    setProblems([newProblem, ...problems]);
    setTitle("");
    setDescription("");
  }

  function upvote(id: number) {
    setProblems(
      problems.map((problem) =>
        problem.id === id
          ? { ...problem, votes: problem.votes + 1 }
          : problem
      )
    );
  }

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

        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Submit a problem
          </h2>

          <form onSubmit={submitProblem} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's going wrong?"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what happened..."
              rows={4}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Submit problem
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Deployment problems
            </h2>

            <span className="text-sm text-zinc-500">
              {problems.length} problems
            </span>
          </div>

          <div className="space-y-4">
            {problems
              .sort((a, b) => b.votes - a.votes)
              .map((problem) => (
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
        </section>

        <footer className="mt-16 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          Built as a Railway developer-growth experiment.
        </footer>
      </div>
    </main>
  );
}