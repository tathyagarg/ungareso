<script lang="ts">
  import { codeToCountry } from "$lib";

  let { data } = $props();
  let { res } = $derived(data);

  const roll = $derived([
    {
      key: "yes",
      label: "In favour",
      count: res?.total_yes,
      bar: "bg-emerald-700",
      dot: "bg-emerald-700",
    },
    {
      key: "no",
      label: "Against",
      count: res?.total_no,
      bar: "bg-rose-800",
      dot: "bg-rose-800",
    },
    {
      key: "abstain",
      label: "Abstaining",
      count: res?.total_abstain,
      bar: "bg-amber-600",
      dot: "bg-amber-600",
    },
    {
      key: "absent",
      label: "Absent",
      count: res?.total_absent,
      bar: "bg-slate-500",
      dot: "bg-slate-500",
    },
  ]);

  let citeFormat = $state("APA");
  const title = $derived(res?.title.split(" : ")[0]);

  let citeText = $derived.by(() => {
    if (!res) return "";

    const date = new Date(res?.date || "");

    const parts = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).formatToParts(date);

    const parts2 = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).formatToParts(date);

    const year = parts.find((p) => p.type === "year")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const shortMonth = parts2.find((p) => p.type === "month")?.value;
    const day = parts.find((p) => p.type === "day")?.value;

    if (citeFormat === "APA") {
      const formatted = `${year}, ${month} ${day}`;

      return `United Nations General Assembly. (${formatted}). ${title} (${res.symbol}). United Nations. https://docs.un.org/en/${res.symbol}`;
    } else if (citeFormat === "MLA") {
      const formatted = `${day} ${shortMonth} ${year}`;

      return `United Nations General Assembly. "${title}." ${res.symbol}, ${formatted}, United Nations, https://docs.un.org/en/${res.symbol}.`;
    }
    return "";
  });

  let copyCiteButton: HTMLButtonElement | null = null;
  let copySymbolButton: HTMLButtonElement | null = null;

  const setCopied = (button: HTMLButtonElement | null) => {
    if (button) {
      button.textContent = "Copied!";
      button.classList.add("border-emerald-700", "text-emerald-700");
      setTimeout(() => {
        if (button) {
          button.textContent = "Copy";
          button.classList.remove("border-emerald-700", "text-emerald-700");
        }
      }, 2000);
    }
  };
</script>

<svelte:head>
  <title>{res?.symbol} | UNGA Resolutions</title>
</svelte:head>

<div class="min-h-screen text-stone-900">
  <main class="mx-auto max-w-5xl px-6 py-8">
    <h1
      class="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
    >
      {title}
    </h1>
    <p class="mb-6 text-sm font-semibold tracking-wide text-sky-800 font-mono">
      <span>
        {res?.symbol}
      </span>
      <button
        bind:this={copySymbolButton}
        class="font-sans rounded border border-black/25 px-2 py-1 text-xs font-semibold tracking-wide hover:bg-stone-100 duration-300 cursor-pointer"
        onclick={() => {
          navigator.clipboard.writeText(res?.symbol || "");
          setCopied(copySymbolButton);
        }}
      >
        Copy
      </button>

      | Session {res?.session}
    </p>

    {#if res?.agenda}
      <p class="mb-6 text-sm font-semibold tracking-wide text-stone-500">
        Agenda: {res?.agenda}
      </p>
    {/if}

    <a
      href={`https://docs.un.org/en/${res?.symbol}`}
      target="_blank"
      class="mb-6 inline-block text-sm font-semibold bg-sky-800 text-white px-4 py-2 rounded hover:bg-sky-700 hover:-translate-y-1 duration-300"
    >
      Full Text
    </a>

    <h2 class="mb-2 text-xl font-semibold tracking-tight text-stone-900">
      Voting Record
    </h2>

    {#if res?.voted}
      <div class="flex flex-wrap gap-2">
        {#each res?.votes as vote}
          <div
            class="items-center gap-4 p-2 w-fit rounded border border-transparent hover:border-black/25 duration-300"
            class:vote-yes={vote.vote === "Y"}
            class:vote-no={vote.vote === "N"}
            class:vote-abstain={vote.vote === "A"}
            class:vote-absent={vote.vote === "X"}
            title={codeToCountry[vote.member_code] || vote.member_code}
          >
            <span class="font-mono text-sm text-stone-700"
              >{vote.member_code}</span
            >
          </div>
        {/each}
      </div>

      <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
      </div>
    {:else}
      <p class="text-sm font-semibold tracking-wide text-stone-500">
        This resolution was adopted without a vote.
      </p>
    {/if}

    <h2 class="mt-8 mb-2 text-xl font-semibold tracking-tight text-stone-900">
      Cite this resolution
    </h2>
    <div class="flex flex-col">
      <div class="flex gap-2">
        {#each ["APA", "MLA"] as format}
          <button
            class="rounded border border-b-0! rounded-b-none! border-black/25 px-3 py-1 text-sm font-semibold tracking-wide hover:bg-stone-100 duration-300 cursor-pointer"
            class:bg-sky-200={citeFormat === format}
            onclick={() => (citeFormat = format)}
          >
            {format}
          </button>
        {/each}
      </div>

      <div
        class="rounded rounded-tl-none! border border-black/25 bg-paper p-4 relative"
      >
        <p class="text-sm font-mono text-stone-700">
          {citeText}
        </p>

        <button
          bind:this={copyCiteButton}
          class="absolute top-2 right-2 mt-2 rounded border border-black/25 px-3 py-1 text-sm font-semibold tracking-wide hover:bg-stone-200 duration-300 bg-white cursor-pointer"
          onclick={() => {
            navigator.clipboard.writeText(citeText);
            setCopied(copyCiteButton);
          }}
        >
          Copy
        </button>
      </div>
    </div>
  </main>
</div>

<style>
  .vote-yes {
    background-color: #007a5530;
  }

  .vote-no {
    background-color: #a5003630;
  }

  .vote-abstain {
    background-color: #e1710030;
  }

  .vote-absent {
    background-color: #62748e30;
  }
</style>
