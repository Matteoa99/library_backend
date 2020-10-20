const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

router.get("/getAll", (_req, _res, _next) => {
    DB.query({
        sql:'call getAllLibri()'
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

router.post('/addLibro',(req, res) => {
    DB.query({
        sql:'call addLibro(?,?,?,?)', values:[req.body.titolo, req.body.trama, req.body.copie,req.body.copertina]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

module.exports = router;