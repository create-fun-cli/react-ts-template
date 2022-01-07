# react-ts-template

## 使用

### 安装

```shell
yarn install
```

### 运行

```shell
yarn start
```

### 构建

```shell
yarn build
```

## Q & A

### 如何配置 alias？

可以参照以下步骤配置 alias：

1. 在 vite.config.ts 的 resolve.alias 下添加路径；
2. 在 tsconfig.json 内的 compilerOptions.paths 下添加路径；
3. 为了支持 eslint 规则 `import/no-unresolved`，最后还需要在 .eslintrc.js 内的 settings.alias
   下配置路径，具体参照 https://www.npmjs.com/package/eslint-import-resolver-alias 。
