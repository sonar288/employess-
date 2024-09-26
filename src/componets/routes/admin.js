// Routes
function adminLogin(app){
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
  });
  
  app.post('/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
  });
}

module.exports ={
    adminLogin:adminLogin
}