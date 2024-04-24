<script setup lang="tsx">
import {  computed } from "vue";
import { MarketingCampaignStyle } from "./Style";
import { BorderLessHeading, TableDefaultStyle } from "../../styled";
import { useStore } from "vuex";

const { state } = useStore();

const trim = (str: string, max: number) =>
  str.length > max ? `${str.slice(0, max)}...` : str;
const columns = [
  {
    title: "Path",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Circulating Supply",
    dataIndex: "amount",
    key: "amount",
  },
];

const dataSource = computed(() =>
  state.server.subnets.map((value: any) => {
    const { address, circSupply } = value;
    return {
      key: address,
      name: (
        <div class='ninjadash-info-element align-center-v'>
          <span class='ninjadash-info-element__text'>{trim(address, 20)}</span>
        </div>
      ),
      amount: `${circSupply} FIL`,
    };
  })
);
</script>

<template>
  <BorderLessHeading>
    <sdCards title="Subnet Summary">
      <TableDefaultStyle>
        <MarketingCampaignStyle>
          <div class="table-responsive">
            <a-table
              :data-source="dataSource"
              :columns="columns"
              :pagination="true"
              :showHeader="true"
            />
          </div>
        </MarketingCampaignStyle>
      </TableDefaultStyle>
    </sdCards>
  </BorderLessHeading>
</template>
import { title } from "process";
