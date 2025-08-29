import DashboardPage from '@/components/pages/DashboardPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    )
}
