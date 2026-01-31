import { create } from 'zustand'
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore'
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth'
import { db, auth } from './firebase'

export type RideType = 'moto' | 'car'

export interface Ride {
    id: string
    date: string // ISO string
    amount: number
    type: RideType
    description?: string
    createdBy?: string
    createdAt: number
}

export interface Payment {
    id: string
    date: string // ISO string
    amount: number
    notes?: string
    createdBy?: string
    createdAt: number
}

interface AppState {
    user: User | null
    authLoading: boolean // Separate loading for auth
    rides: Ride[]
    payments: Payment[]
    dataLoading: boolean
    initialized: boolean

    initializeSubscriptions: () => () => void
    login: (email: string, pass: string) => Promise<void>
    logout: () => Promise<void>
    addRide: (ride: Omit<Ride, 'id' | 'createdAt' | 'createdBy'>) => Promise<void>
    removeRide: (id: string) => Promise<void>
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'createdBy'>) => Promise<void>
    removePayment: (id: string) => Promise<void>
}

const getUserName = (email: string | null | undefined): string => {
    if (!email) return "Desconocido"
    if (email.includes("angelo")) return "Angelo"
    if (email.includes("waikoloa")) return "Wai"
    return email.split("@")[0]
}

export const useStore = create<AppState>((set, get) => ({
    user: null,
    authLoading: true,
    rides: [],
    payments: [],
    dataLoading: false,
    initialized: false,

    initializeSubscriptions: () => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            set({ user, authLoading: false })

            if (user && !get().initialized) {
                set({ dataLoading: true })

                const qRides = query(collection(db, 'rides'), orderBy('createdAt', 'desc'))
                onSnapshot(qRides, (snapshot) => {
                    const rides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ride))
                    set({ rides })
                })

                const qPayments = query(collection(db, 'payments'), orderBy('createdAt', 'desc'))
                onSnapshot(qPayments, (snapshot) => {
                    const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment))
                    set({ payments, dataLoading: false, initialized: true })
                })
            } else if (!user) {
                set({ rides: [], payments: [], initialized: false })
            }
        })

        return () => unsubAuth()
    },

    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },

    logout: async () => {
        await signOut(auth)
        set({ user: null, rides: [], payments: [], initialized: false })
    },

    addRide: async (ride) => {
        const user = get().user
        await addDoc(collection(db, 'rides'), {
            ...ride,
            createdBy: getUserName(user?.email),
            createdAt: Date.now()
        })
    },

    removeRide: async (id) => {
        await deleteDoc(doc(db, 'rides', id))
    },

    addPayment: async (payment) => {
        const user = get().user
        await addDoc(collection(db, 'payments'), {
            ...payment,
            createdBy: getUserName(user?.email),
            createdAt: Date.now()
        })
    },

    removePayment: async (id) => {
        await deleteDoc(doc(db, 'payments', id))
    }
}))
