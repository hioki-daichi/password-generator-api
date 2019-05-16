const passwordLength = 16;

enum Finger {
  LIndex,
  LMiddle,
  LRing,
  LChild,
  RIndex,
  RMiddle,
  RRing,
  RChild
}

export default class PasswordGenerator {
  constructor() {}

  generate(): string {
    const lFingers = shuffle([
      Finger.LIndex,
      Finger.LMiddle,
      Finger.LRing,
      Finger.LChild
    ]);

    const rFingers = shuffle([
      Finger.RIndex,
      Finger.RMiddle,
      Finger.RRing,
      Finger.RChild
    ]);

    const fingers = lFingers
      .map((f: Finger, idx: number) => [f, rFingers[idx]])
      .reduce((acc: Finger[], cur: Finger[]) => acc.concat(cur), []);

    return [...Array(passwordLength)]
      .map((_, idx: number) => this.randomKey(fingers[idx % fingers.length]))
      .join("");
  }

  private randomKey(f: Finger): string {
    let keys = "";

    switch (f) {
      case Finger.LIndex:
        keys += "tgbrfv";
        break;
      case Finger.LMiddle:
        keys += "edc";
        break;
      case Finger.LRing:
        keys += "wsx";
        break;
      case Finger.LChild:
        keys += "qaz";
        break;
      case Finger.RIndex:
        keys += "yhnujm";
        break;
      case Finger.RMiddle:
        keys += "ik";
        break;
      case Finger.RRing:
        keys += "ol";
        break;
      case Finger.RChild:
        keys += "p";
        break;
    }

    return keys[Math.floor(Math.random() * keys.length)];
  }
}

function shuffle<T>(array: T[]): T[] {
  let copy: T[] = [];
  let n = array.length;
  let i: number;

  while (n) {
    i = Math.floor(Math.random() * array.length);

    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}
