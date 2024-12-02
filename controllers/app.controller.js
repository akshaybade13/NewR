const App = require("../models/app.model.js");

exports.findAll=(req,res)=>{
    App.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.error(err.stack);
        res.status(500).send({
            message:
            err.message||"some error occured",
        });
    });
}

exports.findOne=(req,res)=>{
    App.findById(req.params.messageId)
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message:"Message not found with id "+ req.params.messageId,
            });
        }
        res.send(data);
    })
}

exports.create=(req,res)=>{
    if(!req.body.name){
        res.status(400).send({message:"content cannot be empty"});
        return;
    }
    const messages = new App({
        name : req.body.name,
        price : req.body.price,
        rating:req.body.rating,
        difficulty:req.body.difficulty
    });
    messages
    .save(messages)
    .then((data)=>{res.send(data);})
    .catch((err)=>{
        res.status(500).send({
        message:
        err.message||"some error occured while creating"
    });
});
};

exports.delete = (req,res)=>{
    App.findByIdAndDelete(req.params.messageId).then((data)=>{
        if(!data){
            return res.status(404).send({
                message:"Data not found with id "+req.params.messageId
            });
        }
        res.send({message: "Data deleted successfully"});
    });
};

exports.finddifficulty=(req,res)=>{
    App.find({difficulty:"easy"})
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "error occured while extracting"
        });
    });
};

exports.deleteAll=(req,res)=>{
    App.deleteMany({})
    .then((data)=>{
        res.send({
           
                message:`${data.deletedCount} tours were deleted`
            });
        })
        .catch((err)=>
        {
            res.status(500).send({
                message: err.message || "some error occured"
            });
        });
    
};
