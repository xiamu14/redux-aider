import { IStateInfo } from './interface';
/*
 * @Description: 生成 reducer
 * @Author: Ben
 * @LastEditors: Ben
 * @Date: 2019-03-22 00:16:26
 * @LastEditTime: 2019-04-12 17:22:31
 */
export default function createAction(stateInfo: IStateInfo): object {
  const actionObj = {}
  const actions = Object.keys(stateInfo.reducerFunc);
  if (actions.length === 0) {
    throw new TypeError("Redux Reducer can't be empty.");
  }
  actions.forEach(item => {
    actionObj[item] = payload => {
      return {
        type: `${stateInfo.name}/${item}`,
        payload,
      }
    }
  })
  return actionObj
}
