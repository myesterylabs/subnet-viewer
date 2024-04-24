<script setup lang="ts">
import { Main } from "../styled";
import { defineAsyncComponent,  computed } from "vue";
import { DemoFourStyle } from "./style";
import { useStore } from "vuex";
const { state } = useStore();
const wallets = computed(() => state.server.wallets);
const subnets = computed(() => state.server.subnets);
// fetchingWallets: false,
//   fetchingSubnets: false,
//   fetchingDefaultWallet: false,

const walletsLoading = computed(() => state.server.fetchingWallets);
const subnetsLoading = computed(() => state.server.fetchingSubnets);

const WalletSummary = defineAsyncComponent(
  () => import("./overview/WalletSummary.vue")
);

const SubnetSummary = defineAsyncComponent(
  () => import("./overview/SubnetSummary.vue")
);

const InfoCard = defineAsyncComponent(
  () => import("../../components/cards/InfoCard.vue")
);

const pageRoutes = [
  {
    path: "/",
    breadcrumbName: "Dashboard",
  },
];

// const total_subnets = ref("0");
// const total_wallets = ref("0");
// const loaded = ref(false);
</script>

<template>
  <div>
    <sdPageHeader
      title="Dashboard"
      class="ninjadash-page-header-main"
      :routes="pageRoutes"
    ></sdPageHeader>
    <Main>
      <DemoFourStyle v-if="!subnetsLoading && !walletsLoading">
        <a-row justify="center" :gutter="25">
          <a-col :xxl="8" :md="12" :lg="12" :xs="24">
            <Suspense>
              <template #fallback>
                <sdCards headless>
                  <a-skeleton active />
                </sdCards>
              </template>
            </Suspense>
          </a-col>
          <a-col :xxl="8" :xl="24" :md="24" :xs="24">
            <Suspense>
              <template #fallback>
                <sdCards headless>
                  <a-skeleton active />
                </sdCards>
              </template>
              <template #default>
                <a-row :gutter="15">
                  <a-col :xs="12">
                    <InfoCard
                      :counter="subnets.length"
                      text="Total Subnets"
                      icon="network-wired"
                      icon_type="fa"
                    />
                  </a-col>
                  <a-col :xs="12">
                    <InfoCard
                      text="Total Wallets"
                      icon="wallet"
                      type="secondary"
                      :counter="wallets.length"
                    />
                  </a-col>
                </a-row>
              </template>
            </Suspense>
          </a-col>
          <a-col :xxl="12" :md="12" :xs="24">
            <Suspense>
              <template #fallback>
                <sdCards headless>
                  <a-skeleton active />
                </sdCards>
              </template>
              <template #default>
                <!-- <TaskList /> -->
                <SubnetSummary :data="subnets" />
              </template>
            </Suspense>
          </a-col>
          <a-col :xxl="12" :md="12" :xs="24">
            <Suspense>
              <template #fallback>
                <sdCards headless>
                  <a-skeleton active />
                </sdCards>
              </template>
              <template #default>
                <WalletSummary
                  :data="wallets" 
                />
              </template>
            </Suspense>
          </a-col>
        </a-row>
      </DemoFourStyle>

      <sdCards v-else title="" caption="">
        <SpinerWraperStyle>
          <a-spin indicator="{antIcon}" />
        </SpinerWraperStyle>
      </sdCards>
    </Main>
  </div>
</template>
