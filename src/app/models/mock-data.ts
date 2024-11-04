import { Todo } from './todo'

export const TODOS_MOCK: Todo[] = [
  {
    id: '1',
    title: 'Complete online JavaScript course',
    status: 'completed',
    createdAt: new Date('2024-11-01T09:00:00'),
    completedAt: new Date('2024-11-02T10:30:00')
  },
  {
    id: '2',
    title: 'Jog around the park 3x',
    status: 'active',
    createdAt: new Date('2024-11-01T10:00:00')
  },
  {
    id: '3',
    title: '10 minutes meditation',
    status: 'active',
    createdAt: new Date('2024-11-01T11:00:00')
  },
  {
    id: '4',
    title: 'Read for 1 hour',
    status: 'active',
    createdAt: new Date('2024-11-01T12:00:00')
  },
  {
    id: '5',
    title: 'Pick up groceries',
    status: 'active',
    createdAt: new Date('2024-11-01T13:00:00')
  },
  {
    id: '6',
    title: 'Complete Todo App on Frontend Mentor',
    status: 'active',
    createdAt: new Date('2024-11-01T14:00:00')
  }
]
