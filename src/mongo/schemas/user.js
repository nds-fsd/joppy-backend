const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
      // minlength: 8,
    },
    bio: { type: String, required: false },
    photo: { type: String, required: false },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Role",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Skill",
      },
    ],
    workExperiences: [{ type: String, required: false }],
    education: { type: String, required: false },
    languages: [{ type: String, required: false }],
    salary: {
      currency: { type: String },
      range: {
        min: { type: Number, min: 0 },
        max: { type: Number, min: 0 },
      },
    },
    companySize: { type: Number, required: false },
    typeEmployement: { type: String, required: false },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "City",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

//esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
schema.pre("save", function (next) {
  const user = this;

  //si no se ha cambiado la contraseña, seguimos
  if (!user.isModified("password")) return next();

  //brcypt es una libreria que genera "hashes", encriptamos la contraseña
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //si no ha habido error en el encryptado, guardamos
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = () => {
  let payload = {
    id: this._id,
    email: this.email,
    username: this.userName,
  };

  return jwt.sign(payload, jwtSecret);
};

const User = mongoose.model("User", schema);

module.exports = User;
