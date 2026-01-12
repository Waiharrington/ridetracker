import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import DashboardPage from "./pages/dashboard-page"
import RidesPage from "./pages/rides-page"
import PaymentsPage from "./pages/payments-page"
import NewRidePage from "./pages/new-ride-page"
import NewPaymentPage from "./pages/new-payment-page"
import { useStore } from "@/lib/store"

function App() {
  const initializeSubscriptions = useStore((state) => state.initializeSubscriptions)

  useEffect(() => {
    const unsubscribe = initializeSubscriptions()
    return () => unsubscribe()
  }, [initializeSubscriptions])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="rides" element={<RidesPage />} />
          <Route path="rides/new" element={<NewRidePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="payments/new" element={<NewPaymentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

