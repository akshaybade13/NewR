module.exports=(app)=>{
    const App=require("../controllers/app.controller.js");


app.get("/get-all",App.findAll);

app.get("/message/:messageId",App.findOne);

app.post("/create",App.create);

app.delete("/message/:messageId",App.delete)

app.get("/difficulty-easy",App.finddifficulty)

app.delete("/delete",App.deleteAll);

app.all('*',(req,res,next)=>{
    const err = new Error(`can't find ${req.originalUrl} on this server`);
    err.status = "fail";
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status=err.status || "error";
    res.status(err.statusCode).json({
        status :err.status,
        message : err.message,
    });
});
};