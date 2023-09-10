import {get, type Readable, writable} from "svelte/store";

function createReadableTimer(interval: number): Readable<number> {
  const timerWritable = writable(1);

  setInterval(() => timerWritable.update(t => ++t), interval);

  return timerWritable;
}

export const isRefreshing = writable(false);
export const refresher = createReadableTimer(1010 * 60)

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

refresher.subscribe(() => refreshData());
