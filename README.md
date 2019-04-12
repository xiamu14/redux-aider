## 常用 JS 工具集

## 安装

```
yarn add univerdal-toolbox
```

## 工具介绍

### Redux 相关组合工具

#### createAction()

```js
import { createAction } from 'redux-aider';

const reducers = {
  update: (state, action) => action.payload, // key is constant
}

export const actions = createAction(Object.keys(reducers))

// 在 component 中使用 action

import { connect } from 'react-redux'

@connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    onAccept: payload => dispatch(actions.update(payload))
  })
)

```

#### createReducer()

```js
import { createReducer, createAction } from 'redux-aider'

// just care reducers
const reducerFunc = {
  accept: (state, action) => action.payload, // key is constant
}

// reducer config
const userInfo = {
  name: 'userInfo', // store name
  initState: {},
  reducerFuc,
}
const actions = createAction(userInfo);
const reducers = createReducer(userInfo);

export default userInfo

// store/index.js
import userInfo from './user_info'

const reducers = combineReducers(createReducer([userInfo]))
```
