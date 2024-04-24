<script setup lang="ts">
import {
  computed,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
//import type { PropType } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { NavTitle } from "./style";

const props = defineProps({
  toggleCollapsed: {
    type: Function,
    required: true,
  },
  events: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const darkMode = computed(() => store.state.themeLayout.data);
const mode = ref("inline");

const router = computed(() => useRoute());
const state = reactive({
  rootSubmenuKeys: ["sub1", "sub2", "sub4"],
  selectedKeys: ["home"],
  openKeys: ["dashboard"],
  preOpenKeys: ["dashboard"],
});

const onOpenChange = (keys: any) => {
  state.openKeys =
    keys[keys.length - 1] !== "recharts"
      ? [keys.length && keys[keys.length - 1]]
      : keys;
};

const onClick = (item: { keyPath: any }) => {
  if (item.keyPath.length === 1) state.openKeys = [];
};

watchEffect(() => {
  if (router.value.matched.length) {
    if (router.value.matched.length > 2) {
      state.selectedKeys = [router.value.matched[2]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.openKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.preOpenKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
    } else if (router.value.matched.length > 3) {
      state.selectedKeys = [router.value.matched[3]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.openKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.preOpenKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
    } else {
      state.selectedKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.openKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
      state.preOpenKeys = [router.value.matched[1]?.name].filter(
        (x) => x !== undefined
      ) as string[];
    }
  }
});

watch(
  () => state.openKeys,
  (val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
</script>

<template>
  <a-menu
    :open-keys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick"
  >
    <a-sub-menu key="dashboard">
      <template #icon>
        <unicon name="create-dashboard"></unicon>
      </template>
      <template #title><router-link to="/"> Dashboard </router-link></template>
    </a-sub-menu>

    <NavTitle class="ninjadash-sidebar-nav-title">SUBNETS</NavTitle>
    <a-sub-menu key="Subnets">
      <template #icon>
        <font-awesome-icon icon="network-wired"></font-awesome-icon>
      </template>
      <template #title>Subnets</template>
      <a-menu-item @click="toggleCollapsed" key="detail">
        <router-link to="/subnets">
          All
        </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="edit-product">
        <router-link to="/subnets/create">
          Create
        </router-link>
      </a-menu-item>
     
    </a-sub-menu>

    <NavTitle class="ninjadash-sidebar-nav-title">Wallet</NavTitle>
    <a-sub-menu key="Wallets">
      <template #icon>
        <unicon name="wallet"></unicon>
      </template>
      <template #title>Wallet</template>
      <a-menu-item @click="toggleCollapsed" key="allwallets">
        <router-link to="/wallets">
         All
        </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="createwallet">
        <router-link to="/wallets/create">
          Create
        </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="importwallet">
        <router-link to="/wallets/import"> Import Wallet </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="defaultwallet">
        <router-link to="/wallets/default"> Set Default Wallet </router-link>
      </a-menu-item>

      <!-- <a-menu-item @click="toggleCollapsed" key="invoice">
        <router-link to="/app/ecommerce/invoice"> Invoice </router-link>
      </a-menu-item> -->
    </a-sub-menu>

    <NavTitle class="ninjadash-sidebar-nav-title">FEATURES</NavTitle>

    <a-sub-menu key="charts">
      <template #icon>
        <unicon name="chart-bar"></unicon>
      </template>
      <template #title>Charts</template>
      <a-menu-item @click="toggleCollapsed" key="chart-js">
        <router-link to="/chart/chart-js"> Chart js </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="googleChart">
        <router-link to="/chart/google-chart"> Google Chart </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
