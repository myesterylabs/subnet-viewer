<script lang="ts">
import { computed, reactive, ref, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { AuthWrapper } from "./style";
import { useRouter } from "vue-router";
// import { auth0options } from '@/config/auth0';
import { inlineSvg } from "@/components/utilities/utilities";
import { Topics } from "@/types/Topic";


const SignIn = defineComponent({
  name: "SignIn",
  components: { AuthWrapper },
  setup() {
    const { state, commit } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const checked = ref(null);

    const handleSubmit = () => {
      commit("loginBegin");
      window.api.listen(Topics.LOGIN_FAILED, "TRUE", (_: any) => {
        commit("loginErr");
        alert("Login failed");
      });

      window.api.login(formState.url, formState.password);
    };
    const onChange = (checked: any) => {
      checked.value = checked;
    };

    const formState = reactive({
      url: "http://34.133.97.146:8818",
      password: "098790879089789",
    });

    onMounted(() => {
      //init inlineSvg
      inlineSvg();
    });

    return {
      isLoading,
      checked,
      handleSubmit,
      onChange,
      formState,
      // lock,
    };
  },
});

export default SignIn;
</script>

<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Sign in</h2>
        </div>
        <div class="ninjadash-authentication-content">
          <sdCards v-if="isLoading" caption="The simplest use of Spin">
            <a-spin />
          </sdCards>
          <a-form @finish="handleSubmit" :model="formState" layout="vertical">
            <a-form-item name="rpc_url" label="RPC URL">
              <a-input type="url" v-model:value="formState.url" />
            </a-form-item>
            <a-form-item name="password" initialValue="123456" label="Password">
              <a-input
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <a-form-item>
              <sdButton class="btn-signin" htmlType="submit" type="primary">
                {{ isLoading ? "Loading..." : "Sign In" }}
              </sdButton>
            </a-form-item>
          </a-form>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>
import { Topics } from "@/types/Topic";
