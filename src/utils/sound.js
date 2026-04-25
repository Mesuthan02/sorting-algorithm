const MIN_VALUE = 20;
const MAX_VALUE = 300;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getStepValue(step, currentArray) {
  if (step.values?.length) {
    return step.values.reduce((total, value) => total + value, 0) / step.values.length;
  }

  const values = step.indices.map((index) => currentArray[index]).filter(Number.isFinite);
  if (values.length === 0) {
    return MIN_VALUE;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function createSortingSoundEngine() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return {
      resume: () => {},
      playStep: () => {},
    };
  }

  const context = new AudioContext();
  const masterGain = context.createGain();
  masterGain.gain.value = 30;
  masterGain.connect(context.destination);

  return {
    resume() {
      if (context.state === 'suspended') {
        context.resume();
      }
    },
    playStep(step, currentArray) {
      const normalized = clamp((getStepValue(step, currentArray) - MIN_VALUE) / (MAX_VALUE - MIN_VALUE), 0, 1);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      const now = context.currentTime;
      const duration = step.type === 'compare' ? 0.035 : 0.055;

      oscillator.type = step.type === 'swap' || step.type === 'overwrite' ? 'square' : 'sawtooth';
      oscillator.frequency.setValueAtTime(150 + normalized * 850, now);
      oscillator.frequency.exponentialRampToValueAtTime(120 + normalized * 720, now + duration);

      filter.type = 'bandpass';
      filter.frequency.value = 650 + normalized * 1200;
      filter.Q.value = 7;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(step.type === 'compare' ? 0.18 : 0.28, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.01);
    },
  };
}
