<template>
    <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        class="inputText inputLayout"/>
      
</template>

<script setup>
  defineProps({
      modelValue:{
          type: String,
          default:"",
      }
  });

</script>