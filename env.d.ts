/// <reference types="vite/client" />
// 通常用于 TypeScript 的全局类型声明, 识别vue文件
declare module "*.vue" {  // 这行代码声明了一个模块，该模块会匹配所有的 .vue 文件。*.vue 表示任何以 .vue 结尾的文件
  import type { DefineComponent } from "vue";  // 导入 Vue 中的 DefineComponent 类型
  const component: DefineComponent<{}, {}, any>;  // 声明并导出 component 作为默认导出。这使得 TypeScript 知道 .vue 文件默认导出的是一个 Vue 组件，并且它的类型是 DefineComponent<{}, {}, any>
  export default component;
}
