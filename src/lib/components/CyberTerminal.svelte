<script>
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let commandInput = $state('');
  let logs = $state([
    "KUNJ_OS v1.0.1 (x86_64-vitchennai)",
    "Type 'help' to view available system commands.",
    "System ready."
  ]);

  function handleCommand(e) {
    if (e.key === 'Enter') {
      audio.playSound('technologic');
      const cmd = commandInput.trim().toLowerCase();
      logs = [...logs, `> ${commandInput}`];
      
      if (cmd === 'help') {
        logs = [...logs, "Commands: help, skills, revenue, ventures, github, clear"];
      } else if (cmd === 'skills') {
        logs = [...logs, "Skills: Robotics (ROS2), AI/ML (PyTorch), Web (SvelteKit), Apps (Flutter)"];
      } else if (cmd === 'revenue') {
        logs = [...logs, "Milestone: ₹2,00,000 INR generated in 60 days across Merrickson Services & Raaw Theory Media."];
      } else if (cmd === 'ventures') {
        logs = [...logs, "Ventures: Merrickson Services (Tech Lead), Raaw Theory Media (Media Architect)"];
      } else if (cmd === 'github') {
        logs = [...logs, "GitHub: https://github.com/KunjAgwl"];
      } else if (cmd === 'clear') {
        logs = [];
      } else {
        logs = [...logs, `Unknown command: '${cmd}'. Type 'help' for options.`];
      }

      commandInput = '';
    }
  }
</script>

<div class="retro-sub-box font-mono my-2 p-3">
  <div class="sub-box-header">
    <span class="text-green-bright font-bold text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>CYBER CLI TERMINAL TRANSMISSION</span>
    </span>
    <span class="text-muted text-[10px]">↗</span>
  </div>

  <div class="bg-black p-3 rounded border border-[var(--border-amber-dark)] font-mono text-xs h-40 overflow-y-auto space-y-1">
    {#each logs as log}
      <div class="text-green-bright/90">{log}</div>
    {/each}
    <div class="flex items-center gap-1 text-amber pt-1">
      <span>C:\&gt;</span>
      <input 
        type="text"
        bind:value={commandInput}
        onkeydown={handleCommand}
        placeholder="type command here..."
        class="bg-transparent border-none outline-none text-green-bright font-mono text-xs w-full"
      />
    </div>
  </div>
</div>
