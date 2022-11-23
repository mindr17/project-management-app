import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBoards } from '../../store/boards/boardsThunk';
import { IBoard } from '../../store/boards/IBoard';

export const BoardList = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  useEffect(() =>{
    dispatch(getBoards());   
  }, []);
  
  return (
    <div className="s.board-list">
    {boards.length > 0 &&
      boards.map((board: IBoard, index) => <div key={index + 1} >{board.title}</div>)}
    </div>
  );
}