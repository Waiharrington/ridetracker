import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Banknote, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentsPage() {
    const payments = useStore((state) => state.payments)
    const removePayment = useStore((state) => state.removePayment)
    const sortedPayments = [...payments].sort((a, b) => b.createdAt - a.createdAt)

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Seguro que quieres borrar este pago?")) {
            await removePayment(id)
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Historial de Pagos</h2>

            {sortedPayments.length === 0 ? (
                <p className="text-muted-foreground">No hay pagos registrados.</p>
            ) : (
                <div className="space-y-3">
                    {sortedPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm group">
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
                                    {payment.createdBy && (
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            Por: <span className="font-medium text-foreground">{payment.createdBy}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDelete(payment.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
