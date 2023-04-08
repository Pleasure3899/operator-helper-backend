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
  const query = "INSERT INTO objects(`id`, `street`, `house`, `section`, `floor`, `apartment`,  `latitude`, `longitude`, `category`, `pets`, `client_id`, `object_is_active`) VALUES (?)";

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
    request.body.object_is_active,
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
  const query = "UPDATE objects SET `id` = ?, `street` = ?, `house` = ?, `section` = ?, `floor` = ?, `apartment` = ?, `latitude` = ?, `longitude` = ?, `category` = ?, `pets` = ?, `client_id` = ?, `object_is_active` = ? WHERE `id` = ?";

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
    request.body.object_is_active,
  ];

  db.query(query, [objectId, ...values, objectId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//add client
app.post("/clients", (request, response) => {
  const query = "INSERT INTO clients(`id`, `surname`, `name`, `address`, `phone`, `alternate_phone`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.surname,
    request.body.name,
    request.body.address,
    request.body.phone,
    request.body.alternate_phone,
  ];

  db.query(query, [values], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//update client
app.put("/clients/:id", (request, response) => {
  const clientId = request.params.id;
  const query = "UPDATE clients SET `id` = ?, `surname` = ?, `name` = ?, `address` = ?, `phone` = ?, `alternate_phone` = ? WHERE `id` = ?";

  const values = [
    request.body.surname,
    request.body.name,
    request.body.address,
    request.body.phone,
    request.body.alternate_phone,
    
  ];

  db.query(query, [clientId, ...values, clientId], (error, data) => {
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

//delete object
app.delete("/clients/:id", (request, response) => {
  const clientId = request.params.id;
  const query = " DELETE FROM clients WHERE id = ? ";

  db.query(query, [clientId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get patrolmen
app.get("/patrolmen", (request, response) => {
  const query = "SELECT id, full_name, DATE_FORMAT(age,'%d/%m/%Y') AS age, DATE_FORMAT(experience,'%d/%m/%Y') AS experience FROM patrolmen"
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
  const query = "SELECT id, full_name, DATE_FORMAT(age,'%Y-%m-%d') AS age, DATE_FORMAT(experience,'%Y-%m-%d') AS experience FROM patrolmen WHERE id = ? "
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

//delete patrolmen
app.delete("/patrolmen/:id", (request, response) => {
  const patrolmenId = request.params.id;
  const query = " DELETE FROM patrolmen WHERE id = ? ";

  db.query(query, [patrolmenId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//update patrolmen
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

//get patrols with patrolmen names
app.get("/patrols-name", (request, response) => {
  const query = "SELECT patrols.id, patrols.probability_superlow as patrolprobabilitysuperlow, patrols.probability_low as patrolprobabilitylow, patrols.probability_medium as patrolprobabilitymedium, patrols.probability_high as patrolprobabilityhigh, patrols.first_patrolman_id as firstpatrolmanid, patrols.second_patrolman_id as secondpatrolmanid, patrols.latitude as latitude, patrols.longitude as longitude, (SELECT patrolmen.full_name from patrolmen where patrolmen.id = patrols.first_patrolman_id) as firstpatrolmanname, (SELECT patrolmen.full_name from patrolmen where patrolmen.id = patrols.second_patrolman_id) as secondpatrolmanname FROM patrols where patrol_is_active = 1"
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
  const query = "INSERT INTO patrols(`id`, `first_patrolman_id`, `second_patrolman_id`, `latitude`, `longitude`, `patrol_is_active`, `probability_superlow` , `probability_low`, `probability_medium`, `probability_high`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.first_patrolman_id,
    request.body.second_patrolman_id,
    request.body.latitude,
    request.body.longitude,
    request.body.patrol_is_active,
    request.body.probabilitysuperlow,
    request.body.probabilitylow,
    request.body.probabilitymedium,
    request.body.probabilityhigh,
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

//update patrol
app.put("/patrols/:id", (request, response) => {
  const patrolId = request.params.id;
  const query = "UPDATE patrols SET `id` = ?, `first_patrolman_id` = ?, `second_patrolman_id` = ?, `latitude` = ?, `longitude` = ?, `patrol_is_active` = ?, `probability_superlow` = ? , `probability_low` = ?, `probability_medium` = ?, `probability_high` = ? WHERE `id` = ?";

  const values = [
    request.body.first_patrolman_id,
    request.body.second_patrolman_id,
    request.body.latitude,
    request.body.longitude,
    request.body.patrol_is_active,
    request.body.probability_superlow,
    request.body.probability_low,
    request.body.probability_medium,
    request.body.probability_high,
  ];

  db.query(query, [patrolId, ...values, patrolId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get incidents
app.get("/incidents", (request, response) => {
  const query = "SELECT * FROM incidents"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get incidents with join
app.get("/incidents-join", (request, response) => {
  const query = "SELECT incidents.id AS incidentid, incidents.zones AS incidentzones, incidents.danger AS incidentdanger, incidents.is_checked AS incidentchecked, incidents.iterations AS incidentiterations, clients.id AS clientid, CONCAT(clients.surname, ' ', clients.name) AS clientname, clients.address AS clientaddress, clients.phone AS clientphone, clients.alternate_phone AS clientalternatephone,  objects.id as objectid, objects.latitude AS objectlatitude, objects.longitude AS objectlongitude, objects.street AS objectstreet, objects.house AS objecthouse, objects.section AS objectsection, objects.floor AS objectfloor, objects.apartment AS objectapartment, objects.category AS objectcategory, objects.pets as objectpets, timestamps.id AS timestampid, DATE_FORMAT(timestamps.date, '%d.%m.%Y') AS date, timestamps.time AS time FROM incidents, clients, timestamps, objects WHERE incidents.timestamp_id=timestamps.id and incidents.object_id=objects.id and objects.client_id=clients.id"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get opened incidents with join
app.get("/opened-incidents", (request, response) => {
  const query = "SELECT incidents.id AS incidentid, incidents.zones AS incidentzones, incidents.danger AS incidentdanger, incidents.is_checked AS incidentchecked, incidents.iterations AS incidentiterations, clients.id AS clientid, CONCAT(clients.surname, ' ', clients.name) AS clientname, clients.address AS clientaddress, clients.phone AS clientphone, clients.alternate_phone AS clientalternatephone,  objects.id as objectid, objects.latitude AS objectlatitude, objects.longitude AS objectlongitude, objects.street AS objectstreet, objects.house AS objecthouse, objects.section AS objectsection, objects.floor AS objectfloor, objects.apartment AS objectapartment, objects.category AS objectcategory, objects.pets as objectpets, timestamps.id AS timestampid, DATE_FORMAT(timestamps.date, '%d.%m.%Y') AS date, timestamps.time AS time FROM incidents, clients, timestamps, objects WHERE incidents.timestamp_id=timestamps.id and incidents.object_id=objects.id and objects.client_id=clients.id and incidents.is_closed=0"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get unchecked incidents
app.get("/unchecked-incidents", (request, response) => {
  const query = "SELECT * FROM incidents where `is_checked` = '0'"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//set incident checked
app.put("/check-incident/:id", (request, response) => {
  const incidentId = request.params.id;
  const query = "UPDATE incidents SET `is_checked` = 1 WHERE `id` = ?";

  db.query(query, [incidentId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get incident by id
app.get("/incidents/:id", (request, response) => {
  const incidentId = request.params.id;
  const query = "SELECT incidents.id AS incidentid, incidents.zones AS incidentzones, incidents.danger AS incidentdanger, incidents.is_checked AS incidentchecked, incidents.iterations AS incidentiterations, clients.id AS clientid, CONCAT(clients.surname, ' ', clients.name) AS clientname, clients.address AS clientaddress, clients.phone AS clientphone, clients.alternate_phone AS clientalternatephone,  objects.id as objectid, objects.latitude AS objectlatitude, objects.longitude AS objectlongitude, objects.street AS objectstreet, objects.house AS objecthouse, objects.section AS objectsection, objects.floor AS objectfloor, objects.apartment AS objectapartment, objects.category AS objectcategory, objects.pets as objectpets, timestamps.id AS timestampid, DATE_FORMAT(timestamps.date, '%d.%m.%Y') AS date, timestamps.time AS time FROM incidents, clients, timestamps, objects WHERE incidents.timestamp_id=timestamps.id and incidents.object_id=objects.id and objects.client_id=clients.id and incidents.id = ? "
  db.query(query, [incidentId], (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//set danger for incident
app.put("/incident-danger/:id", (request, response) => {
  const incidentId = request.params.id;
  const query = "UPDATE incidents SET `danger` = ? WHERE `id` = ?";

  const values = [
    request.body.danger,
  ];

  db.query(query, [...values, incidentId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//set is_checked switch = 1 for incident
app.put("/incident-ischeck/:id", (request, response) => {
  const incidentId = request.params.id;
  const query = "UPDATE incidents SET `is_checked` = 1 WHERE `id` = ?";

  db.query(query, [incidentId], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
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

//get last operation of the incident by id
app.get("/last-operation/:id", (request, response) => {
  const incidentId = request.params.id;
  const query = "SELECT operations.id as operationid, operations.incident_id as incidentid, operations.patrol_id as patrolid, operations.status_id as statusid, DATE_FORMAT(timestamps.date, '%d.%m.%Y') AS date, timestamps.time AS time, statuses.title as statustitle, statuses.description as statusdescription, patrols.first_patrolman_id as firstpatrolmanid, patrols.second_patrolman_id as secondpatrolmanid, patrols.latitude as patrollatitude, patrols.longitude as patrollongitude, (SELECT patrolmen.full_name from patrolmen where id=patrols.first_patrolman_id) as firstpatrolmanname, (SELECT patrolmen.full_name from patrolmen where id=patrols.second_patrolman_id) as secondpatrolmanname, (SELECT DATE_FORMAT(patrolmen.age,'%d/%m/%Y') from patrolmen where id=patrols.first_patrolman_id) as firstpatrolmanage, (SELECT DATE_FORMAT(patrolmen.age,'%d/%m/%Y') from patrolmen where id=patrols.second_patrolman_id) as secondpatrolmanage, (SELECT DATE_FORMAT(patrolmen.experience,'%d/%m/%Y') from patrolmen where id=patrols.first_patrolman_id) as firstpatrolmanexp, (SELECT DATE_FORMAT(patrolmen.experience,'%d/%m/%Y') from patrolmen where id=patrols.second_patrolman_id) as secondpatrolmanexp FROM operations, timestamps, statuses, patrols, patrolmen WHERE operations.incident_id = ? and operations.timestamp_id=timestamps.id and operations.status_id = statuses.id and operations.patrol_id = patrols.id ORDER BY operations.id DESC LIMIT 1"
  db.query(query, [incidentId], (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get statuses
app.get("/statuses", (request, response) => {
  const query = "SELECT * FROM statuses"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});


//add operation
app.post("/operations", (request, response) => {
  const query = "INSERT INTO operations(`id`, `incident_id`, `patrol_id`, `status_id`, `timestamp_id`) VALUES (?)";

  const values = [
    request.body.id,
    request.body.incident_id,
    request.body.patrol_id,
    request.body.status_id,
    request.body.timestamp_id,
  ];

  db.query(query, [values], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });

  if (request.body.status_id === 50) {
    db.query("UPDATE incidents SET `is_closed` = 1 WHERE `id` = ?", request.body.incident_id);
    //db.query("UPDATE patrols SET `patrol_is_active` = 1 WHERE `id` = ?", request.body.patrol_id);
  } else {
    db.query("UPDATE incidents SET `is_closed` = 0 WHERE `id` = ?", request.body.incident_id);
    //db.query("UPDATE patrols SET `patrol_is_active` = 0 WHERE `id` = ?", request.body.patrol_id);
  }

});

//get operations
app.get("/operations", (request, response) => {
  const query = "SELECT * FROM operations"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get last operation id
app.get("/operations-lastid", (request, response) => {
  const query = "SELECT MAX(id) as id FROM operations"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});


//add timestamp
app.post("/timestamps", (request, response) => {
  const query = "INSERT INTO timestamps(`id`) VALUES (?)";

  const values = [
    request.body.id,
  ];

  db.query(query, [values], (error, data) => {
    if (error) return response.send(error);
    return response.json(data);
  });
});

//get timestamps
app.get("/timestamps", (request, response) => {
  const query = "SELECT * FROM timestamps"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

//get last timestamp id value
app.get("/timestamps-lastid", (request, response) => {
  const query = "SELECT MAX(id) as id FROM timestamps"
  db.query(query, (error, data) => {
    if (error) {
      console.log(error);
      return response.json(error);
    }
    return response.json(data);
  })
});

app.listen(8800, () => {
  console.log("Connected to backend")
})