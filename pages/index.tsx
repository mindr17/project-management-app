import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../src/hooks/hooks';
import { CreateColumnInBoard, GetBoardData } from '../src/store/board/boardThunk';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handelClickColumns = () => {
    dispatch(GetBoardData('63824ac6cd1e87dffe860ee3'));
  };

  const mockDataCreateColumn = {
    boardId: '63824ac6cd1e87dffe860ee3',
    newParams: {
      title: 'test',
      order: 1,
    },
  };

  const handelCreateColumn = () => {
    dispatch(CreateColumnInBoard(mockDataCreateColumn));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <button onClick={handelClickColumns}> board data</button>
        <button onClick={handelCreateColumn}> Create column</button>
        {user ? (
          <h1 className={styles.title}> {`Welcome ${user.name}`}</h1>
        ) : (
          <h1 className={styles.title}>You need to login</h1>
        )}
      </main>
    </div>
  );
}
