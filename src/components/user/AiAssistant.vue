<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import aiService from '@/services/aiService';

const isOpen = ref(false);
const messageInput = ref('');
const isTyping = ref(false);
const chatMessages = ref([]);
const messageListRef = ref(null);
const sliderRefs = ref({});

const suggestedQuestions = [
  "Best iPhone 15 cases",
  "Gaming accessories under $50",
  "Fast charging cables",
];

const scrollSlider = (id, direction) => {
  const container = sliderRefs.value[id];
  if (container) {
    const scrollAmount = 150; // Width of one card + gap
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && chatMessages.value.length === 0) {
    sendInitialMessage();
  }
};

const formatMessage = (text) => {
  if (!text) return '';
  // Basic markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
};

const sendInitialMessage = () => {
  isTyping.value = true;
  setTimeout(() => {
    chatMessages.value.push({
      id: Date.now(),
      sender: 'ai',
      text: "Hi 👋 I'm **AI CaseStore**. I can help you find products, compare products, and answer questions.",
      timestamp: new Date()
    });
    isTyping.value = false;
    scrollToBottom();
  }, 1000);
};

const handleSendMessage = async () => {
  if (!messageInput.value.trim() || isTyping.value) return;

  const userMessage = messageInput.value;
  chatMessages.value.push({
    id: Date.now(),
    sender: 'user',
    text: userMessage,
    timestamp: new Date()
  });

  messageInput.value = '';
  scrollToBottom();

  // Call AI API
  isTyping.value = true;
  try {
    const response = await aiService.chat(userMessage);
    
    chatMessages.value.push({
      id: Date.now() + 1,
      sender: 'ai',
      text: response.message || "I'm sorry, I couldn't process that.",
      products: response.products || [],
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    chatMessages.value.push({
      id: Date.now() + 1,
      sender: 'ai',
      text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
      timestamp: new Date()
    });
  } finally {
    isTyping.value = false;
    scrollToBottom();
  }
};

const selectSuggestion = (question) => {
  messageInput.value = question;
  handleSendMessage();
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTo({
        top: messageListRef.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
  }
});

</script>

<template>
  <div class="ai-assistant-wrapper">
    <!-- Floating Button -->
    <button 
      class="ai-floating-button" 
      :class="{ 'is-active': isOpen }"
      @click="toggleChat"
      aria-label="Toggle AI Assistant"
    >
      <div class="orb-background"></div>
      <div class="sparkles-container">
        <span class="sparkle s1"></span>
        <span class="sparkle s2"></span>
        <span class="sparkle s3"></span>
      </div>
      <div class="icon-container">
        <svg v-if="!isOpen" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ai-icon">
          <path d="M12 2L14.85 8.15L21 11L14.85 13.85L12 20L9.15 13.85L3 11L9.15 8.15L12 2Z" fill="currentColor" />
          <circle cx="12" cy="11" r="3" fill="rgba(255,255,255,0.3)" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="close-icon">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div class="button-glow"></div>
    </button>

    <!-- Chat Panel -->
    <Transition name="panel-slide">
      <div v-if="isOpen" class="ai-chat-panel">
        <!-- Header -->
        <header class="chat-header">
          <div class="header-content">
            <div class="ai-avatar">
              <div class="orb-mini"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.85 8.15L21 11L14.85 13.85L12 20L9.15 13.85L3 11L9.15 8.15L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <div class="header-text">
              <h3 class="header-title">AI Shopping Assistant</h3>
              <span class="header-subtitle">Ask me anything about products</span>
            </div>
          </div>
          <button class="close-panel" @click="toggleChat" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-sm">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <!-- Messages Area -->
        <div class="chat-messages" ref="messageListRef">
          <div v-for="msg in chatMessages" :key="msg.id" :class="['message-wrapper', msg.sender]">
            <div class="message-bubble-group">
              <div class="message-bubble shadow-sm">
                <div class="message-text" v-html="formatMessage(msg.text)"></div>
              </div>
              
              <!-- Product Recommendations Slider -->
              <div v-if="msg.products && msg.products.length > 0" class="product-slider-wrapper">
                <button 
                  class="slider-btn prev" 
                  @click="scrollSlider(msg.id, 'left')"
                  aria-label="Previous"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <div 
                  class="product-cards-container" 
                  :ref="el => { if (el) sliderRefs[msg.id] = el }"
                >
                  <router-link 
                    v-for="product in msg.products" 
                    :key="product.id" 
                    :to="`/product-details/${product.id}`"
                    class="product-mini-card"
                  >
                    <img :src="product.image || '/src/assets/user/img/product/1.jpg'" :alt="product.name" />
                    <div class="product-info">
                      <span class="name">{{ product.name }}</span>
                      <span class="price">${{ product.price }}</span>
                    </div>
                  </router-link>
                </div>

                <button 
                  class="slider-btn next" 
                  @click="scrollSlider(msg.id, 'right')"
                  aria-label="Next"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message-wrapper ai">
            <div class="message-bubble typing">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>

          <!-- Suggestions -->
          <div v-if="chatMessages.length <= 1 && !isTyping" class="suggestions-container">
            <p class="suggestion-label">Try asking:</p>
            <button 
              v-for="question in suggestedQuestions" 
              :key="question" 
              class="suggestion-chip"
              @click="selectSuggestion(question)"
            >
              {{ question }}
            </button>
          </div>
        </div>

        <!-- Input Area -->
        <footer class="chat-footer">
          <div class="input-container">
            <input 
              v-model="messageInput" 
              type="text" 
              placeholder="Ask about products..." 
              @keyup.enter="handleSendMessage"
              class="chat-input"
            />
            <button class="send-button" @click="handleSendMessage" :disabled="!messageInput.trim()" aria-label="Send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                <path d="M3.4 22c-.2 0-.4-.1-.5-.2-.3-.2-.4-.6-.2-.9l2.5-9.9L21.3 12 5.2 11.1l-2.5-10c-.1-.3 0-.7.2-.9.3-.2.7-.3 1-.1l18 10c.3.2.5.5.5.9s-.2.7-.5.9l-18 10c-.1.1-.2.1-.3.1z"/>
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Design Tokens & Reset */
.ai-assistant-wrapper {
  position: fixed;
  bottom: 85px; /* Moved up to avoid overlap with TapToTop */
  right: 24px;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
  --ai-primary: #6366f1;
  --ai-secondary: #ec4899;
  --ai-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  --ai-glass: rgba(255, 255, 255, 0.8);
}

svg {
  display: block;
}

button, input {
  border: none !important;
  outline: none !important;
  background: none;
  padding: 0;
  margin: 0;
  box-shadow: none !important;
}

.ai-icon, .close-icon {
  width: 28px;
  height: 28px;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.ai-avatar svg {
  width: 24px;
  height: 24px;
  z-index: 1;
}

/* Floating Button */
.ai-floating-button {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: transparent;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
}

.orb-background {
  position: absolute;
  inset: 0;
  background: var(--ai-gradient);
  border-radius: 50%;
  transition: all 0.5s ease;
}

.ai-floating-button:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 15px 40px -10px rgba(99, 102, 241, 0.6);
}

.ai-floating-button:hover .orb-background {
  filter: hue-rotate(15deg) brightness(1.1);
}

.ai-floating-button.is-active {
  transform: rotate(90deg);
}

/* Sparkles */
.sparkles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
}

.s1 { width: 4px; height: 4px; top: 20%; left: 20%; animation: sparkleAnim 2s infinite 0.5s; }
.s2 { width: 3px; height: 3px; top: 70%; left: 80%; animation: sparkleAnim 2s infinite 1.2s; }
.s3 { width: 5px; height: 5px; top: 40%; left: 75%; animation: sparkleAnim 2.5s infinite; }

@keyframes sparkleAnim {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

.icon-container {
  position: relative;
  z-index: 2;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Chat Panel */
.ai-chat-panel {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 400px;
  height: 600px;
  max-height: calc(100vh - 120px);
  background: var(--ai-glass);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  overscroll-behavior: contain;
}

/* Header Refinement */
.chat-header {
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 16px;
}

.ai-avatar {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--ai-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.3);
}

.header-text {
  display: flex;
  flex-direction: column;
}

.header-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 13px;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.4;
}

.close-panel {
  background: rgba(0, 0, 0, 0.05) !important;
  color: #4b5563 !important;
  cursor: pointer;
  padding: 8px !important;
  border-radius: 50% !important;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-panel:hover {
  background: rgba(0, 0, 0, 0.1) !important;
  color: #ef4444 !important;
  transform: rotate(90deg);
}

/* Message Styles */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overscroll-behavior: contain; /* Prevents background scrolling */
}

.message-wrapper {
  max-width: 80%;
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.message-bubble {
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 14.5px;
  line-height: 1.6;
}

.user .message-bubble {
  background: var(--ai-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.ai .message-bubble {
  background: white;
  color: #374151;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Product Cards in Chat */
.product-slider-wrapper {
  position: relative;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
}

.product-cards-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px 2px 12px;
  scrollbar-width: none;
  scroll-behavior: smooth;
  flex: 1;
}

.product-cards-container::-webkit-scrollbar {
  display: none;
}

.slider-btn {
  width: 28px;
  height: 28px;
  border-radius: 50% !important;
  background: white !important;
  color: var(--ai-primary) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  flex-shrink: 0;
  opacity: 0.8;
}

.slider-btn:hover {
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.slider-btn.prev {
  margin-right: -14px;
}

.slider-btn.next {
  margin-left: -14px;
}

.product-mini-card {
  flex: 0 0 140px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
}

.product-mini-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--ai-primary);
}

.product-mini-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.product-info {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-info .name {
  font-size: 11px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-info .price {
  font-size: 12px;
  font-weight: 700;
  color: var(--ai-primary);
}

/* Suggestions Refinement */
.suggestion-label {
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.suggestion-chip {
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.3s;
}

.suggestion-chip:hover {
  background: white;
  border-color: var(--ai-primary);
  color: var(--ai-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

/* Input Refinement */
.chat-footer {
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.input-container {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 6px 6px 6px 16px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.input-container:focus-within {
  border-color: var(--ai-primary);
  background: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

.chat-input {
  flex: 1;
  font-size: 14px;
  color: #1f2937;
  height: 36px;
}

.chat-input::placeholder {
  color: #94a3b8;
}

.send-button {
  background: var(--ai-gradient) !important;
  color: white !important;
  padding: 8px !important;
  border-radius: 12px !important;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05) translateX(2px);
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
}

.send-button:disabled {
  background: #e5e7eb !important;
  color: #9ca3af !important;
  box-shadow: none !important;
}

/* Typing Dot Animation */
.dot {
  background: var(--ai-primary);
  opacity: 0.6;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}
.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}
.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 480px) {
  .ai-chat-panel {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
    max-height: 100%;
  }
}
</style>

