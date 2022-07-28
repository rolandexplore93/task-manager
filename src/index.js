const app = require('./app')

app.listen(process.env.PORT || 8080, () =>
  console.log("Listening to server connection at port: " + (process.env.PORT || 8080))
);






// ------------------------------------------------------------------------
// JWT - to create authorization and sign in
// const authorization = () => {
//     // create jwt token
//     const token = jwt.sign({_id: "1234567"}, process.env.JWT_SECRET_KEY, {
//         expiresIn: "5 seconds"
//     });
//     console.log(token)

//     // verify jwt token
//     const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     console.log(isVerified)
// }
// authorization()

// toJSON method
// const pet = {
//     name: "Dude",
//     specie: "German Shephard"
// }
// pet.toJSON = function(){
//     console.log(this)
//     return this
// }
// pet.toJSON()
// console.log(JSON.stringify(pet))