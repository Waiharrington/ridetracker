import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Car, Bike } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RidesPage() {
    const rides = useStore((state) => state.rides)
    const sortedRides = [...rides].sort((a, b) => b.createdAt - a.createdAt)

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Historial de Carreras</h2>

            {sortedRides.length === 0 ? (
                <p className="text-muted-foreground">No hay carreras registradas.</p>
            ) : (
                <div className="space-y-3">
                    {sortedRides.map((ride) => (
                        <div key={ride.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-secondary p-2">
                                    {ride.type === 'moto' ? <Bike className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">${ride.amount.toFixed(2)}</p>
                                        <Badge variant={ride.type === 'moto' ? 'secondary' : 'default'} className="text-[10px] h-5 px-1.5">
                                            {ride.type === 'moto' ? 'Moto' : 'Carro'}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground capitalize">
                                        {format(new Date(ride.date), "dd MMMM yyyy", { locale: es })}
                                    </p>
                                    {ride.description && (
                                        <p className="text-sm mt-1 text-muted-foreground line-clamp-1">
                                            {ride.description}
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
