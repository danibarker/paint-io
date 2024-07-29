import { runWith } from "firebase-functions";
import cors from "cors";

app.use(cors());
export const api = runWith({ memory: "1GB" }).https.onRequest(app);
