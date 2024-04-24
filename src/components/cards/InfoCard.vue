<script setup lang="ts">
import { InfoCardStyle } from "./style";

defineProps({
  counter: {
    type: String,
    default: "21k",
  },
  text: {
    type: String,
    default: "Total Products",
  },
  icon: {
    type: String,
    default: "briefcase",
  },
  type: {
    type: String,
    default: "primary",
    validator: (value: any) => ["primary", "secondary"].includes(value),
  },
  icon_type: {
    type: String,
    default: "unicon",
  },
});
</script>

<template>
  <InfoCardStyle :type="type">
    <span class="ninjadash-infocard-icon">
      <unicon :name="icon" v-if="icon_type=='unicon'"></unicon>
      <font-awesome-icon :icon="icon" v-else-if="icon_type=='fa'" />
    </span>
    <p class="ninjadash-infocard-text">{{ text }}</p>
    <h2 class="ninjadash-infocard-label">{{ counter }}</h2>
  </InfoCardStyle>
</template>
