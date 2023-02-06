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
  const query = "INSERT INTO objects(`id`, `street`, `house`, `section`, `floor`, `apartment`,  `latitude`, `longitude`, `category`, `pets`, `client_id`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.street,
    request.body.house,
    request.body.section,
    request.body.floor,
    request.body.apartment,
    request.body.latitude,
    request.body.longitude,
    request.body.category,
    request.body.pets,
    request.body.client_id,
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
  const query = "UPDATE objects SET `id` = ?, `street` = ?, `house` = ?, `section` = ?, `floor` = ?, `apartment` = ?, `latitude` = ?, `longitude` = ?, `category` = ?, `pets` = ?, `client_id` = ? WHERE `id` = ?";

  const values = [
    request.body.street,
    request.body.house,
    request.body.section,
    request.body.floor,
    request.body.apartment,
    request.body.latitude,
    request.body.longitude,
    request.body.category,
    request.body.pets,
    request.body.client_id,
  ];

  db.query(query, [objectId, ...values, objectId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get clients
app.get("/clients", (request, response) => {
  const query = "SELECT * FROM clients"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get client by id
app.get("/clients/:id", (request, response) => {
  const clientId = request.params.id;
  const query = "SELECT * FROM clients WHERE id = ? "
  db.query(query, [clientId], (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get patrolmen
app.get("/patrolmen", (request, response) => {
  const query = "SELECT * FROM patrolmen"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get patrolman by id
app.get("/patrolmen/:id", (request, response) => {
  const patrolmenId = request.params.id;
  const query = "SELECT * FROM patrolmen WHERE id = ? "
  db.query(query, [patrolmenId], (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//add patrolman
app.post("/patrolmen", (request, response) => {
  const query = "INSERT INTO patrolmen(`id`, `full_name`, `age`, `experience`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.full_name,
    request.body.age,
    request.body.experience,
  ];

  db.query(query, [values], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//delete object
app.delete("/patrolmen/:id", (request, response) => {
  const patrolmenId = request.params.id;
  const query = " DELETE FROM patrolmen WHERE id = ? ";

  db.query(query, [patrolmenId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//update object
app.put("/patrolmen/:id", (request, response) => {
  const patrolmenId = request.params.id;
  const query = "UPDATE patrolmen SET `id` = ?, `full_name` = ?, `age` = ?, `experience` = ? WHERE `id` = ?";

  const values = [
    request.body.full_name,
    request.body.age,
    request.body.experience,
  ];

  db.query(query, [patrolmenId, ...values, patrolmenId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get patrols
app.get("/patrols", (request, response) => {
  const query = "SELECT * FROM patrols"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get patrol by id
app.get("/patrols/:id", (request, response) => {
  const patrolId = request.params.id;
  const query = "SELECT * FROM patrols WHERE id = ? "
  db.query(query, [patrolId], (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//add patrol
app.post("/patrols", (request, response) => {
  const query = "INSERT INTO patrols(`id`, `first_patrolman_id`, `second_patrolman_id`, `latitude`, `longitude`, `patrol_is_active`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.first_patrolman_id,
    request.body.second_patrolman_id,
    request.body.latitude,
    request.body.longitude,
    request.body.patrol_is_active,
  ];

  db.query(query, [values], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//delete patrol
app.delete("/patrols/:id", (request, response) => {
  const patrolId = request.params.id;
  const query = " DELETE FROM patrols WHERE id = ? ";

  db.query(query, [patrolId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//update object
app.put("/patrols/:id", (request, response) => {
  const patrolId = request.params.id;
  const query = "UPDATE patrols SET `id` = ?, `first_patrolman_id` = ?, `second_patrolman_id` = ?, `latitude` = ?, `longitude` = ?, `patrol_is_active` = ? WHERE `id` = ?";

  const values = [
    request.body.first_patrolman_id,
    request.body.second_patrolman_id,
    request.body.latitude,
    request.body.longitude,
    request.body.patrol_is_active,
  ];

  db.query(query, [patrolId, ...values, patrolId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend")
})