import { store } from '../store';
import { thunks } from './thunks';
import { IApp } from '../types';

describe('thunks', () => {
  test('should handle connectThunk', async () => {
    const initialAppState: IApp = { isConnected: false };
    expect(store.getState().app).toEqual(
      expect.objectContaining({
        ...initialAppState,
      })
    );
    await store.dispatch(thunks.connectThunk());
    expect(store.getState().app).toEqual(
      expect.objectContaining({
        isConnected: true,
      })
    );
  });
});
