<script>
  import DaftVisor from '$lib/components/DaftVisor.svelte';
  import PyramidStage from '$lib/components/PyramidStage.svelte';
  import DaftSoundboard from '$lib/components/DaftSoundboard.svelte';
  import VentureCard from '$lib/components/VentureCard.svelte';
  import SkillMatrix from '$lib/components/SkillMatrix.svelte';
  import ProjectGrid from '$lib/components/ProjectGrid.svelte';
  import CyberTerminal from '$lib/components/CyberTerminal.svelte';

  import { Bot, Brain, Award } from '@lucide/svelte';

  let { theme = 'gold' } = $props();
</script>

<div id="hero" class="space-y-8">
  <!-- Hero Header Section -->
  <section class="text-center pt-4 pb-2 relative">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 font-mono text-[11px] mb-4">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>VIT CHENNAI // 3RD YEAR CSE & TECH ENTREPRENEUR</span>
    </div>

    <h1 class="font-display text-3xl sm:text-5xl font-black tracking-wider text-white uppercase leading-tight mb-2">
      KUNJ <span class="text-amber-400 text-glow-gold">AGARWAL</span>
    </h1>

    <p class="font-sub text-sm sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto tracking-wide mb-4">
      ROBOTICS <span class="text-amber-400">•</span> MACHINE LEARNING <span class="text-amber-400">•</span> DEEP LEARNING <span class="text-amber-400">•</span> WEB & APP DEV
    </p>

    <!-- Badges Row -->
    <div class="flex flex-wrap justify-center items-center gap-2 font-mono text-[11px]">
      <div class="px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center gap-1.5">
        <Award class="w-3.5 h-3.5 text-emerald-400" />
        <span>₹2 LAKH REVENUE IN 2 MONTHS</span>
      </div>
      <div class="px-2.5 py-1 rounded-md border border-amber-500/30 bg-amber-950/20 text-amber-300 flex items-center gap-1.5">
        <Bot class="w-3.5 h-3.5 text-amber-400" />
        <span>CO-FOUNDER MERRICKSON SERVICES</span>
      </div>
      <div class="px-2.5 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 flex items-center gap-1.5">
        <Brain class="w-3.5 h-3.5 text-cyan-400" />
        <span>CO-FOUNDER RAAW THEORY MEDIA</span>
      </div>
    </div>
  </section>

  <!-- Daft Punk Helmet Visor HUD Display -->
  <section class="my-2">
    <DaftVisor {theme} />
  </section>

  <!-- Alive 2007 Pyramid Stage Canvas Visualizer -->
  <section id="pyramid" class="scroll-mt-20">
    <PyramidStage {theme} />
  </section>

  <!-- Alive 2007 Synth Soundboard Launchpad -->
  <section id="soundboard">
    <DaftSoundboard {theme} />
  </section>

  <!-- Ventures & Co-founding Track Record -->
  <section id="ventures" class="scroll-mt-20">
    <VentureCard {theme} />
  </section>

  <!-- Cyber Skill Matrix -->
  <section id="skills" class="scroll-mt-20">
    <SkillMatrix {theme} />
  </section>

  <!-- Projects Grid -->
  <section id="projects" class="scroll-mt-20">
    <ProjectGrid {theme} />
  </section>

  <!-- Cyber Terminal & Contact -->
  <section id="terminal" class="scroll-mt-20">
    <CyberTerminal {theme} />
  </section>
</div>
