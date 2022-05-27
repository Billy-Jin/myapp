import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};
const mapStateToProps = (state) => ({
  number: state.counter.number,
});

// 17-5

// const mapDispatchToProps = (dispatch) => ({
//   //임시함수
//   increase: () => {
//     dispatch(increase());
//   },
//   decrease: () => {
//     dispatch(decrease());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

//다른 방법
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  //   (dispatch) => ({
  //     increase: () => dispatch(increase()),
  //     decrease: () => dispatch(decrease()),
  //   }),
  { increase, decrease }, // bindActionCreators 동작 안됨. 없어도 동작됨
)(CounterContainer);
