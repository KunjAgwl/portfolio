<script>
  import { Terminal, Send, CheckCircle2 } from '@lucide/svelte';
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let inputCommand = $state('');
  let commandHistory = $state([
    { type: 'sys', text: 'KUNJ AGARWAL CYBER TERMINAL OS v3.0 [READY]' },
    { type: 'sys', text: 'TYPE "help" OR "revenue" OR "skills" TO RUN SYSTEM QUERIES.' }
  ]);

  let contactName = $state('');
  let contactEmail = $state('');
  let contactMessage = $state('');
  let messageSent = $state(false);

  function executeCommand(e) {
    if (e.key === 'Enter') {
      const cmd = inputCommand.trim().toLowerCase();
      audio.playSound('kick');

      commandHistory = [...commandHistory, { type: 'user', text: `$ ${inputCommand}` }];

      if (cmd === 'help') {
        commandHistory = [
          ...commandHistory,
          { type: 'output', text: 'COMMANDS: ventures, revenue, skills, github, clear' }
        ];
      } else if (cmd === 'ventures') {
        commandHistory = [
          ...commandHistory,
          { type: 'output', text: 'VENTURES: Merrickson Services & Raaw Theory Media' }
        ];
      } else if (cmd === 'revenue') {
        commandHistory = [
          ...commandHistory,
          { type: 'output', text: 'REVENUE: ₹2,00,000 INR generated in 2 months (60 days).' }
        ];
      } else if (cmd === 'skills') {
        commandHistory = [
          ...commandHistory,
          { type: 'output', text: 'DOMAINS: Robotics (ROS), Deep Learning, SvelteKit, Flutter' }
        ];
      } else if (cmd === 'github') {
        window.open('https://github.com/KunjAgwl', '_blank');
        commandHistory = [...commandHistory, { type: 'output', text: 'Opening GitHub profile...' }];
      } else if (cmd === 'clear') {
        commandHistory = [];
      } else if (cmd !== '') {
        commandHistory = [
          ...commandHistory,
          { type: 'error', text: `Command not recognized: "${cmd}". Type "help"` }
        ];
      }

      inputCommand = '';
    }
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    audio.playSound('technologic');
    messageSent = true;
    setTimeout(() => {
      contactName = '';
      contactEmail = '';
      contactMessage = '';
    }, 1500);
  }
</script>

<div class="terminal-section my-6">
  <div class="flex items-center gap-2 mb-4">
    <div class="p-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400">
      <Terminal class="w-5 h-5" />
    </div>
    <div>
      <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-glow uppercase">
        CYBER TERMINAL & TRANSMISSION
      </h2>
      <p class="font-mono text-[11px] text-slate-400">DIRECT COMMUNICATOR // COMMAND LINE INTERFACE</p>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Retro CLI Window -->
    <div class="chrome-card p-4 font-mono text-[11px] flex flex-col justify-between h-64 bg-black/90 border-amber-500/20">
      <div class="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          <span class="ml-1.5 text-slate-400 text-[10px]">bash - kunj@vit-chennai:~</span>
        </div>
        <span class="text-amber-400 text-[10px]">LIVE CLI</span>
      </div>

      <!-- Output logs -->
      <div class="overflow-y-auto space-y-1.5 pr-1 flex-1">
        {#each commandHistory as line}
          {#if line.type === 'sys'}
            <div class="text-emerald-400 font-semibold">{line.text}</div>
          {:else if line.type === 'user'}
            <div class="text-amber-300">{line.text}</div>
          {:else if line.type === 'output'}
            <div class="text-slate-300 pl-2">{line.text}</div>
          {:else if line.type === 'error'}
            <div class="text-red-400">{line.text}</div>
          {/if}
        {/each}
      </div>

      <!-- Command Input line -->
      <div class="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
        <span class="text-amber-400 font-bold">kunj@vit-chennai:~$</span>
        <input 
          type="text"
          bind:value={inputCommand}
          onkeydown={executeCommand}
          placeholder="Type 'help'..."
          class="bg-transparent text-slate-200 outline-none flex-1 font-mono text-[11px]"
        />
      </div>
    </div>

    <!-- Direct Contact Form -->
    <div class="chrome-card p-4 sm:p-5 flex flex-col justify-between">
      <div>
        <h3 class="font-display text-base font-bold text-white mb-1 tracking-wide">
          TRANSMIT A DIRECT MESSAGE
        </h3>
        <p class="text-[11px] font-mono text-slate-400 mb-3">
          Collaborations, robotics/AI inquiries, or custom website/app engineering via Merrickson & Raaw Theory.
        </p>

        {#if messageSent}
          <div class="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-lg text-center space-y-2">
            <CheckCircle2 class="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 class="font-display text-sm text-emerald-300 font-bold">TRANSMISSION RECEIVED!</h4>
            <p class="font-mono text-[11px] text-slate-300">
              Message stored. Kunj will respond promptly.
            </p>
            <button 
              onclick={() => messageSent = false}
              class="led-button text-[10px] py-1 px-3 mt-1"
            >
              NEW MESSAGE
            </button>
          </div>
        {:else}
          <form onsubmit={handleContactSubmit} class="space-y-2.5">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label for="contact-name" class="block font-mono text-[10px] text-slate-400 mb-0.5">NAME</label>
                <input 
                  id="contact-name"
                  type="text" 
                  required
                  bind:value={contactName}
                  placeholder="e.g. Thomas"
                  class="w-full bg-black/50 border border-white/10 rounded p-2 text-[11px] text-slate-200 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label for="contact-email" class="block font-mono text-[10px] text-slate-400 mb-0.5">EMAIL</label>
                <input 
                  id="contact-email"
                  type="email" 
                  required
                  bind:value={contactEmail}
                  placeholder="e.g. daft@punk.com"
                  class="w-full bg-black/50 border border-white/10 rounded p-2 text-[11px] text-slate-200 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label for="contact-message" class="block font-mono text-[10px] text-slate-400 mb-0.5">MESSAGE</label>
              <textarea 
                id="contact-message"
                rows="2" 
                required
                bind:value={contactMessage}
                placeholder="Project details..."
                class="w-full bg-black/50 border border-white/10 rounded p-2 text-[11px] text-slate-200 font-mono focus:border-amber-400 focus:outline-none"
              ></textarea>
            </div>

            <button type="submit" class="led-button w-full justify-center text-[11px] py-1.5">
              <Send class="w-3.5 h-3.5" />
              <span>TRANSMIT MESSAGE</span>
            </button>
          </form>
        {/if}
      </div>

      <!-- Direct Social Channels -->
      <div class="mt-3 pt-2.5 border-t border-white/10 flex justify-between items-center font-mono text-[10px]">
        <a 
          href="https://github.com/KunjAgwl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-slate-300 hover:text-amber-400"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>github.com/KunjAgwl</span>
        </a>

        <span class="text-slate-400">VIT CHENNAI CSE</span>
      </div>
    </div>
  </div>
</div>
