import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Banknote } from "lucide-react"

export default function PaymentsPage() {
    const payments = useStore((state) => state.payments)
    const sortedPayments = [...payments].sort((a, b) => b.createdAt - a.createdAt)

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Historial de Pagos</h2>

            {sortedPayments.length === 0 ? (
                <p className="text-muted-foreground">No hay pagos registrados.</p>
            ) : (
                <div className="space-y-3">
                    {sortedPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 text-green-600 p-2">
                                    <Banknote className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-green-600">-${payment.amount.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground capitalize">
                                        {format(new Date(payment.date), "dd MMMM yyyy", { locale: es })}
                                    </p>
                                    {payment.notes && (
                                        <p className="text-sm mt-1 text-muted-foreground line-clamp-1">
                                            {payment.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
