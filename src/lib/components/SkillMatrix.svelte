<script>
  import { Bot, BrainCircuit, Code, Smartphone, Cpu } from '@lucide/svelte';
  let { theme = 'gold' } = $props();

  let activeDomain = $state('ROBOTICS');

  const domains = {
    ROBOTICS: {
      title: 'ROBOTICS & EMBEDDED CONTROL',
      icon: Bot,
      color: '#ffd700',
      description: 'Hardware control, autonomous navigation, microcontrollers, ROS2 nodes & LIDAR sensor fusion.',
      code: `// ROS2 Node - Autonomous Obstacle Avoidance
#include "rclcpp/rclcpp.hpp"
#include "sensor_msgs/msg/laser_scan.hpp"

class CyberBotNavigator : public rclcpp::Node {
  public: CyberBotNavigator() : Node("cyber_bot_navigator") {
    sub_ = this->create_subscription<sensor_msgs::msg::LaserScan>(
      "/scan", 10, std::bind(&CyberBotNavigator::scanCallback, this, _1));
  }
};`,
      skills: [
        { name: 'ROS / ROS2', level: 90 },
        { name: 'Autonomous SLAM Navigation', level: 85 },
        { name: 'Microcontrollers (ESP32/Arduino/Raspberry Pi)', level: 92 },
        { name: 'LIDAR & Sensor Fusion', level: 84 }
      ]
    },
    AI_ML: {
      title: 'MACHINE LEARNING & DEEP LEARNING',
      icon: BrainCircuit,
      color: '#00f0ff',
      description: 'Neural network architectures, computer vision, PyTorch/TensorFlow models & NLP pipelines.',
      code: `# PyTorch Deep Neural Vision Model
import torch
import torch.nn as nn

class VisionNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )
    def forward(self, x):
        return self.conv(x)`,
      skills: [
        { name: 'PyTorch & TensorFlow', level: 88 },
        { name: 'Computer Vision (OpenCV / YOLO)', level: 90 },
        { name: 'Deep Neural Networks (CNNs/RNNs/Transformers)', level: 85 },
        { name: 'Model Optimization & Inference', level: 84 }
      ]
    },
    WEB: {
      title: 'FULL STACK WEB DEVELOPMENT',
      icon: Code,
      color: '#ff0055',
      description: 'Modern reactive web apps, responsive design systems, Web Audio API & REST microservices.',
      code: `// SvelteKit Web Audio Synthesizer Engine
export class SynthEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  playTone(freq = 440) {
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.connect(this.ctx.destination);
    osc.start();
  }
}`,
      skills: [
        { name: 'SvelteKit / Svelte 5', level: 95 },
        { name: 'JavaScript / Node.js', level: 92 },
        { name: 'Vanilla CSS & Modern UI Architecture', level: 96 },
        { name: 'REST APIs & Web Audio API', level: 90 }
      ]
    },
    APP: {
      title: 'MOBILE APP DEVELOPMENT',
      icon: Smartphone,
      color: '#00ff66',
      description: 'Cross-platform mobile applications, tactile state management, offline sync & native device APIs.',
      code: `// Flutter Mobile UI Controller
import 'package:flutter/material.dart';

class CyberAppController extends StatefulWidget {
  @override
  _CyberAppControllerState createState() => _CyberAppControllerState();
}
class _CyberAppControllerState extends State<CyberAppController> {
  // Client state & hardware sync
}`,
      skills: [
        { name: 'Flutter / React Native', level: 86 },
        { name: 'Mobile UI/UX Architecture', level: 88 },
        { name: 'Client Local Storage & Sync', level: 85 },
        { name: 'Native Device Hardware Integration', level: 82 }
      ]
    }
  };

  let curr = $derived(domains[activeDomain]);
</script>

<div class="skills-section my-6">
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-2">
      <div class="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
        <Cpu class="w-5 h-5" />
      </div>
      <div>
        <h2 class="font-display text-xl sm:text-2xl font-bold tracking-wide text-silver-gradient uppercase">
          03 // DOMAIN & CODE MATRIX
        </h2>
        <p class="font-mono text-[11px] text-slate-400">INTERACTIVE SKILLS & TELEMETRY SNIPPETS</p>
      </div>
    </div>

    <!-- Domain Switcher -->
    <div class="flex flex-wrap gap-1">
      <button 
        onclick={() => activeDomain = 'ROBOTICS'}
        class="px-2.5 py-1 rounded font-mono text-[10px] uppercase border transition-all"
        class:bg-amber-400={activeDomain === 'ROBOTICS'}
        class:text-black={activeDomain === 'ROBOTICS'}
        class:border-amber-400={activeDomain === 'ROBOTICS'}
        class:border-white-10={activeDomain !== 'ROBOTICS'}
        class:text-slate-400={activeDomain !== 'ROBOTICS'}
      >
        ROBOTICS
      </button>

      <button 
        onclick={() => activeDomain = 'AI_ML'}
        class="px-2.5 py-1 rounded font-mono text-[10px] uppercase border transition-all"
        class:bg-cyan-400={activeDomain === 'AI_ML'}
        class:text-black={activeDomain === 'AI_ML'}
        class:border-cyan-400={activeDomain === 'AI_ML'}
        class:border-white-10={activeDomain !== 'AI_ML'}
        class:text-slate-400={activeDomain !== 'AI_ML'}
      >
        AI / ML
      </button>

      <button 
        onclick={() => activeDomain = 'WEB'}
        class="px-2.5 py-1 rounded font-mono text-[10px] uppercase border transition-all"
        class:bg-pink-500={activeDomain === 'WEB'}
        class:text-white={activeDomain === 'WEB'}
        class:border-pink-500={activeDomain === 'WEB'}
        class:border-white-10={activeDomain !== 'WEB'}
        class:text-slate-400={activeDomain !== 'WEB'}
      >
        WEB
      </button>

      <button 
        onclick={() => activeDomain = 'APP'}
        class="px-2.5 py-1 rounded font-mono text-[10px] uppercase border transition-all"
        class:bg-emerald-400={activeDomain === 'APP'}
        class:text-black={activeDomain === 'APP'}
        class:border-emerald-400={activeDomain === 'APP'}
        class:border-white-10={activeDomain !== 'APP'}
        class:text-slate-400={activeDomain !== 'APP'}
      >
        APP
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Domain Overview & Skill Bars -->
    <div class="chrome-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2.5 mb-2">
          <div class="p-2 rounded-lg bg-black/40 border" style="border-color: {curr.color}; color: {curr.color}">
            <curr.icon class="w-6 h-6" />
          </div>
          <h3 class="font-display text-lg font-bold text-white tracking-wide">
            {curr.title}
          </h3>
        </div>

        <p class="text-xs text-slate-300 font-mono mb-4 leading-relaxed">
          {curr.description}
        </p>

        <div class="space-y-3">
          {#each curr.skills as skill}
            <div>
              <div class="flex justify-between text-[11px] font-mono mb-1">
                <span class="text-slate-200">{skill.name}</span>
                <span style="color: {curr.color}">{skill.level}% SIGNAL</span>
              </div>
              <div class="w-full h-1.5 rounded-full bg-black/60 border border-white/5 overflow-hidden p-0.5">
                <div 
                  class="h-full rounded-full transition-all duration-700"
                  style="width: {skill.level}%; background-color: {curr.color}; box-shadow: 0 0 8px {curr.color};"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[10px] text-slate-400">
        <span>VIT CHENNAI // CSE</span>
        <span style="color: {curr.color}">TELEMETRY: OPERATIONAL</span>
      </div>
    </div>

    <!-- Live Code Terminal Snippet -->
    <div class="chrome-card p-4 font-mono text-xs bg-black/90 flex flex-col justify-between border-white/10">
      <div class="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          <span class="ml-2 text-slate-400 text-[10px]">code_snippet // {activeDomain}.ts</span>
        </div>
        <span class="text-[10px] text-slate-400">RAW FILE</span>
      </div>

      <pre class="overflow-x-auto text-[11px] text-emerald-400 leading-relaxed font-mono whitespace-pre-wrap p-2 bg-black/60 rounded border border-white/5">
        <code>{curr.code}</code>
      </pre>

      <div class="mt-3 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400">
        <span>[ CODE AUTHOR: KUNJ AGARWAL ]</span>
        <span class="text-amber-400">READY</span>
      </div>
    </div>
  </div>
</div>
