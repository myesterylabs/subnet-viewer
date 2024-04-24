<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import { Div, SmallScreenSearch, SmallScreenAuthInfo, TopMenuSearch } from './style';

// import AuthInfo from '../components/utilities/auth-info/Info.vue';
import AsideItems from './Aside.vue';
// import TopMenu from './TopMenuItems.vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
//import Customizer from './overview/Customizer.vue';

const { Header, Footer, Sider, Content } = Layout;
const collapsed = ref(false);
const hide = ref(true);
const searchHide = ref(true);
//const customizerAction = ref(false);
const activeSearch = ref(false);

// const store = useStore();
const { dispatch, state } = useStore();

const rtl = computed(() => state.themeLayout.rtlData);
const darkMode = computed(() => state.themeLayout.data);
const topMenu = computed(() => state.themeLayout.topMenu);
const innerWidth: number = window.innerWidth;
// collapsed.value = window.innerWidth <= 1200 && true;
collapsed.value = false

const toggleCollapsed = (e: Event) => {
  e.preventDefault();
  // collapsed.value = !collapsed.value;
};
const handleSearchHide = (search: any) => {
  searchHide.value = !search;
  hide.value = true;
};
const onShowHide = (h: any) => {
  hide.value = !h;
  searchHide.value = true;
};
dispatch("getWallets")
dispatch("getSubnets")
dispatch("getDefaultWallet")

const toggleCollapsedMobile = () => {
  // const aside = document.querySelector(".ps--active-y");
  // aside.scrollTop = 0;

  if (innerWidth <= 990) {
    collapsed.value = !collapsed.value;
  }
};
if (innerWidth <= 990) {
  document.body.addEventListener('click', (e: any) => {
    if (!e.target.closest('.ant-layout-sider') && !e.target.closest('.navbar-brand .ant-btn')) {
      // collapsed.value = true;
    }
  });
}

const onRtlChange = () => {
  const html: any = document.querySelector('html');
  html.setAttribute('dir', 'rtl');
  dispatch('changeRtlMode', true);
};

const onLtrChange = () => {
  const html: any = document.querySelector('html');
  html.setAttribute('dir', 'ltr');
  dispatch('changeRtlMode', false);
};

const modeChangeDark = () => {
  dispatch('changeLayoutMode', true);
};

const modeChangeLight = () => {
  dispatch('changeLayoutMode', false);
};

const modeChangeTopNav = () => {
  dispatch('changeMenuMode', true);
};

const modeChangeSideNav = () => {
  dispatch('changeMenuMode', false);
};

const onEventChange = {
  onRtlChange,
  onLtrChange,
  modeChangeDark,
  modeChangeLight,
  modeChangeTopNav,
  modeChangeSideNav,
};
</script>

<template>
  <Div :darkMode="darkMode">
    <Layout class="layout">
      <Header
        :style="{
          position: 'fixed',
          width: '100%',
          top: 0,
          [!rtl ? 'left' : 'right']: 0,
        }"
      >
        <div class="ninjadash-header-content d-flex">
          <div class="ninjadash-header-content__left">
            <div class="navbar-brand align-cener-v">
              <router-link :class="topMenu && innerWidth > 991 ? 'ninjadash-logo top-menu' : 'ninjadash-logo'" to="/">
                <h1>Subnet Viewer</h1>
              </router-link>
              <sdButton v-if="!topMenu || innerWidth <= 991" @click="toggleCollapsed" type="white">
                <img :src="`/src/assets/img/icon/align-center-alt.svg`" alt="menu" />
              </sdButton>
            </div>
          </div>
          <div class="ninjadash-header-content__right d-flex">
            <div class="ninjadash-navbar-menu d-flex align-center-v">
              <!-- <TopMenu v-if="topMenu && innerWidth > 991" /> -->
            </div>
            <div class="ninjadash-nav-actions">

            </div>
          </div>
          <div class="ninjadash-header-content__fluid">
            <div class="ninjadash-header-content__fluid__action">
              <a class="btn-search" @click="handleSearchHide(searchHide)" href="#">
                <unicon name="search" v-if="searchHide"></unicon>
                <unicon name="times" v-else></unicon>
              </a>
              <a class="btn-auth" @click="onShowHide(hide)" href="#">
                <unicon name="ellipsis-v"></unicon>
              </a>
            </div>
          </div>
          <!-- <a-col :lg="!topMenu ? 14 : 15" :md="8" :sm="0" :xs="0">

            <HeaderSearch v-else />
          </a-col> -->

          <!-- <a-col :style="{ position: 'static' }" :md="0" :sm="18" :xs="12">
            <div class="mobile-action">
              <a class="btn-search" @click="handleSearchHide(searchHide)" href="#">
                <unicon name="search" v-if="searchHide"></unicon>
                <unicon name="x" v-else></unicon>
              </a>
              <a class="btn-auth" @click="onShowHide(hide)" href="#">
                <unicon name="ellipsis-v"><unicon>
              </a>
            </div>
          </a-col> -->
        </div>
      </Header>
      <!-- <div class="header-more">
        <a-row>
          <a-col :md="0" :sm="24" :xs="24">
            <div class="small-screen-headerRight">
              <SmallScreenSearch :hide="searchHide" :darkMode="darkMode">
                <HeaderSearch />
              </SmallScreenSearch>
              <SmallScreenAuthInfo :hide="hide" :darkMode="darkMode">
                <AuthInfo :rtl="rtl" />
              </SmallScreenAuthInfo>
            </div>
          </a-col>
        </a-row>
      </div> -->
      <Layout>
        <template v-if="!topMenu || innerWidth <= 991">
          <Sider
            :width="280"
            :style="{
              margin: '72px 0 0 0',
              padding: `${!rtl ? '20px 20px 55px 0px' : '20px 0px 55px 20px'}`,
              overflowY: 'auto',
              height: '100vh',
              position: 'fixed',
              [!rtl ? 'left' : 'right']: 0,
              zIndex: 998,
            }"
            :collapsed="collapsed"
            :theme="!darkMode ? 'light' : 'dark'"
          >
            <perfect-scrollbar
              :options="{
                wheelSpeed: 1,
                swipeEasing: true,
                suppressScrollX: true,
              }"
            >
              <AsideItems
                :toggleCollapsed="toggleCollapsedMobile"
                :topMenu="topMenu"
                :rtl="rtl"
                :darkMode="darkMode"
                :events="onEventChange"
              />
            </perfect-scrollbar>
          </Sider>
        </template>
        <Layout class="ninjadash-main-layout">
          <Content>
            <Suspense>
              <template #default>
                <router-view></router-view>
              </template>
              <template #fallback>
                <div class="spin">
                  <a-spin />
                </div>
              </template>
            </Suspense>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Div>
</template>

<style scoped>
.ps {
  height: calc(100vh - 100px);
}
.ant-layout-sider-collapsed .ps {
  height: calc(100vh - 70px);
}
</style>
