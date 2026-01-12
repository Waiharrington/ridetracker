import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Banknote, CarFront } from "lucide-react"
import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function DashboardPage() {
    const navigate = useNavigate()
    const rides = useStore((state) => state.rides)
    const payments = useStore((state) => state.payments)

    const totalRides = rides.reduce((acc, r) => acc + r.amount, 0)
    const totalPayments = payments.reduce((acc, p) => acc + p.amount, 0)
    const balance = totalRides - totalPayments

    // Combine actions for recent activity
    const recentActivity = [
        ...rides.map(r => ({ ...r, type: 'ride', sortDate: r.createdAt })),
        ...payments.map(p => ({ ...p, type: 'payment', sortDate: p.createdAt }))
    ].sort((a, b) => b.sortDate - a.sortDate).slice(0, 5)

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary via-primary/90 to-blue-600 text-primary-foreground border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="text-lg font-medium opacity-90">Balance Actual</CardTitle>
                    <div className="text-4xl font-bold tracking-tight">
                        ${balance.toFixed(2)}
                    </div>
                    <p className="text-sm opacity-80">
                        {balance > 0 ? "Le debes a Angelo" : "Todo pagado (o a favor)"}
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="secondary"
                            className="w-full font-semibold shadow-sm"
                            onClick={() => navigate("/rides/new")}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Nueva Carrera
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full font-semibold shadow-sm"
                            onClick={() => navigate("/payments/new")}
                        >
                            <Banknote className="mr-2 h-4 w-4" /> Abonar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">Actividad Reciente</h3>

                {recentActivity.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hay movimientos recientes.</p>
                ) : (
                    <div className="space-y-3">
                        {recentActivity.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-card">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${item.type === 'ride' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                        {item.type === 'ride' ? <CarFront className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">
                                            {item.type === 'ride' ? (item.description || 'Carrera') : (item.notes || 'Abono')}
                                        </p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {format(new Date(item.date), "dd MMM yyyy", { locale: es })}
                                        </p>
                                    </div>
                                </div>
                                <div className={`font-bold ${item.type === 'ride' ? 'text-foreground' : 'text-green-600'}`}>
                                    {item.type === 'ride' ? '+' : '-'}${item.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
