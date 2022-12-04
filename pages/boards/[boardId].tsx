import Head from 'next/head';
import { useRouter } from 'next/router';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
// import { initialBoardState, columns as initialColumns, tasks as initialTasks } from './mockupData';
import { SetStateAction, useEffect, useState } from 'react';
import { getBoardData } from '../../src/store/board/thunkBoard';
import { useAppDispatch, useAppSelector } from '../../src/hooks/hooks';
import { createColumnInBoard } from '../../src/store/board/thunkColumns';
import { createTask, deleteTaskById, updateSetOfTasks } from '../../src/store/board/thunkTasks';
import CreateTaskModal from '../../src/components/BoardPage/ModalBoardPage/ModalTaskAdd';
import s from '../../src/components/BoardPage/BoardPage.module.scss';
import IFormData from '../../src/components/BoardPage/ModalBoardPage/ModalTaskAdd';
import { ITask } from '../../src/store/board/Iboard';
import CreateColumnModal from '../../src/components/BoardPage/ModalBoardPage/ModalColumnAdd';

const Board = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { boardId } = router.query;
  const { columns } = useAppSelector((state) => state.board);
  const [ModalTaskAddState, setModalTaskAddState] = useState<boolean>(false);
  const [ModalColumnAddState, setModalColumnAddState] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  const [_columns, setTasksState] = useState();
  const [columnId, setColumnId] = useState();

  useEffect(() => {
    if (boardId === undefined || typeof boardId !== 'string') return;
    dispatch(getBoardData(boardId));
  }, [router]);

  useEffect(() => {
    setTasksState(columns);
  }, [columns]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === result.source.droppableId) {
      const column = _columns.filter((x: ITask) => x._id === result.source.droppableId); // колонка где случилось
      
      const tasksCopy = [...column[0].tasks]; // копия тасок

      const [movedColumn] = tasksCopy.splice(result.source.index, 1); // таска, которая переместилась
      tasksCopy.splice(result.destination.index, 0, movedColumn); // вставляем в новое место

      const newState = JSON.parse(JSON.stringify(_columns)); // дублируем общее состояние
      const newColumn = newState.filter((x: ITask) => x._id === result.source.droppableId); // находим в новом состоянии нужную колонку
      newColumn[0].tasks = [...tasksCopy]; // записываем в новую колонку новым массив тасок

      setTasksState(newState); // сохраняем новый стэйт

      const resToApi = newColumn[0].tasks.map((x: ITask, index: number) => ({
        _id: x._id,
        order: index,
        columnId: x.columnId,
      }));
      dispatch(updateSetOfTasks(resToApi));
    }
  };

  const handleCardDelete = (task: ITask) => {
    // убрать из колонки
    const column = _columns.filter((x: ITask) => x._id === task.columnId); // колонка где случилось
    let tasksCopy = [...column[0].tasks.filter((x: ITask) => x._id != task._id)]; // копия тасок без удаленной
    
    // поменять ордер у всех
    tasksCopy = tasksCopy.map((t: ITask, index: number) => ({
      ...t,
      order: index,
    }))
    
    const newState = JSON.parse(JSON.stringify(_columns)); // дублируем общее состояние
    const newColumn = newState.filter((x: ITask) => x._id === task.columnId); // находим в новом состоянии нужную колонку
    newColumn[0].tasks = [...tasksCopy]; // записываем в новую колонку новым массив тасок
    setTasksState(newState); // сохраняем новый стэйт
  
    // отправить на бэк удаленную
    dispatch(deleteTaskById({ boardId: boardId, columnId: task.columnId, taskId: task._id }));

    // отправить на бэк все остальные в колонке с новыми ордерами
    const resToApi = tasksCopy.map((x: ITask, index: number) => ({
      _id: x._id,
      order: index,
      columnId: x.columnId,
    }));
    dispatch(updateSetOfTasks(resToApi));

  };

  const handleColumnAdd = (formData: IFormData) => {
    const order = _columns.length;

    dispatch(createColumnInBoard({ 
      boardId: boardId,
      newParams: {
        title: formData.title,
        order: order,
      }
    }));
  };

  interface IFormData {
    title: string;
    desc: string;
  }
  
  const handleCardAdd = (formData: IFormData) => {  
    const column = _columns.filter((x: ITask) => x._id === columnId); // колонка где случилось
    const order = column[0].tasks.length;
    const userId = user?._id;
    const users = ['string'];

    // отправить запрос на бэк на добавление
    dispatch(createTask({ 
      boardId: boardId,
      columnId: columnId,
      newTaskParams: {
        title: formData.title,
        description: formData.desc,
        userId: userId,
        order: order,
        users: users
      }
    }))
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 2}px`;
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={s.boardHeader}>Board title</h1>
      <div className={s.columnsWrapper}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* <Droppable droppableId="columns">
            {(provided, snapshot) => ( */}
          <ul
            className={s.columnsList}
            // ref={provided.innerRef}
            // {...provided.droppableProps}
          >
            {_columns &&
              _columns.map((column) => (
                // <Draggable
                //   key={column._id}
                //   draggableId={column._id}
                //   index={index}
                // >
                //   {
                //     (provided) => (
                <li
                  key={column._id}
                  className={s.column}
                  // ref={provided.innerRef}
                  // {...provided.dragHandleProps}
                  // {...provided.draggableProps}
                >
                  <div className={s.columnContent}>
                    <div className={s.columnHeader}>
                      <textarea
                        className={s.columnTitleArea}
                        defaultValue={column.title}
                        name=''
                        rows={1}
                        id=''
                        onInput={handleKeyDown}
                      ></textarea>
                      <button className={s.columnDeleteBtn}>X</button>
                    </div>
                    <Droppable droppableId={column._id}>
                      {(provided, snapshot) => (
                        <ul
                          className={s.cardsList}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {column.tasks &&
                            column.tasks.map((task: ITask, index: number) => {
                              return (
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                  {(provided) => (
                                    <li
                                      key={task._id}
                                      className={s.card}
                                      ref={provided.innerRef}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                    >
                                      <div className={s.cardText}>{task.title}</div>
                                      <div className={s.cardDeleteBtn} onClick={() => handleCardDelete(task)}>
                                        X
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                    <button
                      className={s.cardAddBtn}
                      onClick={(e) => {
                        setColumnId(column._id);
                        setModalTaskAddState(true);
                      }}
                    >
                      Add card
                    </button>
                  </div>
                </li>
                //     )
                //   }
                // </Draggable>
              ))}
            {/* {provided.placeholder} */}
          </ul>
          {/* )}
          </Droppable> */}
        </DragDropContext>
        <div
          className={s.columnAddBtn}
          onClick={() => {
             setModalColumnAddState(true);
          }}
        >
          Add Column
        </div>
        <CreateTaskModal
          onConfirm={handleCardAdd}
          isShowModal={ModalTaskAddState}
          setIsShowModal={setModalTaskAddState}
        />
        <CreateColumnModal
          onConfirm={handleColumnAdd}
          isShowModal={ModalColumnAddState}
          setIsShowModal={setModalColumnAddState}
        />
      </div>
    </div>
  );
};

export default Board;
