import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Layout from "./components/layout"
import DashboardPage from "./pages/dashboard-page"
import RidesPage from "./pages/rides-page"
import PaymentsPage from "./pages/payments-page"
import NewRidePage from "./pages/new-ride-page"
import NewPaymentPage from "./pages/new-payment-page"
import LoginPage from "./pages/login-page"
import { useStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user)
  const authLoading = useStore((state) => state.authLoading)
  const location = useLocation()

  if (authLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  const initializeSubscriptions = useStore((state) => state.initializeSubscriptions)

  useEffect(() => {
    const unsubscribe = initializeSubscriptions()
    return () => unsubscribe()
  }, [initializeSubscriptions])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
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

