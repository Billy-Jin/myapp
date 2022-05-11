import TodoListItem from './TodoListItem';
import { List } from 'react-virtualized';
import './TodoList.scss';
import React, { useCallback } from 'react';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [todos, onRemove, onToggle],
  );
  return (
    <List
      className="TodoList"
      width={512} //전체크기
      height={513} //전체높이
      rowCount={todos.length} // 항목 개수
      rowHeight={rowRenderer} // 항목을 렌더링 할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline스타일 제거
    />
  );
};

export default React.memo(TodoList);
