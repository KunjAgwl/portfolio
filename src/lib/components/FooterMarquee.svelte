<script>
  let { textLeft = "// THANKS FOR VISITING. MAKE SURE TO PUT ON YOUR HELMET BEFORE YOU LEAVE.", textRight = "BRB, MAKING HISTORY." } = $props();
</script>

<footer class="mt-2 py-2 px-1 text-[11px] font-mono text-muted flex flex-wrap justify-between items-center border-t border-[var(--border-amber)] select-none">
  <div class="flex items-center gap-2">
    <span class="w-2 h-2 rounded-full bg-green-bright animate-ping"></span>
    <span class="text-muted">{textLeft}</span>
  </div>
  <div class="text-amber font-bold tracking-wider">
    {textRight}
  </div>
</footer>
