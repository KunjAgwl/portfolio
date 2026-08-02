<script>
  import { FolderGit2, ExternalLink, Bot, BrainCircuit, Layout, Smartphone } from '@lucide/svelte';
  let { theme = 'gold' } = $props();

  let activeFilter = $state('ALL');

  const projects = [
    {
      title: 'Merrickson Client Web Suite',
      category: 'WEB',
      icon: Layout,
      description: 'High-performance client websites & enterprise dashboards built under Merrickson Services.',
      tags: ['SvelteKit', 'Node.js', 'Custom CSS', 'REST API'],
      github: 'https://github.com/KunjAgwl',
      accent: '#ffd700'
    },
    {
      title: 'Autonomous Navigation Robot',
      category: 'ROBOTICS',
      icon: Bot,
      description: 'ROS-based autonomous obstacle avoidance, SLAM mapping, and hardware microcontroller platform.',
      tags: ['ROS2', 'Python', 'C++', 'LIDAR', 'Arduino'],
      github: 'https://github.com/KunjAgwl',
      accent: '#ff0055'
    },
    {
      title: 'Deep Learning Vision Classifier',
      category: 'AI/ML',
      icon: BrainCircuit,
      description: 'Custom PyTorch CNN for real-time computer vision object detection and tracking.',
      tags: ['PyTorch', 'OpenCV', 'Python', 'YOLO'],
      github: 'https://github.com/KunjAgwl',
      accent: '#00f0ff'
    },
    {
      title: 'Raaw Theory Media Portal',
      category: 'WEB',
      icon: Layout,
      description: 'Interactive brand media gallery and animated UI platform built for client digital showcases.',
      tags: ['Svelte', 'WebGL Canvas', 'CSS Animations'],
      github: 'https://github.com/KunjAgwl',
      accent: '#00ff66'
    },
    {
      title: 'Cross-Platform Mobile App Suite',
      category: 'APP',
      icon: Smartphone,
      description: 'Tactile mobile application built with cross-platform synchronization and offline storage.',
      tags: ['Flutter', 'Dart', 'Firebase', 'State Management'],
      github: 'https://github.com/KunjAgwl',
      accent: '#a855f7'
    },
    {
      title: 'Daft Cyber Synthesizer Engine',
      category: 'WEB',
      icon: Layout,
      description: 'Procedural Web Audio API sound synthesizer and audio visualizer with custom soundboard controls.',
      tags: ['Web Audio API', 'SvelteKit', 'HTML5 Canvas'],
      github: 'https://github.com/KunjAgwl',
      accent: '#ffd700'
    }
  ];

  const filterOptions = ['ALL', 'ROBOTICS', 'AI/ML', 'WEB', 'APP'];

  let filteredProjects = $derived(
    activeFilter === 'ALL' 
      ? projects 
      : projects.filter(p => p.category === activeFilter)
  );
</script>

<div class="projects-section my-6">
  <div class="flex flex-wrap justify-between items-center mb-4 gap-3">
    <div class="flex items-center gap-2">
      <div class="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
        <FolderGit2 class="w-5 h-5" />
      </div>
      <div>
        <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-glow uppercase">
          PROJECT ARCHIVES
        </h2>
        <p class="font-mono text-[11px] text-slate-400">ROBOTICS • AI/ML • CLIENT WEBSITES • APPS</p>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap gap-1.5">
      {#each filterOptions as f}
        <button
          onclick={() => activeFilter = f}
          class="px-2.5 py-1 rounded font-mono text-[10px] uppercase transition-all border"
          class:bg-amber-400={activeFilter === f}
          class:text-black={activeFilter === f}
          class:border-amber-400={activeFilter === f}
          class:border-white-10={activeFilter !== f}
          class:text-slate-400={activeFilter !== f}
        >
          {f}
        </button>
      {/each}
    </div>
  </div>

  <!-- Projects Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredProjects as proj}
      <div class="chrome-card p-4 flex flex-col justify-between group">
        <div>
          <div class="flex justify-between items-start mb-2.5">
            <div class="p-2 rounded-lg bg-black/40 border" style="border-color: {proj.accent}; color: {proj.accent}">
              <proj.icon class="w-5 h-5" />
            </div>
            <span class="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 uppercase">
              {proj.category}
            </span>
          </div>

          <h3 class="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
            {proj.title}
          </h3>

          <p class="text-[11px] text-slate-400 leading-relaxed mb-4 font-mono">
            {proj.description}
          </p>
        </div>

        <div>
          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            {#each proj.tags as tag}
              <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/30 border border-white/5 text-slate-400">
                #{tag}
              </span>
            {/each}
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[11px]">
            <a 
              href={proj.github} 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GITHUB REPO</span>
            </a>
            <a 
              href={proj.github} 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-1 rounded bg-white/5 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Open Link"
            >
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
