import Head from 'next/head';
import { useRouter } from 'next/router';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
// import { initialBoardState, columns as initialColumns, tasks as initialTasks } from './mockupData';
import { SetStateAction, useEffect, useState } from 'react';
import { getBoardData } from '../../src/store/board/thunkBoard';
import { useAppDispatch, useAppSelector } from '../../src/hooks/hooks';
import {
  createColumnInBoard,
  deleteColumnById,
  updateSetOfColumns,
} from '../../src/store/board/thunkColumns';
import { createTask, deleteTaskById, updateSetOfTasks } from '../../src/store/board/thunkTasks';
import CreateTaskModal from '../../src/components/BoardPage/ModalBoardPage/ModalTaskAdd';
import s from '../../src/components/BoardPage/BoardPage.module.scss';
import IFormData from '../../src/components/BoardPage/ModalBoardPage/ModalTaskAdd';
import { IColumn, ITask } from '../../src/store/board/Iboard';
import CreateColumnModal from '../../src/components/BoardPage/ModalBoardPage/ModalColumnAdd';
import { updateColumns } from '../../src/store/board/sliceBoard';
import Preloader from '../../src/components/Preloader/Preloader';

export interface IFormDataModal {
  title: string;
  desc: string;
}

const Board = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { boardId } = router.query;
  const { columns, isLoading } = useAppSelector((state) => state.board);
  const [ModalTaskAddState, setModalTaskAddState] = useState<boolean>(false);
  const [ModalColumnAddState, setModalColumnAddState] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  const [_columns, setTasksState] = useState<IColumn[]>([]);
  const [columnId, setColumnId] = useState<string>('');

  useEffect(() => {
    if (boardId === undefined || typeof boardId !== 'string') return;
    dispatch(getBoardData(boardId));
  }, [router]);

  useEffect(() => {
    setTasksState(columns);
  }, [columns]);

  useEffect(() => {
    dispatch(updateColumns(_columns || [])); // Делаем один источник истины, записываем данные в глобальный state из локального useState
  }, [_columns, dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === result.source.droppableId) {
      const column = _columns.filter((x) => x._id === result.source.droppableId); // колонка где случилось

      const tasksCopy = [...column[0].tasks]; // копия тасок

      const [movedColumn] = tasksCopy.splice(result.source.index, 1); // таска, которая переместилась
      tasksCopy.splice(result.destination.index, 0, movedColumn); // вставляем в новое место

      const newState: IColumn[] = JSON.parse(JSON.stringify(_columns)); // дублируем общее состояние
      const newColumn = newState.filter((x) => x._id === result.source.droppableId); // находим в новом состоянии нужную колонку
      newColumn[0].tasks = [...tasksCopy]; // записываем в новую колонку новым массив тасок

      setTasksState(newState); // сохраняем новый стэйт

      const resToApi = newColumn[0].tasks.map((x, index) => ({
        _id: x._id,
        order: index,
        columnId: x.columnId,
      }));
      dispatch(updateSetOfTasks(resToApi));
    } else {
      const taskId = result.draggableId;

      const sourceColId = result.source.droppableId;
      const destColId = result.destination.droppableId;

      const columnSource = _columns.filter((x) => x._id === sourceColId); // колонка где было
      const tasksSourceCopy = [...columnSource[0].tasks]; // копия тасок
      const [movedTask] = tasksSourceCopy.splice(result.source.index, 1); // таска, которая переместилась
      let newTasksSource = tasksSourceCopy.filter((x) => x._id != taskId); // измененные таски первой колонки

      const columnDest = _columns.filter((x) => x._id === destColId); // колонка где было
      let newTasksDest = [...columnDest[0].tasks]; // копия тасок
      newTasksDest.splice(result.destination.index, 0, movedTask); // вставляем в новое место

      // поменять ордер
      newTasksSource = newTasksSource.map((t, index) => ({
        ...t,
        order: index,
      }));

      // поменять ордер
      newTasksDest = newTasksDest.map((t, index) => ({
        ...t,
        order: index,
      }));

      const newState: IColumn[] = JSON.parse(JSON.stringify(_columns)); // дублируем общее состояние

      const newStateSource = newState.find((x) => x._id == sourceColId);
      if (newStateSource) newStateSource.tasks = newTasksSource;

      const newStateDest = newState.find((x) => x._id == destColId);
      if (newStateDest) {
        newStateDest.tasks = newTasksDest;
        const t = newStateDest.tasks.find((x) => x._id == taskId);
        if (t) t.columnId = destColId;
      }

      setTasksState(newState); // сохраняем новый стэйт

      const resToApiSource = newTasksSource.map((x, index) => ({
        _id: x._id,
        order: index,
        columnId: x.columnId,
      }));

      const resToApiDest = newTasksDest.map((x, index) => ({
        _id: x._id,
        order: index,
        columnId: x.columnId,
      }));

      dispatch(updateSetOfTasks(resToApiSource));
      dispatch(updateSetOfTasks(resToApiDest));
    }
  };

  const handleTaskDelete = (task: ITask) => {
    // убрать из колонки
    const column = _columns.filter((x) => x._id === task.columnId); // колонка где случилось
    let tasksCopy = [...column[0].tasks.filter((x: ITask) => x._id != task._id)]; // копия тасок без удаленной

    // поменять ордер у всех
    tasksCopy = tasksCopy.map((t, index) => ({
      ...t,
      order: index,
    }));

    const newState = JSON.parse(JSON.stringify(_columns)); // дублируем общее состояние
    const newColumn = newState.filter((x: ITask) => x._id === task.columnId); // находим в новом состоянии нужную колонку
    newColumn[0].tasks = [...tasksCopy]; // записываем в новую колонку новым массив тасок
    setTasksState(newState); // сохраняем новый стэйт

    // отправить на бэк удаленную
    dispatch(deleteTaskById({ boardId: boardId, columnId: task.columnId, taskId: task._id }));

    // отправить на бэк все остальные в колонке с новыми ордерами
    const resToApi = tasksCopy.map((x, index) => ({
      _id: x._id,
      order: index,
      columnId: x.columnId,
    }));
    dispatch(updateSetOfTasks(resToApi));
  };

  const handleColumnAdd = (formData: IFormDataModal) => {
    const order = _columns.length;

    dispatch(
      createColumnInBoard({
        boardId: boardId,
        newParams: {
          title: formData.title,
          order: order,
        },
      })
    );
  };

  const handleCardAdd = (formData: IFormDataModal) => {
    const column = _columns.filter((x) => x._id === columnId); // колонка где случилось
    const order = column[0].tasks === undefined ? 0 : column[0].tasks.length;
    const userId = user ? user._id : '';
    const users = ['string'];

    // отправить запрос на бэк на добавление
    dispatch(
      createTask({
        boardId: boardId,
        columnId: columnId,
        newTaskParams: {
          title: formData.title,
          description: formData.desc,
          userId: userId,
          order: order,
          users: users,
        },
      })
    );
  };

  const handleColumnDelete = (column: IColumn) => {
    // убрать из колонок
    let columnsCopy: IColumn[] = JSON.parse(JSON.stringify(_columns));
    columnsCopy = columnsCopy.filter((col) => col._id !== column._id);

    // поменять ордер у всех
    columnsCopy = columnsCopy.map((c, index) => ({
      ...c,
      order: index,
    }));

    setTasksState(columnsCopy); // сохраняем новый стэйт

    // отправить на бэк удаленную
    dispatch(deleteColumnById({ boardId: boardId, columnId: column._id }));

    // отправить на бэк все остальные в колонке с новыми ордерами
    const resToApi = columnsCopy.map((x, index) => ({
      _id: x._id,
      order: index,
    }));
    dispatch(updateSetOfColumns(resToApi));
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 2}px`;
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Board</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className={s.boardHeader}>Board title</h1>
      {isLoading ? <Preloader /> : ''}
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
                      <input
                        className={s.columnTitleArea}
                        defaultValue={column.title}
                        name=''
                        rows={1}
                        id=''
                        // onInput={handleKeyDown}
                      ></input>
                      <button
                        className={s.columnDeleteBtn}
                        onClick={() => handleColumnDelete(column)}
                      >
                        X
                      </button>
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
                                      <div
                                        className={s.cardDeleteBtn}
                                        onClick={() => handleTaskDelete(task)}
                                      >
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
