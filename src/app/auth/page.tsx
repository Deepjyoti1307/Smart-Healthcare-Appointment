import AuthPage from '@/components/pages/AuthPage'
import { PublicRoute } from '@/components/PublicRoute'

export default function Auth() {
    return (
        <PublicRoute>
            <AuthPage />
        </PublicRoute>
    )
}
