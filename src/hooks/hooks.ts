import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispathc, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispathc>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;