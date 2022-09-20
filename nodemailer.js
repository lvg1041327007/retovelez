//Requerimos el paquete
const nodemailer = require('nodemailer');

//Creamos el objeto de transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leidyvagomez@gmail.com',
    pass: 'aaarccfwdvoopqol'
  }
});

const mensaje = "reto velez";

const mailOptions = {
  from: 'leidyvagomez@gmail.com',
  to: 'vikkybeauty90@gmail.com',
  subject: 'prueba',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});