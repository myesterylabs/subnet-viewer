<script setup lang="tsx">
import { TopToolBox } from "./Style";
import { Main, TableWrapper } from "../styled";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const columns = [
  {
    title: "Wallet Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
];
const { state, dispatch } = useStore();
const loading = ref(false);
const addWallet = () => {
  loading.value = true;
  window.api.addWallet().then((res) => {
    loading.value = false;
    if (res) {
      dispatch("getWallets");
    }
  });
};

const wallets = computed(() => state.server.wallets);

const walletsLoading = computed(() => state.server.fetchingWallets);
const subnetsLoading = computed(() => state.server.fetchingSubnets);

const dataSource = computed(() =>
  wallets.value.map((value: any) => {
    const { address, balance } = value;
    return {
      key: address,
      address: <span class='order-id'>{address}</span>,
      // collateral: <span class='ordered-collateral'>{collateral} FIL</span>,
      // genesis: <span class='ordered-date'>{genesis}</span>,
      balance: <span class='ordered-amount'>{balance} FIL</span>,
    };
  })
);
</script>

<template>
  <sdPageHeader title="Wallets" class="ninjadash-page-header-main">
  </sdPageHeader>
  <Main v-if="(!subnetsLoading && !walletsLoading) || loading">
    <sdCards headless>
      <a-row :gutter="15">
        <a-col :xs="24">
          <TopToolBox>
            <a-row :gutter="15" class="justify-content-center">
              <a-col :xxl="4" :lg="4" :xs="24">
                <div class="table-toolbox-actions">
                  <!-- <RouterLink to="/subnets/create"> -->
                  <sdButton size="sm" type="primary" @click="addWallet">
                    Add Wallet
                  </sdButton>
                  <!-- </RouterLink> -->
                </div>
              </a-col>
            </a-row>
          </TopToolBox>
        </a-col>
      </a-row>
      <a-row :gutter="15">
        <a-col :md="24">
          <TableWrapper class="table-order table-responsive">
            <a-table
              :dataSource="dataSource"
              :columns="columns"
              :pagination="{
                pageSize: 15,
                showSizeChanger: true,
                total: wallets ? wallets.length : 20,
              }"
            />
          </TableWrapper>
        </a-col>
      </a-row>
    </sdCards>
  </Main>
  <sdCards v-else title="" caption="">
    <SpinerWraperStyle>
      <a-spin indicator="{antIcon}" />
    </SpinerWraperStyle>
  </sdCards>
</template>
