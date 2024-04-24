<script setup lang="ts">
import { RecordFormWrapper } from "./FormStyle";
import { Main, BasicFormWrapper } from "../styled";
import { useStore } from "vuex";
import { computed, reactive, ref, onMounted } from "vue";

const { state, dispatch } = useStore();

const isLoading = ref(false);

const formState = reactive({
  parent: "/r314159",
  minValidator: 4,
  minValidatorStake: 10,
  bottomUpCheckPeriod: 30,
  wallet: state.server.defaultWallet,
});

const handleNothing = () => {};

const handleFinish = () => {
  if (!formState.wallet) {
    alert("Please select a wallet");
    return;
  }

  isLoading.value = true;
  window.api
    .createSubnet({
      parent: formState.parent,
      minValidator: formState.minValidator,
      minValidatorStake: formState.minValidatorStake,
      bottomUpCheckPeriod: formState.bottomUpCheckPeriod,
      wallet: formState.wallet,
    })
    .then((str) => {
      isLoading.value = false;
      alert("Subnet " + str + " created successfully");
      dispatch("getSubnets");
    });
};
</script>

<template>
  <sdPageHeader
    :routes="[]"
    class="ninjadash-page-header-main"
    title="Add New Subnet"
  >
    <template #buttons>
      <sdButton class="btn-add_new" size="default" key="1" type="primary">
        <router-link to="/subnets">View All</router-link>
      </sdButton>
    </template>
  </sdPageHeader>
  <Main>
    <a-row :gutter="15">
      <a-col :xs="24">
        <RecordFormWrapper>
          <sdCards headless>
            <a-row justify="center">
              <a-col :xl="10" :md="16" :xs="24">
                <BasicFormWrapper>
                  <a-form
                    class="add-record-form"
                    :style="{ width: '100%' }"
                    layout="vertical"
                    name="addnew"
                    :model="formState"
                    @finish="handleNothing"
                  >
                    <a-form-item name="name" label="Parent">
                      <a-input
                        v-model:value="formState.parent"
                        placeholder="Parent"
                        :disabled="true"
                      />
                    </a-form-item>
                    <a-form-item name="minValidator" label="Min Validators">
                      <a-input-number
                        v-model:value="formState.minValidator"
                        type="minValidator"
                        :min="2"
                        :max="100"
                      />
                    </a-form-item>

                    <a-form-item
                      name="minValidatorStake"
                      label="Min Validator Stake"
                    >
                      <a-input-number
                        v-model:value="formState.minValidatorStake"
                        :min="2"
                        :max="100"
                      />
                    </a-form-item>

                    <a-form-item
                      name="bottomUpCheckPeriod"
                      label="Bottom Up Check Period"
                    >
                      <a-input-number
                        v-model:value="formState.bottomUpCheckPeriod"
                        :min="2"
                        :max="100"
                      />
                    </a-form-item>

                    <a-form-item name="wallet" label="Wallet">
                      <a-select
                        v-model:value="formState.wallet"
                        :style="{ width: '100%' }"
                      >
                        <a-select-option
                          v-for="wallet in state.server.wallets"
                          :value="wallet.address"
                          :key="wallet.address"
                        >
                          {{ wallet.address }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>

                    <div class="record-form-actions text-right">
                      <sdButton
                        :disabled="isLoading"
                        size="default"
                        htmlType="Save"
                        type="primary"
                        @click="handleFinish"
                      >
                        {{ isLoading ? "Loading..." : "Submit" }}
                      </sdButton>
                    </div>
                  </a-form>
                </BasicFormWrapper>
              </a-col>
            </a-row>
          </sdCards>
        </RecordFormWrapper>
      </a-col>
    </a-row>
  </Main>

  <sdCards v-if="isLoading" title="" caption="">
    <!-- <SpinerWraperStyle> -->
    <a-spin indicator="{antIcon}" />
    <!-- </SpinerWraperStyle> -->
  </sdCards>
</template>
