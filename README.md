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
const userState = {
  name: 'user', // state name
  initState: {},
  reducerFunc,
}

export const userAction = createAction(userState);
export const user = createReducer(userState);

```
```js
// store/index.js
import {createStore, combineReducers } from "redux";
import { user, userAction  } from "./user";

// const store = createStore(userReducer);
const store = createStore(combineReducers({user}));

console.log(store.getState());
// console.log: {name: {}}

store.dispatch(userAction.add({ name: "2" }));

console.log(store.getState());
// comsole.log: {name: "2"}

export default store;

```

```js
// 在 component 中使用 action

import { connect } from 'react-redux';
import { userAction } from 'store/user_info.js';

@connect(
  ({ user }) => ({ user }),
  dispatch => ({
    onAccept: payload => dispatch(userAction.add(payload))
  })
)

```
