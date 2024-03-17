const express = require("express");
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;


let posts = [
    {
        id: 1,
        title: "post1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Deepali",
        date: "2024-03-11"
    },
    {
        id: 2,
        title: "post2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Deepali",
        date: "2024-03-11"
    },
    {
        id: 3,
        title: "post3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Deepali",
        date: "2024-03-11"
    },
];

// get all posts
app.get("/posts", (req, res) => {
    const response = posts;
    res.status(200).send(response);
});

//get specific post by id
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postsData = posts.find((post) => post.id == id);
    if(!postsData) return res.status(400).json({error: "post not found"});
    return res.status(200).json(postsData);
});

// create new post

app.post("/posts", (req, res) => {
    const newPost  =  {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    }
    posts.push(newPost);
    return res.status(200).json(newPost);
});

//edit/patch existing post

app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postsData =  posts.find((post) => post.id === id);
    if(!postsData) return res.status(400).json({error: "Not Found"});

    if(req.body.title) postsData.title = req.body.title;
    if(req.body.content) postsData.content = req.body.content;
    if(req.body.author) postsData.author = req.body.author;

    const postIndex = posts.findIndex((post) => post.id === id);
    console.log(postsData);
    return res.status(200).json(postsData);

});

//delete existing post by id

app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post) => post.id ===  id);
    if(postIndex > -1) {
        posts.splice(postIndex, 1);
        console.log(posts);
        return res.status(200).json({message: "Ok"});
    } else {
        return res.status(400).json({error: "Not Found"});
    }

});

app.listen(port);
