interface Todo {
    id: string,
    todo: string,
    isDone: boolean,
}

type Actions = {
    type: 'add' | 'delete' | 'done',
    payload: string
  }

export type { Todo, Actions }