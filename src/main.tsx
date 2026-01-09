import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import AppRouter from './router/AppRouter.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <MantineProvider>
        <Provider store={store}>
          <ToastProvider />
          <AppRouter />
        </Provider>
      </MantineProvider>
    </HeroUIProvider>
  </StrictMode>
)
