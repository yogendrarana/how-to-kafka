import { StrictMode } from 'react'
import router from './router/router.tsx'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
