<script setup>
import { hero } from '../content.js'
</script>

<template>
  <section id="top" class="hero">
    <div class="sky" aria-hidden="true">
      <div class="sun" />
      <div class="cloud c1" />
      <div class="cloud c2" />
    </div>

    <div class="container inner">
      <p class="eyebrow">{{ hero.eyebrow }}</p>
      <h1 class="title">
        <span v-for="line in hero.title" :key="line">{{ line }}</span>
      </h1>
      <p class="lead">{{ hero.lead }}</p>
      <div class="actions">
        <a href="#contact" class="btn btn-primary">{{ hero.primaryCta }}</a>
        <a href="#features" class="btn btn-ghost">{{ hero.secondaryCta }}</a>
      </div>
    </div>

    <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 C 360 90 1080 -10 1440 40 L1440 80 L0 80 Z" fill="var(--paper)" />
    </svg>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 120px 0 140px;
  color: var(--white);
  background: linear-gradient(160deg, var(--sky-900) 0%, var(--sky-700) 55%, var(--sky-500) 100%);
  overflow: hidden;
}

.sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sun {
  position: absolute;
  top: 14%;
  right: 10%;
  width: clamp(160px, 26vw, 340px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe08a 0%, var(--sun-300) 45%, rgba(246, 196, 83, 0) 70%);
  opacity: 0.85;
  animation: glow 6s ease-in-out infinite;
}

.cloud {
  position: absolute;
  height: 60px;
  border-radius: 60px;
  background: rgba(255, 255, 255, 0.14);
  filter: blur(2px);
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: inherit;
}

.c1 {
  width: 220px;
  top: 34%;
  right: 22%;
  animation: drift 18s ease-in-out infinite alternate;
}
.c1::before { width: 90px; height: 90px; top: -40px; left: 40px; }
.c1::after { width: 70px; height: 70px; top: -26px; left: 110px; }

.c2 {
  width: 160px;
  top: 62%;
  right: 6%;
  animation: drift 22s ease-in-out infinite alternate-reverse;
}
.c2::before { width: 70px; height: 70px; top: -30px; left: 30px; }

.inner {
  position: relative;
  max-width: 1120px;
}

.eyebrow {
  display: inline-block;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  margin-bottom: 28px;
}

.title {
  font-size: clamp(2.8rem, 8vw, 5.2rem);
  line-height: 1.2;
  letter-spacing: 0.06em;
  margin-bottom: 28px;
}

.title span {
  display: block;
}

.title span:last-child {
  color: var(--sun-300);
}

.lead {
  max-width: 560px;
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  opacity: 0.92;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 80px;
}

@keyframes glow {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.06); opacity: 0.95; }
}

@keyframes drift {
  from { transform: translateX(0); }
  to { transform: translateX(-60px); }
}

@media (prefers-reduced-motion: reduce) {
  .sun, .cloud { animation: none; }
}

@media (max-width: 720px) {
  .sun { top: 8%; right: -10%; opacity: 0.5; }
  .cloud { display: none; }
}
</style>
