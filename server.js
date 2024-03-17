const express = require("express");
const app = new express();
const axios = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000;
const APIurl = "http://localhost:4000";

app.get("/", async (req, res) => {
    try{
        const response =  await axios.get(`${APIurl}/posts`);
        console.log(response.data);
        res.render("index.ejs", {posts: response.data});
    } catch(error){
        res.status(500).json({message : "Error fetching data"});
    }
});

app.get("/new", async (req, res) => {
   res.render('new.ejs')
});

app.post("/new/post", async (req, res) => {
    try{
        const response =  await axios.post(`${APIurl}/posts`, req.body);
        res.redirect("/");
    } catch(error){
        res.status(500).json({message : "Error saving data"});
    }
 });

 app.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await axios.get(`${APIurl}/posts/${id}`);
        console.log(response.data);
        res.render("modify.ejs", {post: response.data});
    }catch(error) {
        res.status(500).json({message : "Error fetching data"});
    }
 });

 app.post("/edit/post/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const response = await axios.patch(`${APIurl}/posts/${id}`, req.body);
        res.redirect("/");
    } catch(error) {
        res.status(500).json({message : "Error updating data"});
    }
 });

 app.get("/delete/:id", async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const response =  await axios.delete(`${APIurl}/posts/${id}`);
        res.redirect("/");
    } catch(error){
        res.status(500).json({message : "Error saving data"});
    }
 });
 

app.listen(port);