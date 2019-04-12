import { IStateInfo } from './interface';
/*
 * @Description: 生成 reducer
 * @Author: Ben
 * @LastEditors: Ben
 * @Date: 2019-03-22 00:16:26
 * @LastEditTime: 2019-04-12 20:08:57
 */

export default function createReducer(stateInfo: IStateInfo): object {

  const { initState, reducerFunc, name } = stateInfo;
  const reducer = (state = initState, action) => {
    // split action.type
    const stateName = action.type.split('/')[0];
    const type = action.type.split('/')[1];
    if (stateName === name && Object.prototype.hasOwnProperty.call(reducerFunc, type)) {
      return reducerFunc[type](state, action)
    }
    return state
  }
  return reducer
}
