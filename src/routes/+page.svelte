<script>
  import RetroSidebar from '$lib/components/RetroSidebar.svelte';
  import RetroMainHeader from '$lib/components/RetroMainHeader.svelte';
  import WhoAmITerminal from '$lib/components/WhoAmITerminal.svelte';
  import RetroRightPanel from '$lib/components/RetroRightPanel.svelte';
  import ProjectsDock from '$lib/components/ProjectsDock.svelte';
  import FooterMarquee from '$lib/components/FooterMarquee.svelte';
  import VentureCard from '$lib/components/VentureCard.svelte';
  import CyberTerminal from '$lib/components/CyberTerminal.svelte';

  let activeTab = $state('HOME');

  function handleSelectTab(tabId) {
    activeTab = tabId;
  }
</script>

<div class="flex flex-col gap-2">
  <!-- Desktop 3-Column Layout -->
  <div class="desktop-grid">
    <!-- Left Column Panel -->
    <RetroSidebar {activeTab} onSelectTab={handleSelectTab} />

    <!-- Center Column Panel -->
    <div class="flex flex-col justify-between">
      <div>
        <RetroMainHeader />
        <WhoAmITerminal />

        {#if activeTab === 'ABOUT' || activeTab === 'REWIND' || activeTab === 'VENTURES'}
          <VentureCard />
        {:else if activeTab === 'CONTACT'}
          <CyberTerminal />
        {/if}
      </div>
    </div>

    <!-- Right Column Panel (Contains Live AI Neural Network Topology Canvas) -->
    <RetroRightPanel />
  </div>

  <!-- Bottom Projects Gallery Row -->
  <section id="projects">
    <ProjectsDock />
  </section>

  <!-- Bottom Marquee Ticker -->
  <FooterMarquee />
</div>
