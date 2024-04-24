<script setup lang="ts">
import { reactive, ref } from "vue";
import { BasicFormWrapper } from "../styled";
import type { UnwrapRef } from "vue";

import { useStore } from "vuex";

interface FormState {
  layout: string;
  password: string;
}
const { state, dispatch } = useStore();
const formState: UnwrapRef<FormState> = reactive({
  layout: "vertical",
  password: "123456",
});

const addPrivateKey = () => {
  isLoading.value = true;
  window.api
    .addPrivateKey(formState.password)
    .then((res) => {
      isLoading.value = false;
      if (res && res.length > 20) {
        alert("Wallet added successfully: " + res);
        dispatch("getWallets");
      } else {
        alert("Error adding wallet: " + res);
      }
    })
    .catch((err) => {
      alert("Error adding wallet: " + err);
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
    <!-- <HorizontalFormStyleWrap> -->
    <sdCards title="Import Evm Private Key">
      <a-form
        name="input-form"
        :layout="formState.layout"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <a-form-item label="Private Key">
          <a-input-password
            v-model:value="formState.password"
            placeholder="input placeholder"
          />
        </a-form-item>

        <a-form-item>
          <sdButton
            class="btn-signin"
            htmlType="submit"
            type="primary"
            @click="addPrivateKey"
          >
            {{ isLoading ? "Loading..." : "Import" }}
          </sdButton>
        </a-form-item>
      </a-form>
    </sdCards>
    <!-- </HorizontalFormStyleWrap> -->
  </BasicFormWrapper>
</template>
