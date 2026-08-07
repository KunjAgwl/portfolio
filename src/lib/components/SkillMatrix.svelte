<script>
  import { audio } from '../audio.js';

  let { theme = 'gold' } = $props();

  let activeDomain = $state('robotics');

  const domains = {
    robotics: {
      name: 'ROBOTICS & ROS2',
      badge: 'HARDWARE & KINEMATICS',
      code: `// ROS2 Manipulator Node (MoveIt Inverse Kinematics)
#include <rclcpp/rclcpp.hpp>
#include <moveit/move_group_interface/move_group_interface.h>

void executeGrasp(moveit::planning_interface::MoveGroupInterface& group) {
  geometry_msgs::msg::Pose target_pose;
  target_pose.position.x = 0.45; target_pose.position.y = 0.02; target_pose.position.z = 0.28;
  group.setPoseTarget(target_pose);
  group.move(); // Execute autonomous trajectory
}`
    },
    aiml: {
      name: 'AI / DEEP LEARNING',
      badge: 'PYTORCH & COMPUTER VISION',
      code: `# PyTorch Vision Telemetry & Target Extraction
import torch
import torch.nn as nn

class SpatialTelemetryCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )
    def forward(self, x): return self.conv(x)`
    },
    web: {
      name: 'WEB DEVELOPMENT',
      badge: 'SVELTEKIT & VANILLA CSS',
      code: `// SvelteKit 5 Runes Controller
let activeNote = $state('C4');
let volume = $state(0.8);
let synthActive = $derived(volume > 0);
function playNote(freq) { audioContext.triggerTone(freq); }`
    },
    app: {
      name: 'APP DEVELOPMENT',
      badge: 'FLUTTER & DART',
      code: `// Flutter Telemetry & State Management
class RoboticsDashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<SensorTelemetry>(
      stream: telemetryChannel.stream,
      builder: (context, snapshot) => TelemetryMeter(snapshot.data),
    );
  }
}`
    }
  };

  function selectDomain(key) {
    audio.playSound('technologic');
    activeDomain = key;
  }
</script>

<div class="retro-sub-box font-mono my-2 p-3">
  <div class="sub-box-header">
    <span class="text-amber font-bold text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-green-bright animate-ping"></span>
      <span>DOMAIN & CODE MATRIX</span>
    </span>
    <span class="text-muted text-[10px]">↗</span>
  </div>

  <!-- Domain Tab Switcher -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
    <button
      onclick={() => selectDomain('robotics')}
      class="py-1 px-2 rounded text-[11px] font-mono font-bold transition-all cursor-pointer text-left"
      class:bg-[#cbb299]={activeDomain === 'robotics'}
      class:text-black={activeDomain === 'robotics'}
      class:text-amber={activeDomain !== 'robotics'}
      class:border={activeDomain !== 'robotics'}
      class:border-amber={activeDomain !== 'robotics'}
    >
      ROBOTICS
    </button>

    <button
      onclick={() => selectDomain('aiml')}
      class="py-1 px-2 rounded text-[11px] font-mono font-bold transition-all cursor-pointer text-left"
      class:bg-[#cbb299]={activeDomain === 'aiml'}
      class:text-black={activeDomain === 'aiml'}
      class:text-amber={activeDomain !== 'aiml'}
      class:border={activeDomain !== 'aiml'}
      class:border-amber={activeDomain !== 'aiml'}
    >
      AI / ML
    </button>

    <button
      onclick={() => selectDomain('web')}
      class="py-1 px-2 rounded text-[11px] font-mono font-bold transition-all cursor-pointer text-left"
      class:bg-[#cbb299]={activeDomain === 'web'}
      class:text-black={activeDomain === 'web'}
      class:text-amber={activeDomain !== 'web'}
      class:border={activeDomain !== 'web'}
      class:border-amber={activeDomain !== 'web'}
    >
      WEB DEV
    </button>

    <button
      onclick={() => selectDomain('app')}
      class="py-1 px-2 rounded text-[11px] font-mono font-bold transition-all cursor-pointer text-left"
      class:bg-[#cbb299]={activeDomain === 'app'}
      class:text-black={activeDomain === 'app'}
      class:text-amber={activeDomain !== 'app'}
      class:border={activeDomain !== 'app'}
      class:border-amber={activeDomain !== 'app'}
    >
      APP DEV
    </button>
  </div>

  <!-- Terminal Snippet Viewer -->
  <div class="bg-black p-3 rounded border border-[var(--border-amber-dark)] font-mono text-xs">
    <div class="flex justify-between items-center text-[10px] border-b border-[var(--border-amber-dark)] pb-1 mb-2">
      <span class="text-green-bright font-bold">{domains[activeDomain].name}</span>
      <span class="text-amber">{domains[activeDomain].badge}</span>
    </div>

    <pre class="text-amber/90 overflow-x-auto text-[11px] leading-relaxed select-text p-1"><code>{domains[activeDomain].code}</code></pre>
  </div>
</div>
