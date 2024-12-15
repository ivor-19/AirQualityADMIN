<template>
    <div class="w-full relative ">
        <Icon icon="iconamoon:search" class="w-5 h-5 absolute left-[460px] top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="inputText inputLayout pr-10 shadow-sm"
        />
    </div>
        
</template>
    
<script setup>
import { Icon } from '@iconify/vue';
defineProps({
    modelValue:{
        type: String,
        default:"",
    }
});

</script>