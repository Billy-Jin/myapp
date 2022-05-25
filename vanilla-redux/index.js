import { createStore } from "redux";

// 16.2.3 DOM 레퍼런스 만들기
/*
이번 프로젝트에서는 UI를 관리할 때 별도의 라이브러리를 
사용하지 않기 때문에 DOM을 직접 수정해 주어야 한다. 
*/
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 16.2.4 액션타입과 액션 생성 함수 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 16.2.5 초기 값 설정
const initialState = {
  toggle: false,
  counter: 0,
};

// 16.2.6 리듀서 함수 정의
/*
리듀서 함수가 맨 처음 호출 될 때는 state 값이 undefined 이다.
해당 값이 undefined로 주어졌을 때는 initialState를 기본값으로 
설정하기 위해 함수의 파라미터 쪽에 기본값이 설정되어 있다.

리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 주어야한다.
이 작업은 sppread 연산자(...)를 사용하면 편하다. 단, 객체의 구조가 
복잡해지면 spread 연산자로 불변성을 관리하며 업데이트하는 것이
굉장히 번거로울 수 있고 코드의 가독성도 나빠지기 때문에
리덕스의 상태는 최대한 깊지 않은 구조로 진행하는 것이 좋다.

객체의 구조가 복잡해지거나 배열도 함께 다루는 경우 immer 라이브러리를 
사용하면 좀 더 쉽게 리듀서를 작성할 수 있다.
*/

// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  //action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지를 잘 해주어야 한다.(spred 연산자 사용)
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); // 현재 상태를 불러온다.
  // 토글처리
  console.log(state, divToggle.classList);
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();

// 16.2.9 구독하기
store.subscribe(render);

// 16.2.10 액션 발생시키기

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
