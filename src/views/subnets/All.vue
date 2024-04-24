<script setup lang="tsx">
import { TopToolBox } from "./Style";
import { Main, TableWrapper } from "../styled";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const columns = [
  {
    title: "Subnet Id",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Collateral",
    dataIndex: "collateral",
    key: "collateral",
  },
  {
    title: "Genesis",
    dataIndex: "genesis",
    key: "genesis",
  },
  {
    title: "Circulating Supply",
    dataIndex: "circSupply",
    key: "circSupply",
  },
];

const { state } = useStore();
const subnets = computed(() => state.server.subnets);

const walletsLoading = computed(() => state.server.fetchingWallets);
const subnetsLoading = computed(() => state.server.fetchingSubnets);

const dataSource = computed(() =>
  subnets.value.map((value: any) => {
    const { address, collateral, circSupply, genesis } = value;
    return {
      key: address,
      address: <span class='order-id'>{address}</span>,
      collateral: <span class='ordered-collateral'>{collateral} FIL</span>,
      genesis: <span class='ordered-date'>{genesis}</span>,
      circSupply: <span class='ordered-amount'>{circSupply} FIL</span>,
    };
  })
);
</script>

<template>
  <sdPageHeader title="Subnets" class="ninjadash-page-header-main">
  </sdPageHeader>
  <Main v-if="!subnetsLoading && !walletsLoading">
    <sdCards headless>
      <a-row :gutter="15">
        <a-col :xs="24">
          <TopToolBox>
            <a-row :gutter="15" class="justify-content-center">
              <a-col :xxl="4" :lg="4" :xs="24">
                <div class="table-toolbox-actions">
                  <RouterLink to="/subnets/create">
                    <sdButton size="sm" type="primary">
                       Add Subnet
                    </sdButton>
                  </RouterLink>
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
                total: subnets ? subnets.length : 20,
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
