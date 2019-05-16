const chars = "abcdefghijklmnopqrstuvwxyz";
const passwordLength = 16;

export default class PasswordGenerator {
  constructor() {}

  generate(): string {
    const charsLength = chars.length;

    return [...Array(passwordLength)]
      .map(() => chars[Math.floor(Math.random() * charsLength)])
      .join("");
  }
}
