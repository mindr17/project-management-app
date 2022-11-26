import { useRouter } from 'next/router';

const Board = () => {
  const router = useRouter();
  const { bid } = router.query;

  return (
    <>
      <p>Board: {bid}</p>
     
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
      <div>Board: {bid}</div>
    </>
  )
}

export default Board;
