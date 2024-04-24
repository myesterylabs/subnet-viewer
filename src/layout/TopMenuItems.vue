<script setup lang="ts">
import { onMounted } from "vue";
import { TopMenuStyle } from "./style";
import { inlineSvg } from "@/components/utilities/utilities";

onMounted(() => {
  const active: any = document.querySelector(".ninjadash-top-menu a.active");
  const activeDefault = () => {
    const megaMenu = active.closest(".megaMenu-wrapper");
    const hasSubMenuLeft = active.closest(".has-subMenu-left");
    if (!megaMenu) {
      active.closest("ul").previousSibling.classList.add("active");
      if (hasSubMenuLeft)
        hasSubMenuLeft.closest("ul").previousSibling.classList.add("active");
    } else {
      active
        .closest(".megaMenu-wrapper")
        .previousSibling.classList.add("active");
    }
  };
  window.addEventListener("load", active && activeDefault);
  // return () => window.removeEventListener('load', activeDefault);

  inlineSvg();
});

</script>

<template>
  <TopMenuStyle>
    <div class="ninjadash-top-menu"></div>
  </TopMenuStyle>
</template>
