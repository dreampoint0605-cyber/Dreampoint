<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StorySection from './components/StorySection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import PromiseSection from './components/PromiseSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ChatWidget from './components/ChatWidget.vue'
import { integrations } from './config/integrations.js'
import { useReveal } from './composables/useReveal.js'

useReveal()
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <FeaturesSection />
    <StorySection />
    <PromiseSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <ChatWidget v-if="integrations.chat.enabled" />
</template>
