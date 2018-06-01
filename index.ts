// Taken from https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

type FunctionType = (...args: any[]) => any
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType }
type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>

interface Action<T extends string> {
  type: T
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

function createAction<T extends string>(type: T): Action<T>
function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>
function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
