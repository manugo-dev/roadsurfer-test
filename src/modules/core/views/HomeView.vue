<script lang="ts" setup>
import { ref } from 'vue';

import InputField from '@/modules/shared/components/form/InputField.vue';

const name = ref("")

</script>

<template>
  <div class="home">
    <h1>Welcome to the Roadsurfer App</h1>

    <InputField v-model="name" />
    <p>Your input: {{ name }}</p>
  </div>
</template>
