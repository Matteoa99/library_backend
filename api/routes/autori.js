const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 


/**
 * Ritorna tutti gli autori
 */
router.get('/getAll', (_req, _res, _next) => {
    DB.query({
        sql: 'call getAllAutori',
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});
/**
 * Aggiunge un autore nel
 */
router.post('/addAutore', (_req, _res, _next) => {
    DB.query({
        sql: 'call insertAuthor(?,?,?)',
        values: [_req.body.nome, _req.body.cognome, _req.body.dataNascita]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna tutti i libri scritti da un autore
 */
router.get('/getAuthorBooks/:autore', (_req, _res, _next) => {
    DB.query({
        sql: 'call getAuthorBooks(?)',
        values: [_req.params.autore]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});
module.exports = router;