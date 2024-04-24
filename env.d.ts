/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
}

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}

// declare module "prop-types" {
//   export * from "prop-types/index";
//   number: any;
//   string: any;
//   bool: any;
//   func: any;
// }

declare module "svgmap2" {
  export * from "svgmap2/index";
}