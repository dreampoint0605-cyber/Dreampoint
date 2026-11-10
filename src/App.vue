<script setup>
import { ref } from 'vue'
import { site, hero, features, story, promises, contact } from './content.js'
import RichText from './components/RichText.vue'
const menuOpen = ref(false)
const base = import.meta.env.BASE_URL
const icons = { chat: 'M5 5h14v10H9l-4 4V5Zm4 4h6m-6 3h4', sheet: 'M6 3h9l4 4v14H6V3Zm8 0v5h5M9 12h7m-7 4h7', bell: 'M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Zm5 3h4' }
const steps = [ ['先聊現況', '你怎麼接單、報價，最常卡在哪裡？先把問題聽清楚。'], ['從一件事開始', '一起選出最值得改善的步驟，確認範圍、費用與資料使用方式。'], ['現場試用，再調整', '接上熟悉的工具，實際核對結果，讓流程逐步用得順。'] ]
const mailSubject = ref('')
const mailBody = ref('')
function sendInquiry() { window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(mailSubject.value || '晴境工作室｜服務諮詢')}&body=${encodeURIComponent(mailBody.value)}` }
</script>

<template>
  <a class="skip-link" href="#main">跳至主要內容</a>
  <header class="site-header">
    <div class="wrap nav-inner">
      <a class="brand" href="#home" aria-label="晴境工作室首頁"><img :src="base + 'logo-mark.svg'" width="46" height="46" alt="" /><span><strong>{{ site.name }}</strong><small>DREAMIFY STUDIO</small></span></a>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="main-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? '關閉 ✕' : '選單 ☰' }}</button>
      <nav id="main-nav" :class="{ open: menuOpen }" aria-label="主選單" @click="menuOpen = false"><a href="#services">我們能幫什麼</a><a href="#story">認識晴境</a><a href="#approach">如何開始</a><a class="nav-cta" href="#contact">聊聊你的需求 <span>↗</span></a></nav>
    </div>
  </header>
  <main id="main">
    <section id="home" class="hero-section">
      <div class="wrap hero-grid">
        <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> 彰化花壇・為在地中小企業而做</p><h1>把繁瑣交給 AI，<br />把時間留給<span class="underline">生意。</span></h1><p class="hero-lead">{{ hero.lead }}</p><div class="hero-actions"><a class="button primary" href="#contact">免費聊聊接單流程 <span>↗</span></a><a class="text-link" href="#services">看看能幫上什麼忙 <span>↓</span></a></div><p class="hero-footnote">熟悉的 LINE 與 Excel，繼續用。<br class="mobile-break" />工程師協助串接，重要的事由人確認。</p></div>
        <div class="work-scene" aria-label="訂單整理流程示意：LINE 訊息、AI 協助整理、人工核對與交期提醒">
          <div class="scene-label"><span>讓 AI，配合人。</span><small>日常工作，可以更從容</small></div>
          <div class="arch-window"><div class="sun"></div><div class="landscape hill-one"></div><div class="landscape hill-two"></div><div class="window-line"></div></div>
          <div class="sample-card message-card"><div class="sample-top"><span class="line-icon">L</span><strong>客戶的 LINE 訊息</strong><small>示意</small></div><p>這次要 A 零件 200 個，<br />下週五前方便出貨嗎？</p><span class="message-time">每天熟悉的接單方式</span></div>
          <div class="sample-card order-card"><div class="sample-top"><span class="mini-sun">✳</span><strong>AI 協助整理</strong><span class="review-tag">待人工確認</span></div><div class="order-row"><span>品項</span><strong>A 零件</strong></div><div class="order-row"><span>數量</span><strong>200 個</strong></div><div class="order-row"><span>交期</span><strong>下週五前 <small>需確認日期</small></strong></div><div class="order-footer"><span>✓ 訊息整理成草稿</span><span>↗</span></div></div>
          <div class="reminder-pill"><span>◷</span> 交期提前提醒，多一分準備</div><p class="scene-caption">流程示意・實際功能依需求規劃</p>
        </div>
      </div>
      <div class="wrap hero-bottom"><span>少一點重複抄寫，<br />多一點心裡踏實。</span><div><span>01 / 訂單整理</span><span>02 / 報價協作</span><span>03 / 交期提醒</span></div><a href="#services" aria-label="向下了解服務">↓</a></div>
    </section>
    <section id="services" class="section services-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">01 — 晴境能幫上的忙</p><h2>工具不用陌生，<br />工作可以<span class="green-text">輕鬆一點。</span></h2></div><p class="section-intro">從每天反覆做的小事開始，<br />讓訊息有條理，讓重要的事有提醒。</p></div><div class="service-grid"><article v-for="(item, i) in features.items" :key="item.icon" class="service-card"><div class="service-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.icon]" /></svg><span>0{{ i + 1 }}</span></div><h3>{{ item.title }}</h3><p>{{ item.body }}</p><div class="service-example">{{ ['訊息 → 訂單草稿', '價目表 → 報價草稿', '交期記錄 → 提前通知'][i] }} <span>↗</span></div></article></div><p class="service-note"><span>✳</span>{{ features.note }}</p></div></section>
    <section id="story" class="section story-section"><div class="wrap story-layout"><div class="story-intro"><p class="eyebrow">02 — 從花壇出發</p><h2>寫了十年系統，<br />想把事情<br /><span class="green-text">做得更貼近人。</span></h2><div class="founder-art"><div class="founder-emblem"><img :src="base + 'logo-mark.svg'" alt="晴境窗景標誌" /></div><p>技術，是方法。<br />讓人放心，才是目的。</p><span>黄昱啓 / 晴境工作室負責人</span></div></div><div class="story-chapters"><article v-for="(chapter, i) in story.chapters" :key="chapter.title" class="chapter"><span class="chapter-number">0{{ i + 1 }}</span><div><h3>{{ chapter.title }}</h3><p><RichText :text="chapter.body" /></p></div></article></div></div></section>
    <section id="approach" class="section approach-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">03 — 一起把流程理順</p><h2>不用一次改變所有事。<br /><span class="green-text">先解決一件掛心的事。</span></h2></div><a href="#contact" class="text-link">從免費諮詢開始 ↗</a></div><div class="steps"><article v-for="(step,i) in steps" :key="step[0]"><span class="step-number">0{{ i+1 }}</span><h3>{{ step[0] }}</h3><p>{{ step[1] }}</p></article></div></div></section>
    <section class="promise-section"><div class="wrap promise-layout"><div><p class="eyebrow">我們的承諾</p><h2>說清楚，<br />也踏實做好。</h2><p class="promise-signature">這是工程師的本分。</p></div><div class="promise-list"><article v-for="item in promises.items" :key="item.tag"><span>{{ item.tag }}</span><div><h3>{{ item.title }}</h3><p>{{ item.body }}</p></div><b aria-hidden="true">↗</b></article></div></div></section>
    <section id="contact" class="section contact-section"><div class="wrap contact-layout"><div><p class="eyebrow">04 — 下一步，先聊聊</p><h2>每天哪件事，<br />最讓你<span class="green-text">掛心？</span></h2><p class="contact-lead">{{ contact.lead }}</p><a class="button primary" :href="'tel:' + contact.phone.replace(/[^\d+]/g, '')">打電話聊聊 <span>↗</span></a><div class="contact-person"><strong>{{ contact.person }}</strong><span>{{ contact.role }} · {{ site.location }}</span></div><a class="contact-detail" :href="'tel:' + contact.phone.replace(/[^\d+]/g, '')"><span>電話</span>{{ contact.phone }} ↗</a><a class="contact-detail" :href="'mailto:' + contact.email"><span>Email</span>{{ contact.email }} ↗</a><a v-if="!contact.line.startsWith('[')" class="contact-detail" :href="'https://line.me/R/ti/p/' + encodeURIComponent(contact.line)"><span>LINE</span>{{ contact.line }} ↗</a></div><form class="inquiry-form" @submit.prevent="sendInquiry"><p class="form-kicker">也可以，先留幾句話。</p><h3>說說你想改善的地方</h3><label for="inquiry-subject">想聊什麼？</label><input id="inquiry-subject" v-model="mailSubject" placeholder="例如：整理 LINE 訂單" maxlength="150" /><label for="inquiry-message">目前遇到的情況</label><textarea id="inquiry-message" v-model="mailBody" required rows="5" placeholder="簡單描述現在怎麼做、哪個地方最費時間。" maxlength="3000"></textarea><button class="button primary" type="submit">用 Email 聯絡晴境 <span>↗</span></button><p class="form-note">按下後將開啟你的郵件 App，確認內容後再寄出。</p></form></div></section>
  </main>
  <footer class="site-footer"><div class="wrap footer-top"><a class="brand" href="#home"><img :src="base + 'logo-mark.svg'" width="46" height="46" alt="" /><span><strong>{{ site.name }}</strong><small>DREAMIFY STUDIO</small></span></a><p>讓 AI，配合人。</p><a href="#home">回到頂端 ↑</a></div><div class="wrap footer-bottom"><span>© {{ new Date().getFullYear() }} Dreamify Studio 晴境工作室</span><span>從彰化花壇，陪你把日常理順。</span></div></footer>
  <a class="mobile-contact" :href="'tel:' + contact.phone.replace(/[^\d+]/g, '')">免費聊聊你的需求 <span>↗</span></a>
</template>
