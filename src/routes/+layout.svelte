<script>
  import '../app.css';
  let { children } = $props();
</script>

<div class="daft-body selection:bg-amber-400 selection:text-black w-full flex items-center justify-center p-2 sm:p-4">
  <!-- Outer Retro Desktop Window Frame matching reference image -->
  <div class="retro-desktop-frame">
    {@render children()}
  </div>
</div>
