<script lang="ts">
  import type { ResolutionWithVotes } from "$lib";

  let { resolution }: { resolution: ResolutionWithVotes } = $props();

  const title = $derived(resolution.title.split(" : ")[0]);

  const roll = $derived([
    {
      key: "yes",
      label: "In favour",
      count: resolution.total_yes,
      bar: "bg-emerald-700",
      dot: "bg-emerald-700",
    },
    {
      key: "no",
      label: "Against",
      count: resolution.total_no,
      bar: "bg-rose-800",
      dot: "bg-rose-800",
    },
    {
      key: "abstain",
      label: "Abstaining",
      count: resolution.total_abstain,
      bar: "bg-amber-600",
      dot: "bg-amber-600",
    },
    {
      key: "absent",
      label: "Absent",
      count: resolution.total_absent,
      bar: "bg-slate-500",
      dot: "bg-slate-500",
    },
  ]);

  function formatDate(d: string) {
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return d;
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
</script>

<a
  href={`/document/${resolution.symbol}`}
  class="mb-4 inline-block text-sm font-semibold text-sky-800 hover:-translate-y-2 duration-300 bg-paper"
>
  <article
    class="h-fit relative mx-auto max-w-xl border border-black/25 hover:border-sky-800 duration-300 px-8 pb-6 pt-7 font-sans text-stone-900 shadow-[0_1px_2px_rgba(27,33,41,0.08),0_8px_24px_rgba(27,33,41,0.06)]"
  >
    <header
      class="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-black/25 pb-3"
    >
      <div class="flex items-baseline gap-2.5">
        <span class="text-sm font-semibold tracking-wide text-sky-800 font-mono"
          >{resolution.symbol}</span
        >
        <span class="text-xs text-stone-500"
          >{resolution.session}th session</span
        >
      </div>
      <div class="flex flex-wrap gap-2">
        {#if resolution.emergency}
          <span
            class="rounded-sm border border-rose-800 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-rose-800"
          >
            Emergency Special Session
          </span>
        {/if}
        {#if resolution.special}
          <span
            class="rounded-sm border border-sky-800 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-800"
          >
            Special Session
          </span>
        {/if}
      </div>
    </header>

    <div class="mb-5">
      <p class="mb-1.5 text-xs uppercase tracking-wider text-stone-500">
        Agenda item - {resolution.agenda}
      </p>
      <h1
        class="mb-2.5 font-serif text-2xl font-semibold leading-tight text-stone-900"
      >
        {title}
      </h1>
      <p class="font-mono text-xs text-stone-500">
        {formatDate(resolution.date || "")}
      </p>
    </div>

    {#if resolution.voted}
      <div>
        <div
          class="flex h-3.5 overflow-hidden border border-stone-900 bg-stone-300"
        >
          {#each roll as r}
            {#if r.count > 0}
              <div
                class={r.bar}
                style="flex-grow:{r.count}"
                title="{r.label}: {r.count}"
              ></div>
            {/if}
          {/each}
        </div>
        <dl class="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {#each roll as r}
            <div class="flex flex-col gap-0.5">
              <dt
                class="flex items-center gap-1.5 text-xs uppercase tracking-wide text-stone-500"
              >
                <span class="h-1.5 w-1.5 shrink-0 rounded-full {r.dot}"></span>
                {r.label}
              </dt>
              <dd class="font-sans-serif text-lg font-semibold">{r.count}</dd>
            </div>
          {/each}
        </dl>
      </div>
    {:else}
      <span
        class="rounded border-2 px-3 py-1 font-mono text-sm font-bold tracking-wider
        border-sky-800 text-sky-800"
      >
        Adopted without vote
      </span>
    {/if}
  </article>
</a>
