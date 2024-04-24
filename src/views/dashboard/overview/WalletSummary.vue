<script setup lang="tsx">
import {  computed } from "vue";
import { MarketingCampaignStyle } from "./Style";
import { BorderLessHeading, TableDefaultStyle } from "../../styled";
import { useStore } from 'vuex';

const { state } = useStore();


const trim = (str: string, max: number) =>
  str.length > max ? `${str.slice(0, max)}...` : str;
const columns = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
];

const dataSource = computed(() =>
  state.server.wallets.map((value: any) => {
    const { address, balance, id } = value;
    return {
      key: id,
      address: (
        <div class='ninjadash-info-element align-center-v'>
          <span class='ninjadash-info-element__text'>{trim(address, 20)}</span>
        </div>
      ),
      balance: `${balance} FIL`,
    };
  })
);
</script>

<template>
  <BorderLessHeading>
    <sdCards title="Wallet Summary">
      <TableDefaultStyle>
        <MarketingCampaignStyle>
          <div class="table-responsive">
            <a-table
              :data-source="dataSource"
              :columns="columns"
              :pagination="false"
              :showHeader="true"
            />
          </div>
        </MarketingCampaignStyle>
      </TableDefaultStyle>
    </sdCards>
  </BorderLessHeading>
</template>
