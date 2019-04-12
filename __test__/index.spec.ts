
const { createAction, createReducer } = require('../lib/index.js');

// just care reducers
const reducerFunc = {
  accept: (state, action) => action.payload, // key is constant
}

// reducer config
const userInfo = {
  name: 'userInfo', // store name
  initState: {},
  reducerFunc,
}

test('createAction', () => {
  expect(
    createAction(userInfo).accept()
  ).toEqual({
    type: 'userInfo/accept',
  });
  expect(
    createAction(userInfo).accept(1)
  ).toEqual({
    type: 'userInfo/accept',
    payload: 1
  });
  expect(
    createAction(userInfo).accept({ a: 'a' })
  ).toEqual({
    type: 'userInfo/accept',
    payload: { a: 'a' }
  })
})

test('createReducer', () => {
  expect(
    createReducer(userInfo)({}, { type: 'userInfo/accept', payload: 2 })
  ).toBe(2)
})
