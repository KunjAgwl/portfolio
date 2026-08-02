// Web Audio API Synthesizer Engine for Daft Punk Soundboard & Beat Generator
// Zero external audio assets required - fully procedural synthesis

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingBeat = false;
    this.beatTimer = null;
    this.currentTempo = 120; // 120 BPM synthwave pulse
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play custom synthesized sound preset
  playSound(type) {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'harder':
        this.playVocoderTone(440, 0.4, 'sawtooth'); // A4 synth punch
        break;
      case 'better':
        this.playVocoderTone(554.37, 0.4, 'sawtooth'); // C#5 synth punch
        break;
      case 'faster':
        this.playVocoderTone(659.25, 0.4, 'sawtooth'); // E5 synth punch
        break;
      case 'stronger':
        this.playVocoderTone(880, 0.5, 'sawtooth'); // A5 high punch
        break;
      case 'robot':
        this.playRobotVocal(220, 0.6); // Robot voice effect
        break;
      case 'human':
        this.playFilterSweep(330, 0.5); // Warm human synth sweep
        break;
      case 'technologic':
        this.playArpSequence(); // Rapid 4-note synth arpeggio
        break;
      case 'around_world':
        this.playFunkBassline(); // Disco synth bassline snippet
        break;
      case 'kick':
        this.playKick();
        break;
      case 'snare':
        this.playSnare();
        break;
      case 'laser':
        this.playLaser();
        break;
      default:
        this.playVocoderTone(500, 0.3, 'sine');
    }
  }

  // Vocoder-style synth note with quick attack/decay
  playVocoderTone(freq, duration, type = 'sawtooth') {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Dynamic lowpass filter for classic synth grit
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Robot Vocoder vocal effect using ring modulation
  playRobotVocal(freq, duration) {
    const carrier = this.ctx.createOscillator();
    const modulator = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const mainGain = this.ctx.createGain();

    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(freq, this.ctx.currentTime);

    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(60, this.ctx.currentTime); // 60Hz robot buzz

    modGain.gain.setValueAtTime(200, this.ctx.currentTime);
    modulator.connect(carrier.frequency);

    mainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    mainGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    carrier.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    modulator.start();
    carrier.start();
    modulator.stop(this.ctx.currentTime + duration);
    carrier.stop(this.ctx.currentTime + duration);
  }

  // Filter sweep synth sound
  playFilterSweep(startFreq, duration) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4500, this.ctx.currentTime + duration * 0.7);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Technologic rapid arpeggio
  playArpSequence() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playVocoderTone(freq, 0.15, 'sawtooth');
      }, idx * 100);
    });
  }

  // Disco synth bassline
  playFunkBassline() {
    const bassNotes = [110, 110, 146.83, 130.81, 164.81];
    bassNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playVocoderTone(freq, 0.18, 'triangle');
      }, idx * 140);
    });
  }

  // Laser zap sound effect
  playLaser() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Punchy Kick Drum synthesis
  playKick() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Snare Drum synthesis using white noise & bandpass filter
  playSnare() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Toggle Mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const audio = new SoundEngine();
