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
import { db } from './firebase'

export type RideType = 'moto' | 'car'

export interface Ride {
    id: string
    date: string // ISO string
    amount: number
    type: RideType
    description?: string
    createdAt: number
}

export interface Payment {
    id: string
    date: string // ISO string
    amount: number
    notes?: string
    createdAt: number
}

interface AppState {
    rides: Ride[]
    payments: Payment[]
    loading: boolean
    initialized: boolean

    initializeSubscriptions: () => () => void // Returns unsubscribe function
    addRide: (ride: Omit<Ride, 'id' | 'createdAt'>) => Promise<void>
    removeRide: (id: string) => Promise<void>
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => Promise<void>
    removePayment: (id: string) => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
    rides: [],
    payments: [],
    loading: true,
    initialized: false,

    initializeSubscriptions: () => {
        // Prevent multiple subscriptions
        if (get().initialized) return () => { }

        set({ loading: true })

        const qRides = query(collection(db, 'rides'), orderBy('createdAt', 'desc'))
        const unsubRides = onSnapshot(qRides, (snapshot) => {
            const rides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ride))
            set({ rides })
        })

        const qPayments = query(collection(db, 'payments'), orderBy('createdAt', 'desc'))
        const unsubPayments = onSnapshot(qPayments, (snapshot) => {
            const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment))
            set({ payments, loading: false, initialized: true })
        })

        return () => {
            unsubRides()
            unsubPayments()
        }
    },

    addRide: async (ride) => {
        await addDoc(collection(db, 'rides'), {
            ...ride,
            createdAt: Date.now()
        })
    },

    removeRide: async (id) => {
        await deleteDoc(doc(db, 'rides', id))
    },

    addPayment: async (payment) => {
        await addDoc(collection(db, 'payments'), {
            ...payment,
            createdAt: Date.now()
        })
    },

    removePayment: async (id) => {
        await deleteDoc(doc(db, 'payments', id))
    }
}))
