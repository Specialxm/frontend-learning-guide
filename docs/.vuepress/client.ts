import { defineClientConfig } from "vuepress/client";
import { HeaderSearch } from "./components";

export default defineClientConfig({
  // 客户端配置
  // Mermaid配置将通过主题插件自动处理
  
  // 注册全局组件
  enhance({ app }) {
    // 注册搜索组件
    app.component('HeaderSearch', HeaderSearch);
  }
}); 