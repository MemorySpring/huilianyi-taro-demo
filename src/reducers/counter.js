import { handleActions } from 'redux-actions'
import { ADD, MINUS } from '../../../huilianyi-taro-demo/src/constants/counter'

export default handleActions({
  [ADD] (state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [MINUS] (state) {
    return {
      ...state,
      num: state.num - 1
    }
  }
}, {
  num: 0
})
