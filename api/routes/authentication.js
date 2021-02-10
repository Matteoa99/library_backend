const polka = require("polka");
//const router = polka.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 
const jwt = require("jsonwebtoken");

/**
 * Esegue il login dell'amministratore
 */

polka().post("/adminLogin", (_req, _res) => {
    DB.query({
        sql: "SELECT * FROM Amministratore WHERE utente = ?",
        values: [_req.body.utente]
    }, (err, result) => {
        if (err) {
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        }
        if (result.length === 0 || (result[0].password !== _req.body.password)) {
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        } else {
            result[0].jwt = 'Bearer ' + jwt.sign({
                email: result[0].email,
                id: result[0].ID
            }, "top_secret_progettopawm", {
                "expiresIn": "365d"
            });
            // REMOVE FIELD
            delete result[0].password;
            return _res.status(200).json(JOut(result[0], {}));
        }
    });
});

/**
 * Esegue il login di un utente
 */
polka().post("/userLogin", (_req, _res) => {
    DB.query({
        sql: "SELECT * FROM Utente WHERE email = ?",
        values: [_req.body.email]
    }, (err, result) => {
        if (err) {
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        }
        if (result.length === 0 || (result[0].password !== _req.body.password)) {
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        } else {
            result[0].jwt = 'Bearer ' + jwt.sign({
                email: result[0].email,
                id: result[0].ID
            }, "top_secret_progettopawm", {
                "expiresIn": "365d"
            });
            // REMOVE FIELD
            delete result[0].password;
            return _res.status(200).json(JOut(result[0], {}));
        }
    });
});

/**
 * Inserisce un utente
 */
polka().post("/addUser", (_req, _res) => {
    DB.query({
        sql: " call addUser(?, ?, ?, ?)",
        values: [_req.body.nome, _req.body.cognome, _req.body.email, _req.body.password]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(201).json(JOut([], {}));
        }
    });
});

/**
 * Esegue il logout
 */
polka().get("/logout", (_req, _res) => {
    _req.logout();
    _res.status(200).json({});
});

//module.exports = router;