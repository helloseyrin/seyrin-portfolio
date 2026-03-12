// Resolve dot-notation paths with optional keyed array lookup.
// Syntax: "entries[id=business-analysis].bullets[0]" or "bio[1]"

type Obj = Record<string, unknown>;

function resolveSegment(current: unknown, segment: string): unknown {
  const keyedMatch = segment.match(/^(\w+)\[(\w+)=(.+)\]$/);
  if (keyedMatch) {
    const [, field, key, val] = keyedMatch;
    const arr = (current as Obj)[field] as Obj[];
    return arr?.find((item) => String(item[key]) === val);
  }
  const indexedMatch = segment.match(/^(\w+)\[(\d+)\]$/);
  if (indexedMatch) {
    const [, field, idx] = indexedMatch;
    const arr = (current as Obj)[field] as unknown[];
    return arr?.[Number(idx)];
  }
  return (current as Obj)[segment];
}

export function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((cur, seg) => resolveSegment(cur, seg), obj);
}

export function setByPath(obj: unknown, path: string, value: unknown): unknown {
  const clone = JSON.parse(JSON.stringify(obj));
  const segments = path.split(".");

  function recurse(current: unknown, segs: string[]): void {
    const [head, ...rest] = segs;

    const keyedMatch = head.match(/^(\w+)\[(\w+)=(.+)\]$/);
    const indexedMatch = head.match(/^(\w+)\[(\d+)\]$/);

    if (keyedMatch) {
      const [, field, key, val] = keyedMatch;
      const arr = (current as Obj)[field] as Obj[];
      const item = arr?.find((i) => String(i[key]) === val);
      if (!item) return;
      if (rest.length === 0) {
        // shouldn't happen — can't replace a whole keyed item this way
        return;
      }
      recurse(item, rest);
      return;
    }

    if (indexedMatch) {
      const [, field, idx] = indexedMatch;
      const arr = (current as Obj)[field] as unknown[];
      if (rest.length === 0) {
        arr[Number(idx)] = value;
      } else {
        recurse(arr[Number(idx)], rest);
      }
      return;
    }

    if (rest.length === 0) {
      (current as Obj)[head] = value;
    } else {
      recurse((current as Obj)[head], rest);
    }
  }

  recurse(clone, segments);
  return clone;
}
