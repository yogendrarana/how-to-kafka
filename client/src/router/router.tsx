import { createBrowserRouter } from "react-router"
import HomePage from "../pages/home"
import Checkout from "../pages/checkout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/checkout",
    element:<Checkout />
  }
])

export default router