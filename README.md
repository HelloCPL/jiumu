## 初始化

- 安装依赖 `pnpm i`

- 初始化提交规则（仅第一次需要） `pnpm dlx husky install`

## 运行

- `mobile` 项目运行

- `pc` 项目运行

- `web` 项目运行

## 安装包

- 全局安装
  安装到`dependencies`使用 `--save-prod, -P`  `pnpm add vue -w -P`
  安装到`devDependencies`使用 `--save-dev, -D`  `pnpm add vue -w -D`

- 指定某个项目安装，如只为`pc`项目安装依赖  `pnpm add lodash --filter @jiumu/pc -D`


## 项目说明
- 该项目主要为樛木 `PC管理端` `PC web端` `移动端` 三端项目，各项目详细说明请看相关的 `README.md`

- 使用 pnpm 管理

### pnpm 命令常用说明

- `pnpm` 与 `npm` 用法类似

| npm | pnpm |
|:---:|:---:|
| npm i | pnpm i |
| npm i <package> | pnpm add <package> |
| npm run <cmd> | pnpm <cmd> |

- `pnpm add <package>` 安装某依赖包
  + `--save-prod, -P` 添加到 `dependencies`
  + `--save-dev, -D` 添加到 `devDependencies`
  + `--save-optional, -O` 添加到 `optionalDependencies`
  + `--global, -g` 全局安装
  + 如 `npm add -P vue`

- `pnpm update, up` 更新依赖包
  + `pnpm up` 更新 `package.json` 指定范围的所有依赖项
  + `pnpm up --latest` 升级所有依赖项（忽略 `package.json` 指定范围）
  + `pnpm up vue@xx` 将 vue 升级到指定版本
  + `pnpm up @babel/**` 更新 @babel 下的所有依赖项
  + 如 `npm up -P vue@3.x`

- `pnpm remove, rm, uninstall, un` 移除依赖
  + `--save-prod, -P` 仅从 `dependencies` 删除
  + `--save-dev, -D` 仅从 `devDependencies` 删除
  + `--save-optional, -O` 仅从 `optionalDependencies` 删除
  + `--global, -g` 全局删除
  + 如 `pnpm remove vue`

- `-C <path>, --dir <path>` 指定运行目录
  + 如 `pnpm run -C packages/pc dev`

- `-w, --workspace-root` 指定全局安装
  + 如 `pnpm add vue -w`
  + `pnpm remove vue -w`

- `--filter <package_name>` 指定子包安装
  + 如 `pnpm add lodash-es --filter @jiumu/pc`
  + `pnpm remove lodash-es --filter @jiumu/pc`

- `pnpm run` 运行 `scripts` 下配置的命令
  + 如 `pnpm run dev` 运行 dev 命令

- `pnpm create` 通过模板创建一个项目
  + 如 `pnpm create vite my-vue` 创建一个名叫 my-vue 的项目

#### 问题

- `vue` 提示错误，`defineProps defineEmits` 等提示错误，可以安装 `volar` 插件

