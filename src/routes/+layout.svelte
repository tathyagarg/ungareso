<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Nav from "$lib/components/Nav.svelte";
  import { onMount } from "svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  onMount(() => {
    const canvas = document.createElement("canvas");
    const size = 80;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const imageData = ctx?.createImageData(size, size);
    const data = imageData?.data;

    for (let i = 0; i < (data?.length ?? 0); i += 4) {
      const alterance = Math.floor(Math.random() * 16) - 8;

      if (data) {
        data[i] = 247 + alterance;
        data[i + 1] = 244 + alterance;
        data[i + 2] = 237 + alterance;
        data[i + 3] = 255;
      }
    }

    ctx?.putImageData(imageData ?? new ImageData(0, 0), 0, 0);
    document.body.style.backgroundImage = `linear-gradient(90deg, rgba(91, 146, 229, 0.1) 1px, transparent 1px), linear-gradient(rgba(91, 146, 229, 0.1) 1px, transparent 1px), url(${canvas.toDataURL()})`;
    document.body.style.backgroundSize = "80px 80px";
  });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Nav />

{@render children()}

<Footer />
