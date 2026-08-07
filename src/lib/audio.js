// Web Audio API Synthesizer Engine for Daft Punk Soundboard & Beat Generator
// Zero external audio assets required - fully procedural synthesis

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingBeat = false;
    this.beatTimer = null;
    this.step = 0;
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

  // Play continuous synthwave beat loop
  startBeat() {
    this.init();
    if (this.isPlayingBeat) return;
    this.isPlayingBeat = true;
    this.step = 0;

    this.beatTimer = setInterval(() => {
      if (!this.isPlayingBeat || this.isMuted) return;

      // Step 0, 4, 8, 12: Kick drum
      if (this.step % 4 === 0) {
        this.playKick();
      }
      // Step 4, 12: Snare drum
      if (this.step % 8 === 4) {
        this.playSnare();
      }
      // Arpeggio synth tone on every step
      const arpFreqs = [220, 277.18, 329.63, 440, 554.37, 659.25, 440, 329.63];
      const freq = arpFreqs[this.step % arpFreqs.length];
      this.playVocoderTone(freq, 0.12, 'sawtooth');

      this.step = (this.step + 1) % 16;
    }, 150); // ~100 BPM synth beat
  }

  stopBeat() {
    this.isPlayingBeat = false;
    if (this.beatTimer) {
      clearInterval(this.beatTimer);
      this.beatTimer = null;
    }
  }

  playSound(type) {
    this.init();
    if (this.isMuted || !this.ctx) return;

    switch (type) {
      case 'harder':
        this.playVocoderTone(440, 0.4, 'sawtooth');
        break;
      case 'better':
        this.playVocoderTone(554.37, 0.4, 'sawtooth');
        break;
      case 'faster':
        this.playVocoderTone(659.25, 0.4, 'sawtooth');
        break;
      case 'stronger':
        this.playVocoderTone(880, 0.5, 'sawtooth');
        break;
      case 'robot':
        this.playRobotVocal(220, 0.6);
        break;
      case 'human':
        this.playFilterSweep(330, 0.5);
        break;
      case 'technologic':
        this.playArpSequence();
        break;
      case 'around_world':
        this.playFunkBassline();
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

  playVocoderTone(freq, duration, type = 'sawtooth') {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playRobotVocal(freq, duration) {
    if (!this.ctx) return;
    const carrier = this.ctx.createOscillator();
    const modulator = this.ctx.createOscillator();
    const mainGain = this.ctx.createGain();

    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(freq, this.ctx.currentTime);

    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(60, this.ctx.currentTime);

    modulator.connect(carrier.frequency);

    mainGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    mainGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    carrier.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    modulator.start();
    carrier.start();
    modulator.stop(this.ctx.currentTime + duration);
    carrier.stop(this.ctx.currentTime + duration);
  }

  playFilterSweep(startFreq, duration) {
    if (!this.ctx) return;
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

  playArpSequence() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playVocoderTone(freq, 0.15, 'sawtooth');
      }, idx * 100);
    });
  }

  playFunkBassline() {
    const bassNotes = [110, 110, 146.83, 130.81, 164.81];
    bassNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) this.playVocoderTone(freq, 0.18, 'triangle');
      }, idx * 140);
    });
  }

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

  playKick() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playSnare() {
    this.init();
    if (this.isMuted || !this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.15;
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
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stopBeat();
    return this.isMuted;
  }
}

export const audio = new SoundEngine();
