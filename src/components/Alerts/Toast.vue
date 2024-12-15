<template>
    <transition-group name="slide">
      <div v-if="showToast" class="toast">
			<div class="innerToast" :class="toastType">
				<div class="flex items-center">
					<div class="mr-4">
						<Icon v-if="toastType === 'success'" icon="mdi:success-circle-outline" class="h-8 w-8"/>
						<Icon v-else-if="toastType === 'error'" icon="codicon:error" class="h-8 w-8"/>
					</div>
					<div>
						<p>{{ toastMessage }}</p>
					</div>
				</div>
			</div>
      </div>  
    </transition-group>
</template>
  
<script setup>
import { computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { toastDuration } from '@/components/composable/GlobalVariables';
import { useStore } from 'vuex';

const store = useStore();

const showToast = computed(() => store.state.toast.showToast);
const toastMessage = computed(() => store.state.toast.toastMessage);
const toastType = computed(() => store.state.toast.toastType);

onMounted(() => {
    // Check if showToast is true on mount and hide the toast after the duration
    if (store.state.toast.showToast) {
      setTimeout(() => {
        store.commit('showToast', { showToast: false, toastMessage: '', toastType: 'default' });
      }, toastDuration);
    }
  });

</script>

<style scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

</style>