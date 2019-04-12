
export default function combindReducers(reducerArr, reducers) {
  // 将 reducersArr 数组转换成数组
  const reducerObj = {};
  reducerArr.map(reducer => {
    const name = Object.keys(reducer)[0];
    reducerObj[name] = reducer[name];
  })
  // 第一个只是先过滤一遍 把非function的reducer过滤掉
  const reducerKeys = Object.keys(reducerObj);
  const finalReducers = {}
  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  })
  const finalReducersKeys = Object.keys(finalReducers)
  // 第二步比较重要 就是将所有reducer合在一起
  // 根据key调用每个reducer，将他们的值合并在一起
  let hasChange = false;
  const nextState = {};
  return function combind(state = {}, action) {
    finalReducersKeys.forEach((key) => {
      const previousValue = state[key];
      const nextValue = reducers[key](previousValue, action);
      nextState[key] = nextValue;
      hasChange = hasChange || previousValue !== nextValue
    })
    return hasChange ? nextState : state;
  }
}
