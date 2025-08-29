import SymptomChecker from '@/components/pages/SymptomChecker'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function SymptomCheckerPage() {
    return (
        <ProtectedRoute>
            <SymptomChecker />
        </ProtectedRoute>
    )
}
