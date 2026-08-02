<script>
  import { Bot, BrainCircuit, Code, Smartphone, Cpu } from '@lucide/svelte';
  let { theme = 'gold' } = $props();

  const skillCategories = [
    {
      title: 'ROBOTICS & EMBEDDED',
      icon: Bot,
      color: '#ffd700',
      description: 'Hardware control, autonomous navigation, sensor fusion & robotics.',
      skills: [
        { name: 'ROS / ROS2', level: 90 },
        { name: 'Autonomous Navigation', level: 85 },
        { name: 'Microcontrollers (Arduino/ESP32)', level: 92 },
        { name: 'Sensor Fusion & Kinematics', level: 82 }
      ]
    },
    {
      title: 'MACHINE LEARNING & DL',
      icon: BrainCircuit,
      color: '#00f0ff',
      description: 'Neural networks, computer vision, predictive modeling & AI pipelines.',
      skills: [
        { name: 'PyTorch & TensorFlow', level: 88 },
        { name: 'Computer Vision (OpenCV/YOLO)', level: 90 },
        { name: 'Deep Neural Nets (CNN/Transformers)', level: 85 },
        { name: 'Model Optimization & Deployment', level: 84 }
      ]
    },
    {
      title: 'WEB DEVELOPMENT',
      icon: Code,
      color: '#ff0055',
      description: 'Modern reactive web apps, responsive design systems & APIs.',
      skills: [
        { name: 'SvelteKit / Svelte 5', level: 95 },
        { name: 'JavaScript / Node.js', level: 92 },
        { name: 'Vanilla CSS & Animations', level: 96 },
        { name: 'REST APIs & Web Audio', level: 90 }
      ]
    },
    {
      title: 'APP DEVELOPMENT',
      icon: Smartphone,
      color: '#00ff66',
      description: 'Cross-platform mobile applications with tactile UI & state sync.',
      skills: [
        { name: 'Flutter / React Native', level: 86 },
        { name: 'Mobile UI/UX Architecture', level: 88 },
        { name: 'Client-Side Local Storage', level: 85 },
        { name: 'Hardware API Integration', level: 82 }
      ]
    }
  ];
</script>

<div class="skills-section my-6">
  <div class="flex items-center gap-2 mb-4">
    <div class="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
      <Cpu class="w-5 h-5" />
    </div>
    <div>
      <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-glow uppercase">
        TECHNICAL SKILL MATRIX
      </h2>
      <p class="font-mono text-[11px] text-slate-400">CORE TECHNICAL EXPERTISE & SIGNAL STRENGTH</p>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each skillCategories as cat}
      <div class="chrome-card p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2.5 mb-2">
            <div class="p-1.5 rounded-md bg-black/40 border" style="border-color: {cat.color}; color: {cat.color}">
              <cat.icon class="w-5 h-5" />
            </div>
            <h3 class="font-display text-sm font-bold tracking-wide" style="color: {cat.color}">
              {cat.title}
            </h3>
          </div>

          <p class="text-[11px] text-slate-400 mb-4 font-mono">
            {cat.description}
          </p>

          <div class="space-y-3">
            {#each cat.skills as skill}
              <div>
                <div class="flex justify-between text-[11px] font-mono mb-1">
                  <span class="text-slate-200">{skill.name}</span>
                  <span style="color: {cat.color}">{skill.level}%</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-black/50 overflow-hidden p-0.5 border border-white/5">
                  <div 
                    class="h-full rounded-full transition-all duration-700"
                    style="width: {skill.level}%; background-color: {cat.color}; box-shadow: 0 0 6px {cat.color};"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="mt-4 pt-2.5 border-t border-white/10 flex justify-between items-center font-mono text-[9px] text-slate-400">
          <span>VIT CHENNAI // CSE</span>
          <span style="color: {cat.color}">OPERATIONAL</span>
        </div>
      </div>
    {/each}
  </div>
</div>
