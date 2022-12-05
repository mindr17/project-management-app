import Head from 'next/head';
import { useRouter } from 'next/router';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
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
import { IColumn, ITask } from '../../src/store/board/Iboard';
import CreateColumnModal from '../../src/components/BoardPage/ModalBoardPage/ModalColumnAdd';
import { updateColumns } from '../../src/store/board/sliceBoard';
import Preloader from '../../src/components/Preloader/Preloader';
import Modal from '../../src/components/ModalDelete/Modal';

export interface IFormDataModal {
  title: string;
  desc: string;
}

const Board = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { columns, isLoading } = useAppSelector((state) => state.board);
  const [modalTaskAddState, setModalTaskAddState] = useState<boolean>(false);
  const [modalColumnAddState, setModalColumnAddState] = useState<boolean>(false);
  const [modalTaskDeleteState, setModalTaskDeleteState] = useState<boolean>(false);
  const [modalColumnDeleteState, setModalColumnDeleteState] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  const defaultTask = {
    _id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    users: [''],
  };

  const defaultColumn = {
    _id: '',
    title: '',
    order: 0,
    boardId: '',
    tasks: [defaultTask],
  };

  const [_columns, setTasksState] = useState<IColumn[]>([]);
  const [columnId, setColumnId] = useState<string>('');
  const [taskDeleteState, setTaskDeleteState] = useState<ITask>(defaultTask);
  const [columnDeleteState, setColumnDeleteState] = useState<IColumn>(defaultColumn);

  useEffect(() => {
    if (boardId === undefined || typeof boardId !== 'string') return;
    dispatch(getBoardData(boardId));
  }, [router]);

  useEffect(() => {
    setTasksState(columns);
  }, [columns]);

  useEffect(() => {
    dispatch(updateColumns(_columns || []));
  }, [_columns, dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === result.source.droppableId) {
      const column = _columns.filter((x) => x._id === result.source.droppableId);

      const tasksCopy = [...column[0].tasks];

      const [movedColumn] = tasksCopy.splice(result.source.index, 1);
      tasksCopy.splice(result.destination.index, 0, movedColumn);

      const newState: IColumn[] = JSON.parse(JSON.stringify(_columns));
      const newColumn = newState.filter((x) => x._id === result.source.droppableId);
      newColumn[0].tasks = [...tasksCopy];

      setTasksState(newState);

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

      const columnSource = _columns.filter((x) => x._id === sourceColId);
      const tasksSourceCopy = [...columnSource[0].tasks];
      const [movedTask] = tasksSourceCopy.splice(result.source.index, 1);
      let newTasksSource = tasksSourceCopy.filter((x) => x._id != taskId);
      const columnDest = _columns.filter((x) => x._id === destColId);
      let newTasksDest = [...columnDest[0].tasks];
      newTasksDest.splice(result.destination.index, 0, movedTask);

      newTasksSource = newTasksSource.map((t, index) => ({
        ...t,
        order: index,
      }));

      newTasksDest = newTasksDest.map((t, index) => ({
        ...t,
        order: index,
      }));

      const newState: IColumn[] = JSON.parse(JSON.stringify(_columns));
      const newStateSource = newState.find((x) => x._id == sourceColId);
      if (newStateSource) newStateSource.tasks = newTasksSource;

      const newStateDest = newState.find((x) => x._id == destColId);
      if (newStateDest) {
        newStateDest.tasks = newTasksDest;
        const t = newStateDest.tasks.find((x) => x._id == taskId);
        if (t) t.columnId = destColId;
      }

      setTasksState(newState);

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

  const handleTaskDelete = () => {
    const column = _columns.filter((x) => x._id === taskDeleteState.columnId);
    let tasksCopy = [...column[0].tasks.filter((x: ITask) => x._id != taskDeleteState._id)];

    tasksCopy = tasksCopy.map((t, index) => ({
      ...t,
      order: index,
    }));

    const newState = JSON.parse(JSON.stringify(_columns));
    const newColumn = newState.filter((x: ITask) => x._id === taskDeleteState.columnId);
    newColumn[0].tasks = [...tasksCopy];
    setTasksState(newState);

    dispatch(
      deleteTaskById({
        boardId: boardId,
        columnId: taskDeleteState.columnId,
        taskId: taskDeleteState._id,
      })
    );

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
    const column = _columns.filter((x) => x._id === columnId);
    const order = column[0].tasks === undefined ? 0 : column[0].tasks.length;
    const userId = user ? user._id : '';
    const users = ['string'];

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

  const handleColumnDelete = () => {
    let columnsCopy: IColumn[] = JSON.parse(JSON.stringify(_columns));
    columnsCopy = columnsCopy.filter((col) => col._id !== columnDeleteState._id);

    columnsCopy = columnsCopy.map((c, index) => ({
      ...c,
      order: index,
    }));

    setTasksState(columnsCopy);

    dispatch(deleteColumnById({ boardId: boardId, columnId: columnDeleteState._id }));

    const resToApi = columnsCopy.map((x, index) => ({
      _id: x._id,
      order: index,
    }));
    dispatch(updateSetOfColumns(resToApi));
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
          <ul className={s.columnsList}>
            {_columns &&
              _columns.map((column) => (
                <li key={column._id} className={s.column}>
                  <div className={s.columnContent}>
                    <div className={s.columnHeader}>
                      <input
                        className={s.columnTitleArea}
                        defaultValue={column.title}
                        name=''
                        id=''
                      ></input>
                      <button
                        className={s.columnDeleteBtn}
                        onClick={() => {
                          setColumnDeleteState(column);
                          setModalColumnDeleteState(true);
                        }}
                      >
                        X
                      </button>
                    </div>
                    <Droppable droppableId={column._id}>
                      {(provided) => (
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
                                        onClick={() => {
                                          setTaskDeleteState(task);
                                          setModalTaskDeleteState(true);
                                        }}
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
                      onClick={() => {
                        setColumnId(column._id);
                        setModalTaskAddState(true);
                      }}
                    >
                      Add card
                    </button>
                  </div>
                </li>
              ))}
          </ul>
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
          isShowModal={modalTaskAddState}
          setIsShowModal={setModalTaskAddState}
        />
        <CreateColumnModal
          onConfirm={handleColumnAdd}
          isShowModal={modalColumnAddState}
          setIsShowModal={setModalColumnAddState}
        />
        <Modal
          onConfirm={handleTaskDelete}
          title={'Delete task?'}
          isShowModal={modalTaskDeleteState}
          setIsShowModal={setModalTaskDeleteState}
        />
        <Modal
          onConfirm={handleColumnDelete}
          title={'Delete column?'}
          isShowModal={modalColumnDeleteState}
          setIsShowModal={setModalColumnDeleteState}
        />
      </div>
    </div>
  );
};

export default Board;
