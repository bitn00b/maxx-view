import {get, writable} from "svelte/store";

export const isRefreshing = writable(false)

const listOfThingsToExecute: (() => Promise<void>)[] = [];

export function attachRefresher(taskToExecute: () => Promise<void>) {
  listOfThingsToExecute.push(taskToExecute);
}

export async function refreshData() {
  if (get(isRefreshing)) {
    return;
  }

  isRefreshing.set(true);

  for (const listOfThingsToExecuteElement of listOfThingsToExecute) {
    try {
      await listOfThingsToExecuteElement();
    } catch (e) {
      console.error('Error on refreshing', e);
    }
  }

  isRefreshing.set(false);
}
