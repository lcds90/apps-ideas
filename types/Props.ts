export interface TheProjectProps {
    title: string
    description: string
    tier: 1 | 2 | 3
    stories: { id: string | number, done: boolean, description: string }[]
}