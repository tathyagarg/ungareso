<script lang="ts">
  import Reso from "$lib/components/Reso.svelte";
  import { onMount } from "svelte";

  let { data } = $props();
  let res = $state(data.res);

  let query = $state("");
  let voteFilter = $state("all");

  const filtered = $derived.by(() => {
    return res.filter((r: any) => {
      const matchesVote =
        voteFilter === "all" ||
        (voteFilter === "voted" && r.voted) ||
        (voteFilter === "consensus" && !r.voted);
      return matchesVote;
    });
  });

  const colCount = 2;
  const cols = $derived.by(() => {
    const columns: (typeof res)[][] = Array.from(
      { length: colCount },
      () => [],
    );
    filtered.forEach((resolution: any, index: number) => {
      columns[index % colCount].push(resolution);
    });
    return columns;
  });

  const adoptedCount = $derived(res.filter((r: any) => r.voted).length);
</script>

<svelte:head>
  <title>UNGA Resolutions</title>
</svelte:head>

<div class="min-h-screen text-stone-900">
  <section class="border-b border-black/25">
    <div class="mx-auto max-w-5xl px-6 py-14">
      <p class="mb-3 font-mono text-xs uppercase tracking-widest text-sky-800">
        20,000+ resolutions on record
      </p>
      <h1
        class="max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl"
      >
        Every resolution the General Assembly has adopted.
      </h1>
      <p class="mt-4 max-w-xl text-stone-600">
        Search by title or document symbol, filter by session, and see how the
        assembly voted - yes, no, abstain, absent - resolution by resolution.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          bind:value={query}
          placeholder="Search “outer space,” A/RES/78/17, climate…"
          class="w-full flex-1 border border-black/25 bg-paper px-4 py-2.5 font-mono text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-sky-800"
        />
        <button
          class="w-full rounded border border-black/25 bg-un-blue px-4 py-2.5 font-mono text-sm text-stone-900 hover:bg-darker-blue focus:outline-none focus:ring-1 focus:ring-sky-800 sm:w-auto"
          onclick={async () => {
            const resp = await fetch(
              `/api/query?q=${encodeURIComponent(query)}`,
            );
            if (resp.ok) {
              const newData = await resp.json();
              console.log("newData", newData.res);
              res = newData.res;
            }
          }}
        >
          Search
        </button>

        <select
          bind:value={voteFilter}
          class="border border-black/25 bg-paper px-3 py-2.5 font-mono text-sm text-stone-700 focus:outline-none focus:ring-1 focus:ring-sky-800"
        >
          <option value="all">Voted or not</option>
          <option value="voted">Put to a vote</option>
          <option value="consensus">Adopted without vote</option>
        </select>
      </div>

      <p class="mt-3 font-mono text-xs text-stone-500">
        {filtered.length.toLocaleString()} matching · {adoptedCount.toLocaleString()}
        went to a recorded vote
      </p>
    </div>
  </section>

  <!-- Results -->
  <main class="mx-auto max-w-5xl px-6 py-10">
    {#if filtered.length === 0}
      <div class="border border-dashed border-black/25 px-6 py-16 text-center">
        <p class="font-serif text-xl text-stone-700">
          No resolutions match that search.
        </p>
        <p class="mt-1 text-sm text-stone-500">
          Try a different symbol, keyword, or session.
        </p>
      </div>
    {:else}
      <div class="flex gap-4">
        {#each cols as col}
          <div class="flex flex-1 flex-col gap-4">
            {#each col as resolution}
              <Reso {resolution} />
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </main>

  <footer class="border-t border-black/25 py-8">
    <p class="mx-auto max-w-5xl px-6 font-mono text-xs text-stone-500">
      Sourced from the UN Digital Library. Not affiliated with the United
      Nations.
    </p>
  </footer>
</div>
