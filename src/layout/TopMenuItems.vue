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

const addParentActive = (event: any) => {
  document.querySelectorAll(".parent").forEach((element) => {
    element.classList.remove("active");
  });

  const hasSubMenuLeft = event.currentTarget.closest(".has-subMenu-left");
  const megaMenu = event.currentTarget.closest(".megaMenu-wrapper");
  if (!megaMenu) {
    event.currentTarget.closest("ul").previousSibling.classList.add("active");
    if (hasSubMenuLeft)
      hasSubMenuLeft.closest("ul").previousSibling.classList.add("active");
  } else {
    event.currentTarget
      .closest(".megaMenu-wrapper")
      .previousSibling.classList.add("active");
  }
};
</script>

<template>
  <TopMenuStyle>
    <div class="ninjadash-top-menu"></div>
  </TopMenuStyle>
</template>
