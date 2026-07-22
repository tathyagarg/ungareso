<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer
  class="border-t border-black/25 bg-paper text-stone-900 absolute -bottom-72 w-full"
>
  <div class="mx-auto max-w-5xl px-6 py-12">
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
      <div class="col-span-2 sm:col-span-1">
        <a href="/" class="flex items-baseline gap-2">
          <span class="font-serif text-xl font-semibold tracking-tight"
            >UNGA Reso</span
          >
        </a>
        <p class="mt-3 max-w-[22ch] text-sm text-stone-600">
          Every UN General Assembly resolution, and exactly how each member
          voted.
        </p>
      </div>

      <!--
        <p
          class="mb-3 font-mono text-xs uppercase tracking-widest text-stone-500"
        >
          Browse
        </p>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/sessions" class="text-stone-700 hover:text-sky-800"
              >By session</a
            >
          </li>
          <li>
            <a href="/?voted=true" class="text-stone-700 hover:text-sky-800"
              >Put to a vote</a
            >
          </li>
          <li>
            <a href="/?voted=false" class="text-stone-700 hover:text-sky-800"
              >Adopted without vote</a
            >
          </li>
          <li>
            <a href="/topics" class="text-stone-700 hover:text-sky-800"
              >By topic</a
            >
          </li>
        </ul>
      </nav>

      <nav aria-label="Data">
        <p
          class="mb-3 font-mono text-xs uppercase tracking-widest text-stone-500"
        >
          Data
        </p>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/api" class="text-stone-700 hover:text-sky-800"
              >API access</a
            >
          </li>
          <li>
            <a href="/export" class="text-stone-700 hover:text-sky-800"
              >Bulk export</a
            >
          </li>
          <li>
            <a href="/methodology" class="text-stone-700 hover:text-sky-800"
              >Methodology</a
            >
          </li>
          <li>
            <a
              href="https://digitallibrary.un.org"
              target="_blank"
              rel="noopener noreferrer"
              class="text-stone-700 hover:text-sky-800"
            >
              UN Digital Library ↗
            </a>
          </li>
        </ul>
      </nav>

      <nav aria-label="About">
        <p
          class="mb-3 font-mono text-xs uppercase tracking-widest text-stone-500"
        >
          About
        </p>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/about" class="text-stone-700 hover:text-sky-800"
              >About UNGA Reso</a
            >
          </li>
          <li>
            <a href="/contact" class="text-stone-700 hover:text-sky-800"
              >Contact</a
            >
          </li>
          <li>
            <a href="/changelog" class="text-stone-700 hover:text-sky-800"
              >Changelog</a
            >
          </li>
        </ul>
      </nav>
      -->
    </div>

    <div
      class="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 font-mono text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>
        © {year} UNGA Reso. Sourced from the UN Digital Library. Not affiliated
        with the United Nations.
      </p>
      <!--
      <div class="flex gap-4">
        <a href="/privacy" class="hover:text-sky-800">Privacy</a>
        <a href="/terms" class="hover:text-sky-800">Terms</a>
      </div>
      -->
    </div>
  </div>
</footer>
