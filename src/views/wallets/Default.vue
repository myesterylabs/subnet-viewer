<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { BasicFormWrapper } from "../styled";
import type { UnwrapRef } from "vue";

import { useStore } from "vuex";

interface FormState {
  layout: string;
  password: string;
  wallet: string;
}
const { state, dispatch } = useStore();
const defaultWalllet = computed(() => state.server.defaultWalllet);
console.log(state.server);
const formState: UnwrapRef<FormState> = reactive({
  layout: "vertical",
  password: "123456",
  wallet: defaultWalllet.value,
});

const setDefaultWallet = () => {
  isLoading.value = true;
  window.api
    .setDefaultWallet(formState.wallet)
    .then((_) => {
      isLoading.value = false;
        alert("Wallet set successfully");
        dispatch("getDefaultWallet");
    })
    .catch((_) => {
      alert("Error adding wallet");
    });
};

const isLoading = ref(false);

const labelCol = {
  md: 6,
  xs: 24,
};
const wrapperCol = {
  md: 18,
  xs: 24,
};
</script>

<template>
  <BasicFormWrapper>
    <sdCards title="Set default Wallet">
      <h3
        v-if="!state.server.fetchingWallets"
        v-text="state.server.defaultWalllet"
      ></h3>
      <a-form
        name="input-form"
        :layout="formState.layout"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <a-form-item name="prevWalletAddress" label="Previous Default Wallet">
          <sdButton class="btn-signin" htmlType="submit" type="primary" :disabled="true">
            {{ state.server.defaultWallet }}
          </sdButton>
        </a-form-item>

        <a-form-item name="wallet" label="New Default Wallet">
          <a-select v-model:value="formState.wallet" :style="{ width: '100%' }">
            <a-select-option
              v-for="wallet in state.server.wallets"
              :value="wallet.address"
              :key="wallet.address"
            >
              {{ wallet.address }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <sdButton
            class="btn-signin"
            htmlType="submit"
            type="primary"
            @click="setDefaultWallet"
          >
            {{ isLoading ? "Loading..." : "Save" }}
          </sdButton>
        </a-form-item>
      </a-form>
    </sdCards>
    <!-- </HorizontalFormStyleWrap> -->
  </BasicFormWrapper>
</template>
