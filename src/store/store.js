import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import packagesReducer from './slices/packagesSlice';
import clientReducer from './slices/clientSlice';
import invoiceReducer from './slices/invoiceSlice';
import loginActivityReducer from './slices/loginActivitySlice'
import assignedPackagesReducer from './slices/assignedPackagesSlice';
import paymentHistoryReducer from './slices/paymentHistorySlice';
import brandsReducer from './slices/brandSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packagesReducer,
  clients: clientReducer,
  invoices: invoiceReducer,
  loginActivity: loginActivityReducer,
  assignedPackages: assignedPackagesReducer,
  paymentHistory: paymentHistoryReducer,
  brands: brandsReducer
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','packages','clients','invoices','loginActivity','assignedPackages','paymentHistory','brands'], // Remove 'packages' if you want fresh API fetches on reload
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);