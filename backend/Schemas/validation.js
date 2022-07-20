const Joi = require('joi');
// const server = require('/server');
const validation = require('../middlewares/validation');

exports.schema = Joi.object({
    email: Joi.string() .min(3) .required() .email(),
    password: Joi.string() .min(3) .required() });
    
    const validate = schema.validate(req.body);
    res.send(validate);

    // const user = req.body;
    // console.log(req.body, "ici");
  
    // const data = {
    //     email: "truc@gmail.com",
    //     password: "truc"
    // };

// const result = schema.validate(data);
// console.log(result);

  app.post("/", validate(validation.schema), (req, res) => {
    res.send("request processed");
  });
  module.exports = {'./signup': email, password}