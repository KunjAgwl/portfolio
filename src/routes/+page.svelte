<script>
  import DaftVisor from '$lib/components/DaftVisor.svelte';
  import HoloHelmet from '$lib/components/HoloHelmet.svelte';
  import PyramidStage from '$lib/components/PyramidStage.svelte';
  import DaftSoundboard from '$lib/components/DaftSoundboard.svelte';
  import VentureCard from '$lib/components/VentureCard.svelte';
  import SkillMatrix from '$lib/components/SkillMatrix.svelte';
  import ProjectGrid from '$lib/components/ProjectGrid.svelte';
  import CyberTerminal from '$lib/components/CyberTerminal.svelte';

  import { Bot, Brain, Award } from '@lucide/svelte';

  let { theme = 'gold' } = $props();
</script>

<div id="hero" class="space-y-6">
  <!-- Minimalist Hero Header -->
  <section class="text-center pt-6 pb-2 relative">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 font-mono text-[11px] mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>VIT CHENNAI // 3RD YEAR CSE & TECH ENTREPRENEUR</span>
    </div>

    <h1 class="font-display text-4xl sm:text-6xl font-black tracking-wider text-white uppercase leading-none mb-3">
      KUNJ <span class="text-gold-gradient">AGARWAL</span>
    </h1>

    <p class="font-sub text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto tracking-wide mb-4">
      ROBOTICS <span class="text-amber-400">•</span> MACHINE LEARNING <span class="text-amber-400">•</span> DEEP LEARNING <span class="text-amber-400">•</span> WEB & APP DEV
    </p>

    <!-- Financial & Venture Badges Row -->
    <div class="flex flex-wrap justify-center items-center gap-2 font-mono text-[11px]">
      <div class="px-3 py-1 rounded-md border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center gap-1.5">
        <Award class="w-3.5 h-3.5 text-emerald-400" />
        <span>₹2 LAKH REVENUE IN 2 MONTHS</span>
      </div>
      <div class="px-3 py-1 rounded-md border border-amber-500/30 bg-amber-950/20 text-amber-300 flex items-center gap-1.5">
        <Bot class="w-3.5 h-3.5 text-amber-400" />
        <span>MERRICKSON SERVICES</span>
      </div>
      <div class="px-3 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 flex items-center gap-1.5">
        <Brain class="w-3.5 h-3.5 text-cyan-400" />
        <span>RAAW THEORY MEDIA</span>
      </div>
    </div>
  </section>

  <!-- Section 01: Helmet Visor HUD Display -->
  <section class="my-2">
    <DaftVisor {theme} />
  </section>

  <!-- Interactive 3D Holographic Helmet Wireframe Canvas -->
  <section id="holo-helmet">
    <HoloHelmet {theme} />
  </section>

  <!-- Alive 2007 Pyramid Stage Ribbon -->
  <section id="pyramid" class="scroll-mt-20">
    <PyramidStage {theme} />
  </section>

  <!-- Section 02: Ventures & Revenue Deck -->
  <section id="ventures" class="scroll-mt-20">
    <VentureCard {theme} />
  </section>

  <!-- Section 03: Domain & Code Matrix -->
  <section id="skills" class="scroll-mt-20">
    <SkillMatrix {theme} />
  </section>

  <!-- Section 04: Daft Synth Vocal Engine Launchpad -->
  <section id="soundboard">
    <DaftSoundboard {theme} />
  </section>

  <!-- Section 05: Project Archives -->
  <section id="projects" class="scroll-mt-20">
    <ProjectGrid {theme} />
  </section>

  <!-- Section 06: Cyber Terminal Transmission -->
  <section id="terminal" class="scroll-mt-20">
    <CyberTerminal {theme} />
  </section>
</div>
