import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    // 기본 방식
    // axios
    //   .get('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((response) => {
    //     setData(response.data);
    //   });

    // async await으로 재구성 함수 시작 부분에 async 추가
    try {
      const response =
        // await axios.get(
        //   'https://jsonplaceholder.typicode.com/todos/1',
        // );
        await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&apiKey=befd656583e343e199579faf19196e3a',
        );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default App;
