import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PasswordGenerator } from "./PasswordGenerator";

admin.initializeApp();

export const password = functions.https.onRequest((request, response) => {
  const { useNumber, useSign } = request.query;
  const g = new PasswordGenerator(
    parseBoolFromString(useNumber),
    parseBoolFromString(useSign)
  );
  response.send(g.generate());
});

function parseBoolFromString(s: string): boolean {
  return ["true", "1"].some(a => a == s);
}
