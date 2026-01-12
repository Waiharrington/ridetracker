import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore, type RideType } from "@/lib/store"
import { cn } from "@/lib/utils"

export default function NewRidePage() {
    const navigate = useNavigate()
    const addRide = useStore((state) => state.addRide)

    const [amount, setAmount] = useState("")
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [type, setType] = useState<RideType>("moto")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount) return

        addRide({
            amount: parseFloat(amount),
            date,
            type,
            description,
        })

        navigate(-1)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold">Nueva Carrera</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="amount">Precio</Label>
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
                    <Label>Tipo de Vehículo</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setType("moto")}
                            className={cn(
                                "flex h-20 flex-col items-center justify-center rounded-xl border-2 transition-all",
                                type === "moto"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-transparent bg-secondary text-muted-foreground hover:bg-secondary/80"
                            )}
                        >
                            <span className="text-2xl mb-1">🏍️</span>
                            <span className="font-semibold">Moto</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("car")}
                            className={cn(
                                "flex h-20 flex-col items-center justify-center rounded-xl border-2 transition-all",
                                type === "car"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-transparent bg-secondary text-muted-foreground hover:bg-secondary/80"
                            )}
                        >
                            <span className="text-2xl mb-1">🚗</span>
                            <span className="font-semibold">Carro</span>
                        </button>
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
                    <Label htmlFor="description">Descripción (Opcional)</Label>
                    <Input
                        id="description"
                        placeholder="Ej. Desde casa a oficina"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                    Guardar Carrera
                </Button>
            </form>
        </div>
    )
}
