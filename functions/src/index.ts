import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PasswordGenerator } from "./PasswordGenerator";

admin.initializeApp();

export const password = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  const { useNumber, useSign, length } = request.query;
  const g = new PasswordGenerator(
    parseBoolFromString(useNumber),
    parseBoolFromString(useSign),
    length
  );
  response.send(g.generate());
});

function parseBoolFromString(s: string): boolean {
  return ["true", "1"].some(a => a == s);
}
