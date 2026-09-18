import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/projectManager/addClient',
)({
  component: () => <div>Hello /_authenticated/addClient!</div>,
})
