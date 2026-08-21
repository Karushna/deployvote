"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitProblem() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitProblem(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);

    const response = await fetch("/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      router.refresh();
    }

    setSubmitting(false);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
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
          disabled={submitting}
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit problem"}
        </button>
      </form>
    </section>
  );
}