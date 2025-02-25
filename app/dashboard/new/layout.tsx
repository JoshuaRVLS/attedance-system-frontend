import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Student',
    description: 'Create New Student'
}

export default function NewStudentLayout({children}: {children: React.ReactNode}) {
    return <>{children}</>
}