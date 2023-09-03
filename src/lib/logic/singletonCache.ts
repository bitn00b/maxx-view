export function singletonCache<TResult>() {
  const CACHE: Record<string, Promise<TResult>> = {};

  return {
    get: (key: string, getter: () => Promise<TResult>) => {
      return CACHE[key] ?? (CACHE[key] = getter());
    }
  }
}
