
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use instead of plain `useDispatch` to get the correct thunk-aware dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Use instead of plain `useSelector` so state is typed as RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;