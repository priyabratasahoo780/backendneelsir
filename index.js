const express = require("express");
const app = express();

app.use(express.json()); 

let users = [
{
name:"Dax",
uid:108001,
attendence:80,
total_sub:14,
bonus:20
},
 {
name:"Dhavnit",
uid:108002,
attendence:70,
total_sub:14,
bonus:25
 },
 {
name:"Rahul",
uid:108003,
attendence:80,
total_sub:14,
bonus:30
 }
];

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    name: req.body.name,
    role: req.body.role
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});
app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = users.find(u => u.uid === userId);  

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, attendence, total_sub, bonus } = req.body;

  // Check if no fields provided
  if (
    name === undefined &&
    attendence === undefined &&
    total_sub === undefined &&
    bonus === undefined
  ) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  // Update only provided fields
  if (name !== undefined) user.name = name;
  if (attendence !== undefined) user.attendence = attendence;
  if (total_sub !== undefined) user.total_sub = total_sub;
  if (bonus !== undefined) user.bonus = bonus;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});


app.delete("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);  

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});