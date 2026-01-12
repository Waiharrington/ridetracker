import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"

export default function NewPaymentPage() {
    const navigate = useNavigate()
    const addPayment = useStore((state) => state.addPayment)

    const [amount, setAmount] = useState("")
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [notes, setNotes] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount) return

        addPayment({
            amount: parseFloat(amount),
            date,
            notes,
        })

        navigate(-1)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold">Nuevo Abono</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="amount">Monto</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-7 text-lg"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Notas (Opcional)</Label>
                    <Input
                        id="notes"
                        placeholder="Ej. Transferencia Zelle"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <Button type="submit" variant="secondary" className="w-full h-12 text-lg">
                    Registrar Pago
                </Button>
            </form>
        </div>
    )
}
