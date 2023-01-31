import express from 'express'
import mysql from 'mysql'
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "operator_helper",
});

//test
app.get("/", (request, response) => {
    response.json("test");
});

//get objects
app.get("/objects", (request, response) => {
    const query = "SELECT * FROM objects"
    db.query(query, (error, data) => {
        if (error) {
            console.log(error);
            return response.json(error);
        }
        return response.json(data);
    })
});

//get object by id
app.get("/objects/:id", (request, response) => {
    const objectId = request.params.id;
    const query = "SELECT * FROM objects WHERE id = ? "
    db.query(query, [objectId], (error, data) => {
        if (error) {
            console.log(error);
            return response.json(error);
        }
        return response.json(data);
    })
});

//add object
app.post("/objects", (request, response) => {
    const query = "INSERT INTO objects(`id`, `latitude`, `longitude`) VALUES (?)";
  
    const values = [
      request.body.id,
      request.body.latitude,
      request.body.longitude,
    ];
  
    db.query(query, [values], (error, data) => {
      if (error) return response.send(error);
      return response.json(data);
    });
  });

  //delete object
  app.delete("/objects/:id", (request, response) => {
  const objectId = request.params.id;
  const query = " DELETE FROM objects WHERE id = ? ";

  db.query(query, [objectId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//update object
app.put("/objects/:id", (request, response) => {
  const objectId = request.params.id;
  const query = "UPDATE objects SET `id` = ?, `latitude`= ?, `longitude`= ? WHERE `id` = ?";

  const values = [
    request.body.latitude,
    request.body.longitude,
  ];

  db.query(query, [objectId, ...values, objectId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});


app.listen(8800, () => {
    console.log("Connected to backend")
})