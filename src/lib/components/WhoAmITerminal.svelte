<script>
  import { onMount } from 'svelte';

  let { theme = 'gold' } = $props();

  const fullText = [
    "ENGINEER. MAKER. MUSICIAN.",
    "EXPLORER. OF CODE AND SOUND.",
    "CURRENTLY BUILDING AT THE INTERSECTION OF",
    "AI, ROBOTICS & RETRO COMPUTING."
  ];

  let displayedLines = $state(["", "", "", ""]);
  let currentLineIndex = $state(0);
  let currentCharIndex = $state(0);

  onMount(() => {
    const typeInterval = setInterval(() => {
      if (currentLineIndex < fullText.length) {
        const line = fullText[currentLineIndex];
        if (currentCharIndex < line.length) {
          displayedLines[currentLineIndex] = line.slice(0, currentCharIndex + 1);
          currentCharIndex++;
        } else {
          currentLineIndex++;
          currentCharIndex = 0;
        }
      } else {
        clearInterval(typeInterval);
      }
    }, 28);

    return () => clearInterval(typeInterval);
  });
</script>

<div class="retro-sub-box font-mono mb-2">
  <div class="sub-box-header">
    <span class="text-green-bright font-bold text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>C:\&gt; WHOAMI</span>
    </span>
    <span class="text-muted text-[10px]">↗</span>
  </div>

  <div class="text-green font-mono text-xs leading-relaxed p-2.5 bg-black rounded border border-[#1a1814] min-h-[4.8rem]">
    {#each displayedLines as line, idx}
      {#if line || idx === currentLineIndex}
        <div>
          {line}{#if idx === currentLineIndex && currentLineIndex < fullText.length}<span class="animate-pulse font-bold text-green-bright">█</span>{/if}
        </div>
      {/if}
    {/each}
    {#if currentLineIndex >= fullText.length}
      <div class="mt-0.5">
        <span class="animate-pulse font-bold text-green-bright">█</span>
      </div>
    {/if}
  </div>
</div>
