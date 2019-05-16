import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import PasswordGenerator from "./PasswordGenerator";

admin.initializeApp();

export const password = functions.https.onRequest((request, response) => {
  const g = new PasswordGenerator();
  response.send(g.generate());
});
