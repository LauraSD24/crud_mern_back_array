import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); //configura las variables de entorno en la aplicación y permite utilizarlas

const dataUsers = [];

const app = express(); // app va a ser igual a lo que retorna express()

// los cors permiten especificar de dónde se va a enviar y recibir informacion
app.use(express.json()); // la información será intercambiada en formato json
app.use(cors());

app.get("/", (request, response) => {
  response.send("Bienvenido");
});

app.get("/get-all-users", (req, res) => {
  try {
    return res.status(200).json({
      code: 200,
      reponse: true,
      message: "lista de usuarios",
      data: dataUsers,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      reponse: false,
      message: "se produjo un error",
    });
  }
});

app.post("/create-user", (req, res) => {
  try {
    const currentLength = dataUsers.length;
    const data = req.body;
    if (
      data.name === null ||
      data.identity === null ||
      data.phone === null ||
      data.email === null
    ) {
      return res.status(400).json({
        code: 400,
        message: "hay campos vacíos",
        response: false,
      });
    }
    dataUsers.unshift(data);
    if (currentLength < dataUsers.length) {
      return res.status(201).json({
        code: 201,
        message: "Usuario creado correctamente",
        response: true,
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "¡Error! No se agregó el usuario",
        response: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      reponse: false,
      message: "se produjo un error",
    });
  }
});

app.put("/update", (req, res) => {
  try {
    const data = req.body;
    console.log(dataUsers.indexOf({...data}));
    if (dataUsers.indexOf(data) === -1) {
      const index = dataUsers.indexOf(
        dataUsers.find((item) => item.identity === data.identity)
      );
      console.log(index);
      dataUsers[index].name = data.name;
      dataUsers[index].phone = data.phone;
      dataUsers[index].email = data.email;
      return res.status(200).json({
        code: 200,
        message: "Usuario actualizado correctamente",
        response: true,
      });
    }else{
        return res.status(200).json({
            code: 200,
            response: true,
          });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      reponse: false,
      message: "se produjo un error",
    });
  }
});

app.delete("/delete/:id",(req,res)=>{
  try {
    const currentLength = dataUsers.length
    const index = dataUsers.indexOf(dataUsers.find((item)=>item.identity===req.params.id));
    dataUsers.splice(index,1);
    console.log(dataUsers);
    if (currentLength > dataUsers.length) {
      return res.status(200).json({
        code: 200,
        response: true,
        message: "Usuario eliminado",
        identityUserDelete: req.params.id
      })
    }
    return res.status(400).json({
      code: 400,
      response: false,
      message: "No se pudo eliminar el usuario"
    })

  } catch (error) {
    return response.status(400).json({
      code: 400,
      reponse: false,
      message: "Se produjo un error",
    });
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
