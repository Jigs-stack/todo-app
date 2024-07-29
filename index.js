import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 

var currentTime= new Date();
var year = currentTime.getFullYear();


let toDoList = [];
let index = 0;


function addToDo(indexNumber, title, details, ){
  toDoList.push({indexNumber, title, details});
};

function findIndex(indexNumber){
  const itemIndexNumber = toDoList.findIndex(item => item.indexNumber === indexNumber);
  return itemIndexNumber;
};


function editTodo(indexNumber, newTitle, newDetails ) {
  let itemIndex = findIndex(indexNumber);
  if (itemIndex !== -1){
    toDoList[itemIndex].title = newTitle;
    toDoList[itemIndex].details = newDetails;
  };
};

app.get("/", (req, res) => {
  res.render("index.ejs", {
    toDoList: toDoList,
    year: year
  });
});


app.post("/submit", (req, res) => {
  index += 1
  const {title, details} = req.body
  addToDo(index,title,details);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const {indexNumber, title, details } = req.body;
  editTodo(parseInt(indexNumber), title, details);
  res.redirect("/");
  console.log(toDoList);
});



app.listen(port, () => {
  console.log(`listening to port ${port}`);
  
});


