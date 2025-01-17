const express = require('express');
const cors = require('cors');
const User = require('./config');
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
})

app.post("/create", async (req, res) => {
    const data = req.body;
    // console.log("Data of Users : ", data)
    await User.add(data);
    res.send({ msg: "User Added" });
});

app.post("/update", async (req, res) => {
    const id = req.body.id;
    console.log("Before deleting ID ", req.body);
    delete req.body.id;
    console.log("After deleting ID ", req.body);
    const data = req.body;
    await User.doc(id).update(data);
    res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await User.doc(id).delete();
    res.send({ msg: "Deleted" });
});

app.listen(4000, () => console.log("Up and Running : http://localhost:4000"));

