<script>
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let activeVenture = $state('revenue');

  function setVenture(id) {
    audio.playSound('technologic');
    activeVenture = id;
  }
</script>

<div class="retro-sub-box font-mono my-2 p-3">
  <div class="sub-box-header">
    <span class="text-amber-bright font-bold text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>VENTURES & REVENUE TELEMETRY // ₹2,00,000 MILESTONE</span>
    </span>
    <span class="text-muted text-[10px]">↗</span>
  </div>

  <!-- Hero Revenue Milestone Banner -->
  <div class="bg-black p-3 rounded border border-[var(--border-amber-light)] mb-3 flex flex-wrap items-center justify-between gap-2 shadow-lg">
    <div>
      <div class="text-[10px] text-muted tracking-wider">TOTAL COMBINED VENTURE REVENUE</div>
      <div class="text-green-bright font-bold text-xl sm:text-2xl flex items-center gap-2">
        <span>₹2,00,000 INR</span>
        <span class="text-xs text-amber font-normal">(₹2 LAKHS)</span>
      </div>
      <div class="text-[10px] text-amber font-mono mt-0.5">
        TIMELINE: <span class="text-green font-bold">60 DAYS (2 MONTHS)</span> • BOOTSTRAPPED & PROFITABLE
      </div>
    </div>
    <div class="flex gap-2">
      <span class="px-2.5 py-1 bg-amber text-black font-bold text-[11px] rounded shadow">100% PROFITABLE</span>
    </div>
  </div>

  <!-- Venture Tab Switcher -->
  <div class="flex gap-1.5 mb-3">
    <button
      onclick={() => setVenture('revenue')}
      class="flex-1 py-1 px-2 rounded text-xs font-mono font-bold transition-all cursor-pointer"
      class:bg-[#cbb299]={activeVenture === 'revenue'}
      class:text-black={activeVenture === 'revenue'}
      class:text-amber={activeVenture !== 'revenue'}
      class:border={activeVenture !== 'revenue'}
      class:border-amber={activeVenture !== 'revenue'}
    >
      REVENUE METRICS
    </button>

    <button
      onclick={() => setVenture('merrickson')}
      class="flex-1 py-1 px-2 rounded text-xs font-mono font-bold transition-all cursor-pointer"
      class:bg-[#cbb299]={activeVenture === 'merrickson'}
      class:text-black={activeVenture === 'merrickson'}
      class:text-amber={activeVenture !== 'merrickson'}
      class:border={activeVenture !== 'merrickson'}
      class:border-amber={activeVenture !== 'merrickson'}
    >
      MERRICKSON SERVICES
    </button>

    <button
      onclick={() => setVenture('raaw')}
      class="flex-1 py-1 px-2 rounded text-xs font-mono font-bold transition-all cursor-pointer"
      class:bg-[#cbb299]={activeVenture === 'raaw'}
      class:text-black={activeVenture === 'raaw'}
      class:text-amber={activeVenture !== 'raaw'}
      class:border={activeVenture !== 'raaw'}
      class:border-amber={activeVenture !== 'raaw'}
    >
      RAAW THEORY MEDIA
    </button>
  </div>

  <!-- Tab Content -->
  {#if activeVenture === 'revenue'}
    <div class="bg-black p-3 rounded border border-[var(--border-amber-dark)] text-xs space-y-2.5">
      <div class="flex justify-between items-center text-amber font-bold border-b border-[var(--border-amber-dark)] pb-1">
        <span class="text-green-bright">₹2 LAKH REVENUE BREAKDOWN</span>
        <span class="text-muted">60-DAY SPRINT</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
        <div class="bg-[#0b0805] p-2 rounded border border-[var(--border-amber-dark)]">
          <div class="text-amber font-bold">MERRICKSON SERVICES</div>
          <div class="text-green-bright font-bold text-sm">Tech & Enterprise Systems</div>
          <div class="text-muted text-[10px] mt-1">Delivered enterprise web applications, software platforms, and digital solutions for clients.</div>
        </div>

        <div class="bg-[#0b0805] p-2 rounded border border-[var(--border-amber-dark)]">
          <div class="text-amber font-bold">RAAW THEORY MEDIA</div>
          <div class="text-green-bright font-bold text-sm">Digital Brand Engine</div>
          <div class="text-muted text-[10px] mt-1">Engineered digital media assets, high-converting growth UI, and content architecture for clients.</div>
        </div>
      </div>

      <div class="text-amber/90 leading-relaxed text-[11px] pt-1">
        Co-founded both ventures alongside my friend during 3rd year CSE at VIT Chennai. By combining software engineering with high-production digital media, we secured client contracts and generated over <span class="text-green-bright font-bold">₹2,00,000 INR in revenue within the first 2 months</span> of operation.
      </div>
    </div>
  {:else if activeVenture === 'merrickson'}
    <div class="bg-black p-3 rounded border border-[var(--border-amber-dark)] text-xs space-y-2">
      <div class="flex justify-between items-center text-amber font-bold">
        <span>ROLE: TECH LEAD & CO-FOUNDER</span>
        <span class="text-green font-bold">REVENUE CONTRIBUTOR</span>
      </div>
      <p class="text-amber/90 leading-relaxed text-[11px]">
        Co-founded Merrickson Services to build enterprise-grade Web Applications, custom client software platforms, and high-performance tech systems that directly contributed to our ₹2 Lakh revenue milestone.
      </p>
      <div class="flex gap-2 pt-1">
        <span class="px-2 py-0.5 bg-[#1c150e] text-amber text-[10px] rounded border border-[var(--border-amber-dark)]">Enterprise Web</span>
        <span class="px-2 py-0.5 bg-[#1c150e] text-green text-[10px] rounded border border-[var(--border-amber-dark)]">Software Engineering</span>
        <span class="px-2 py-0.5 bg-[#1c150e] text-purple text-[10px] rounded border border-[var(--border-amber-dark)]">Client Platforms</span>
      </div>
    </div>
  {:else}
    <div class="bg-black p-3 rounded border border-[var(--border-amber-dark)] text-xs space-y-2">
      <div class="flex justify-between items-center text-amber font-bold">
        <span>ROLE: MEDIA ARCHITECT & CO-FOUNDER</span>
        <span class="text-green font-bold">REVENUE CONTRIBUTOR</span>
      </div>
      <p class="text-amber/90 leading-relaxed text-[11px]">
        Co-founded Raaw Theory Media to architect high-production digital media pipelines, content engines, and growth UI for startups and agency clients.
      </p>
      <div class="flex gap-2 pt-1">
        <span class="px-2 py-0.5 bg-[#1c150e] text-amber text-[10px] rounded border border-[var(--border-amber-dark)]">Brand Engineering</span>
        <span class="px-2 py-0.5 bg-[#1c150e] text-green text-[10px] rounded border border-[var(--border-amber-dark)]">Content Pipeline</span>
        <span class="px-2 py-0.5 bg-[#1c150e] text-purple text-[10px] rounded border border-[var(--border-amber-dark)]">Growth UI</span>
      </div>
    </div>
  {/if}
</div>
