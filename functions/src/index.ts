/**
 * ARQUIVO DE ENTRADA DO USUÁRIO (USER ENTRYPOINT)
 * 
 * Aqui você pode adicionar suas próprias Firebase Functions personalizadas.
 * Cuidado ao modificar o export `genfireapp`, pois ele contém a API CRUD automática.
 */
import { genfireapp } from "./framework";

// Exemplo de como adicionar suas próprias functions customizadas:
// import { onRequest } from "firebase-functions/v2/https";
// export const myCustomFunction = onRequest((req, res) => { res.send("Hello Oxe") });

export { genfireapp };
