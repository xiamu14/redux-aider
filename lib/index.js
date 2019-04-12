(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['redux-aider'] = factory());
}(this, function () { 'use strict';

  /*
   * @Description: 生成 reducer
   * @Author: Ben
   * @LastEditors: Ben
   * @Date: 2019-03-22 00:16:26
   * @LastEditTime: 2019-04-12 17:22:31
   */
  function createAction(stateInfo) {
      var actionObj = {};
      var actions = Object.keys(stateInfo.reducerFunc);
      if (actions.length === 0) {
          throw new TypeError("Redux Reducer can't be empty.");
      }
      actions.forEach(function (item) {
          actionObj[item] = function (payload) {
              return {
                  type: stateInfo.name + "/" + item,
                  payload: payload,
              };
          };
      });
      return actionObj;
  }

  /*
   * @Description: 生成 reducer
   * @Author: Ben
   * @LastEditors: Ben
   * @Date: 2019-03-22 00:16:26
   * @LastEditTime: 2019-04-12 18:22:39
   */
  function createReducer(stateInfo) {
      var reducer = {};
      var initState = stateInfo.initState, reducerFunc = stateInfo.reducerFunc, name = stateInfo.name;
      reducer["" + name] = function (state, action) {
          if (state === void 0) { state = initState; }
          // split action.type
          var stateName = action.type.split('/')[0];
          var type = action.type.split('/')[1];
          if (stateName === name && Object.prototype.hasOwnProperty.call(reducerFunc, type)) {
              return reducerFunc[type](state, action);
          }
          return state;
      };
      return reducer;
  }

  function combindReducers(reducerArr, reducers) {
      // 将 reducersArr 数组转换成数组
      var reducerObj = {};
      reducerArr.map(function (reducer) {
          var name = Object.keys(reducer)[0];
          reducerObj[name] = reducer[name];
      });
      // 第一个只是先过滤一遍 把非function的reducer过滤掉
      var reducerKeys = Object.keys(reducerObj);
      var finalReducers = {};
      reducerKeys.forEach(function (key) {
          if (typeof reducers[key] === 'function') {
              finalReducers[key] = reducers[key];
          }
      });
      var finalReducersKeys = Object.keys(finalReducers);
      // 第二步比较重要 就是将所有reducer合在一起
      // 根据key调用每个reducer，将他们的值合并在一起
      var hasChange = false;
      var nextState = {};
      return function combind(state, action) {
          if (state === void 0) { state = {}; }
          finalReducersKeys.forEach(function (key) {
              var previousValue = state[key];
              var nextValue = reducers[key](previousValue, action);
              nextState[key] = nextValue;
              hasChange = hasChange || previousValue !== nextValue;
          });
          return hasChange ? nextState : state;
      };
  }

  /*
   * @Description: 导出工具
   * @Author: Ben
   * @LastEditors: Ben
   * @Date: 2019-03-17 13:36:19
   * @LastEditTime: 2019-04-12 19:06:20
   */
  var reduxAider = {
      createAction: createAction,
      createReducer: createReducer,
      combineReducers: combindReducers,
  };

  return reduxAider;

}));
