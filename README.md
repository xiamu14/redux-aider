## Redux 辅助工具

## 安装

```
yarn add redux-aider
```

## 介绍

缩减 redux 样板代码

## 使用

```js
// store/user_info.js
import { createAction, createReducer } from 'redux-aider';

// just care reducers
const reducerFunc = {
  accept: (state, action) => action.payload, // key is constant
}

// reducer config
const userInfo = {
  name: 'userInfo', // state name
  initState: {},
  reducerFunc,
}

export const userInfoActions = createAction(userInfo);
export const reducer = createReducer(userInfo);

```
```js
// 在 component 中使用 action

import { connect } from 'react-redux';
import { userInfoActions } from 'store/user_info.js';

@connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    onAccept: payload => dispatch(userInfoActions.accept(payload))
  })
)

```
