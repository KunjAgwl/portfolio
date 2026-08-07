<script>
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let selectedProject = $state(null);

  const projects = [
    { 
      id: '001', 
      name: 'MERRICKSON AI', 
      type: 'brain',
      details: 'Co-founded B2B technology suite powering AI automation, ROS robotic workflows, and enterprise web solutions. Achieved ₹2 Lakh revenue in 60 days.'
    },
    { 
      id: '002', 
      name: 'ROBOTIC ARM', 
      type: 'arm',
      details: 'Autonomous 6-DOF robotic manipulator running ROS2, Inverse Kinematics (MoveIt), and real-time computer vision object grasping.'
    },
    { 
      id: '003', 
      name: 'RAAW THEORY', 
      type: 'cube',
      details: 'Digital media agency and high-production content architecture co-founded to scale brand presence and tech client marketing.'
    },
    { 
      id: '004', 
      name: '72 SEASONS', 
      type: 'sphere',
      details: 'Deep learning PyTorch convolutional neural network for real-time video telemetry analysis and autonomous vision navigation.'
    },
    { 
      id: '005', 
      name: 'COMING SOON', 
      type: 'ring',
      details: 'Next-generation web audio vocoder and AI sound synthesis engine inspired by Daft Punk sound architecture.'
    }
  ];

  function handleCardClick(p) {
    audio.playSound('technologic');
    selectedProject = p;
  }

  function closeModal() {
    audio.playSound('laser');
    selectedProject = null;
  }
</script>

<div class="retro-panel font-mono my-2 p-2.5">
  <div class="text-amber font-bold text-xs mb-2 flex items-center justify-between">
    <span>PROJECTS//</span>
    <span class="text-[10px] text-muted font-normal">CLICK CARD FOR SPECS</span>
  </div>

  <div class="projects-dock-grid">
    <!-- 5 Distinct Bordered Project Cards -->
    <div class="five-cards-grid">
      {#each projects as p}
        <div 
          onclick={() => handleCardClick(p)}
          class="project-card"
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && handleCardClick(p)}
        >
          <!-- Card Header line -->
          <div class="flex justify-between items-center text-[11px] text-muted font-bold border-b border-[var(--border-amber-dark)] pb-1">
            <span>{p.id}</span>
            <span class="text-muted group-hover:text-amber">↗</span>
          </div>

          <!-- Crisp Dithered Pixel Art Icon Artwork -->
          <div class="flex items-center justify-center my-1 text-purple">
            {#if p.type === 'brain'}
              <svg width="36" height="36" style="width: 36px; height: 36px;" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.2">
                <path d="M12 4.5a3.5 3.5 0 00-6 2.5c0 .7.2 1.4.6 2A3.5 3.5 0 004 12c0 1.2.6 2.3 1.5 3A3.5 3.5 0 008 20a3.5 3.5 0 004-2m0-13.5a3.5 3.5 0 016 2.5c0 .7-.2 1.4-.6 2A3.5 3.5 0 0120 12c0 1.2-.6 2.3-1.5 3A3.5 3.5 0 0116 20a3.5 3.5 0 01-4-2m0-13.5v13.5" />
              </svg>
            {:else if p.type === 'arm'}
              <svg width="36" height="36" style="width: 36px; height: 36px;" viewBox="0 0 24 24" fill="none" stroke="#44bba4" stroke-width="1.2">
                <path d="M12 2v4m0 0l-4 4m4-4l4 4M8 10v6m8-6v6m-4 4v2m-6 0h12" />
              </svg>
            {:else if p.type === 'cube'}
              <svg width="36" height="36" style="width: 36px; height: 36px;" viewBox="0 0 24 24" fill="none" stroke="#e6a15c" stroke-width="1.2">
                <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z M12 2v18 M4 6.5l8 4.5 8-4.5" />
              </svg>
            {:else if p.type === 'sphere'}
              <svg width="36" height="36" style="width: 36px; height: 36px;" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.2">
                <circle cx="12" cy="12" r="9" />
                <ellipse cx="12" cy="12" rx="9" ry="3" />
                <path d="M12 3v18" />
              </svg>
            {:else}
              <svg width="36" height="36" style="width: 36px; height: 36px;" viewBox="0 0 24 24" fill="none" stroke="#756252" stroke-width="1.2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            {/if}
          </div>

          <div class="text-[9px] text-center font-bold text-amber truncate border-t border-[var(--border-amber-dark)] pt-1">
            {p.name}
          </div>
        </div>
      {/each}
    </div>

    <!-- Quick Links & Purple Laser Pyramid Sub-Box -->
    <div class="retro-sub-box flex items-center justify-between mb-0 p-3">
      <div class="space-y-1.5 font-mono text-[11px]">
        <div>
          <a href="#projects" onclick={() => audio.playSound('technologic')} class="quick-link-item">&gt; VIEW ALL PROJECTS</a>
        </div>
        <div>
          <a href="https://github.com/KunjAgwl" target="_blank" rel="noopener noreferrer" onclick={() => audio.playSound('technologic')} class="quick-link-item">&gt; GITHUB PROFILE</a>
        </div>
        <div>
          <a href="#terminal" onclick={() => audio.playSound('technologic')} class="quick-link-item">&gt; RESUME.DOC</a>
        </div>
        <div>
          <a href="#terminal" onclick={() => audio.playSound('technologic')} class="quick-link-item">&gt; EMAIL ME</a>
        </div>
      </div>

      <!-- Crisp 3D Dithered Purple Laser Pyramid SVG Artwork -->
      <div class="w-20 h-20 flex items-center justify-center">
        <svg width="70" height="70" style="width: 70px; height: 70px;" viewBox="0 0 70 70" fill="none">
          <polygon points="35,6 6,64 64,64" fill="#1d0c2e" stroke="#c084fc" stroke-width="1.5"/>
          <line x1="12" y1="52" x2="58" y2="52" stroke="#c084fc" stroke-width="1"/>
          <line x1="18" y1="40" x2="52" y2="40" stroke="#c084fc" stroke-width="1"/>
          <line x1="24" y1="28" x2="46" y2="28" stroke="#c084fc" stroke-width="1"/>
          <line x1="30" y1="16" x2="40" y2="16" stroke="#c084fc" stroke-width="1"/>
          <line x1="15" y1="46" x2="55" y2="46" stroke="#33ff88" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</div>

<!-- Interactive Project Detail Modal Drawer -->
{#if selectedProject}
  <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="retro-panel max-w-md w-full p-4 font-mono shadow-2xl border-2 border-[var(--text-amber-bright)] animate-in fade-in zoom-in duration-200">
      <div class="flex justify-between items-center border-b border-[var(--border-amber)] pb-2 mb-3">
        <span class="text-amber-bright font-bold text-sm">{selectedProject.id} // {selectedProject.name}</span>
        <button onclick={closeModal} class="text-muted hover:text-red font-bold text-base cursor-pointer px-2">✕</button>
      </div>

      <div class="text-xs text-amber leading-relaxed mb-4 bg-black p-3 rounded border border-[var(--border-amber-dark)]">
        {selectedProject.details}
      </div>

      <div class="flex justify-between items-center text-xs">
        <a href="https://github.com/KunjAgwl" target="_blank" rel="noopener noreferrer" class="text-green hover:text-green-bright font-bold">&gt; VIEW GITHUB REPO ↗</a>
        <button onclick={closeModal} class="px-3 py-1 bg-amber text-black font-bold rounded cursor-pointer hover:bg-amber-bright">CLOSE</button>
      </div>
    </div>
  </div>
{/if}
