import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { GlobalDispatcher, GlobalState } from '../store';

export const useAppDispatch = () => useDispatch<GlobalDispatcher>();
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;
