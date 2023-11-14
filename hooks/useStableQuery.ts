import { useRef } from 'react'
import { useQuery } from 'convex/react'

/**
 * A custom hook that returns the result of a query and stores it in a ref.
 * This ensures that the query result remains stable across re-renders.
 * @param query - The query function to execute.
 * @param args - Optional arguments to pass to the query function.
 * @returns The result of the query function, or undefined if the result is not yet available.
 */

export const useStableQuery = ((query, ...args) => {
  const result = useQuery(query, ...args)

  // useRef() creates an object that does not change between re-renders
  // stored.current will be result (undefined) on the first render
  const stored = useRef(result)

  // After the first render, stored.current only changes if I change it
  // if result is undefined, fresh data is loading and we should do nothing
  if (result !== undefined) {
    // if a freshly loaded result is available, use the ref to store it
    stored.current = result
  }

  // undefined on first load, stale data while reloading, fresh data after loading
  return stored.current
}) as typeof useQuery // make sure we match the useQuery signature & return type
