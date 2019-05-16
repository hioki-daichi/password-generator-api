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

export class PasswordGenerator {
  readonly useNumber: boolean;
  readonly useSign: boolean;

  constructor(useNumber: boolean, useSign: boolean) {
    this.useNumber = useNumber;
    this.useSign = useSign;
  }

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

    const lLen = lFingers.length;
    const rLen = rFingers.length;

    let lIdx = 0,
      rIdx = 0,
      isNextLeft = true,
      ret = "";

    for (let i = 0; i < passwordLength; i++) {
      if (isNextLeft) {
        ret += this.randomKey(lFingers[lIdx]);
        lIdx = (lIdx + 1) % lLen;
      } else {
        ret += this.randomKey(rFingers[rIdx]);
        rIdx = (rIdx + 1) % rLen;
      }

      isNextLeft = !isNextLeft;
    }

    return ret;
  }

  randomKey(f: Finger): string {
    let keys = "";

    switch (f) {
      case Finger.LIndex:
        keys += "tgbrfv";
        if (this.useNumber) {
          keys += "54";
        }
        break;
      case Finger.LMiddle:
        keys += "edc";
        if (this.useNumber) {
          keys += "3";
        }
        break;
      case Finger.LRing:
        keys += "wsx";
        if (this.useNumber) {
          keys += "2";
        }
        break;
      case Finger.LChild:
        keys += "qaz";
        if (this.useNumber) {
          keys += "1";
        }
        break;
      case Finger.RIndex:
        keys += "yhnujm";
        if (this.useNumber) {
          keys += "67";
        }
        break;
      case Finger.RMiddle:
        keys += "ik";
        if (this.useNumber) {
          keys += "8";
        }
        break;
      case Finger.RRing:
        keys += "ol";
        if (this.useNumber) {
          keys += "9";
        }
        if (this.useSign) {
          keys += ",";
        }
        if (this.useSign) {
          keys += ".";
        }
        break;
      case Finger.RChild:
        keys += "p";
        if (this.useNumber) {
          keys += "0";
        }
        if (this.useSign) {
          keys += ";/";
        }
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
