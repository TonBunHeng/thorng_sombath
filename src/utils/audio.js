/**
 * Audio manager for sound effects & background music
 * Uses Web Audio API for synthetic sound effects & fallbacks
 */

let audioCtx = null;
let masterGain = null;
let musicAudio = null;
let synthNodes = null;
let isMusicPlaying = false;

function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.8;
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, startTime, duration = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playSfx(type) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  if (type === "paper") {
    // White noise with bandpass for paper rustling
    const bufferSize = ctx.sampleRate * 0.45;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2400;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.value = 0.12;
    source.connect(filter).connect(gain).connect(masterGain);
    source.start(now);
  } else if (type === "chime") {
    playTone(659.25, now + 0.05, 0.4);
    playTone(783.99, now + 0.22, 0.4);
    playTone(1046.5, now + 0.40, 0.6);
  } else if (type === "drop") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain).connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }
}

function startAmbientSynth() {
  const ctx = getAudioContext();
  if (!ctx) return null;

  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(masterGain);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;
  filter.connect(gain);

  const baseFreqs = [130.81, 196, 261.63];
  const oscs = baseFreqs.map(f => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(filter);
    o.start();
    return o;
  });

  gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 3);

  const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  let timerId = null;

  const playChime = () => {
    const t = ctx.currentTime + 0.05;
    const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    const chOsc = ctx.createOscillator();
    const chGain = ctx.createGain();
    chOsc.type = "sine";
    chOsc.frequency.value = note;
    chGain.gain.setValueAtTime(0.001, t);
    chGain.gain.exponentialRampToValueAtTime(0.02, t + 0.1);
    chGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
    chOsc.connect(chGain).connect(masterGain);
    chOsc.start(t);
    chOsc.stop(t + 2.6);
    timerId = setTimeout(playChime, 2500 + Math.random() * 3500);
  };
  timerId = setTimeout(playChime, 1500);

  return {
    stop: () => {
      clearTimeout(timerId);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setTimeout(() => {
        oscs.forEach(o => {
          try { o.stop(); } catch {}
        });
      }, 1000);
    }
  };
}

async function checkAudioFile(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function toggleMusic(playDesired, musicUrl = "/audio/music.mp3") {
  getAudioContext();
  isMusicPlaying = playDesired;

  if (playDesired) {
    const hasAudio = await checkAudioFile(musicUrl);
    if (hasAudio) {
      if (!musicAudio) {
        musicAudio = new Audio(musicUrl);
        musicAudio.loop = true;
        musicAudio.volume = 0;
      }
      musicAudio.play().catch(() => {});
      fadeAudio(musicAudio, 0.55);
    } else {
      if (!synthNodes) {
        synthNodes = startAmbientSynth();
      }
    }
  } else {
    if (musicAudio) {
      fadeAudio(musicAudio, 0, () => musicAudio.pause());
    }
    if (synthNodes) {
      synthNodes.stop();
      synthNodes = null;
    }
  }

  return isMusicPlaying;
}

function fadeAudio(audio, targetVolume, onDone) {
  const startVolume = audio.volume;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / 1200);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (onDone) {
      onDone();
    }
  };
  requestAnimationFrame(step);
}

export function getIsMusicPlaying() {
  return isMusicPlaying;
}
