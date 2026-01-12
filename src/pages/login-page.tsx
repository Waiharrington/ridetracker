import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const navigate = useNavigate()
    const login = useStore((state) => state.login)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        console.log("--- DEBUG INFO ---")
        const key = import.meta.env.VITE_FIREBASE_API_KEY || ""
        console.log("API Key Status:", key ? "Loaded ✅" : "MISSING ❌")
        console.log("API Key Length:", key.length)
        console.log("Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
        console.log("------------------")
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            console.log("Attempting login with:", email);
            await login(email, password)
            console.log("Login successful");
            navigate("/")
        } catch (err: unknown) {
            console.error("Login Error Full Object:", err);
            // @ts-ignore
            console.error("Login Error Code:", err.code);
            // @ts-ignore
            console.error("Login Error Message:", err.message);
            setError("Error al iniciar sesión. Verifica tus datos.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md border-none shadow-xl bg-card">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">RideTracker</CardTitle>
                    <CardDescription>
                        Ingresa tu correo y contraseña para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-destructive text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
