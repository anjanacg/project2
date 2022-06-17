const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const sequelize = new Sequelize("anjuDB", "anjana", "Anjana@123", {
    dialect: "mysql",
  });



  
  const product_De = sequelize.define(
    "product_De",
    {
      product_name: Sequelize.STRING,
      product_price: Sequelize.INTEGER,
      product_quantity:Sequelize.INTEGER,
      product_quality:Sequelize.STRING,
    },
    { tableName: "product_De" }
  );
  

   product_De.sync();



  sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));



app.get("/",(req,res)=>{
    res.send("it is working fine");


});

app.post("/", async (req, res) => {
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_quantity = req.body.product_quantity;
    const product_quality = req.body.product_quality;

    const saveProduct1 = product_De.build({
      product_name,
      product_price,
      product_quantity,
      product_quality,
    });
    await saveProduct1.save();
    res.send("data posted ");
  });

app.get('/',async(req,res)=>{
    const alldata=await product_De.findAll();
    res.json(alldata)
});


app.put("/:id", (req, res) => {
    const data = req.body.data;
    product_De.update(
      {
        product_name: data,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/");
  });



  app.delete("/:id", (req, res) => {
    product_De.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  });



app.listen(port, () => {
    console.log(`server starts at http://localhost:${port}`);
  });