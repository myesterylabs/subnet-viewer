<script setup lang="ts">
import { AuthenticationWrap } from './style';
</script>
<template>
  <AuthenticationWrap
    :style="{
      backgroundImage: `url('/src/assets/img/admin-bg-light.png')`,
    }"
  >
    <div class="ninjadash-authentication-wrap">
      <div class="ninjadash-authentication-brand">
       <h1>Subnet Viewer</h1>
      </div>
      <router-view></router-view>
    </div>
  </AuthenticationWrap>
</template>
