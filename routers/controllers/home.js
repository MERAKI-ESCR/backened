// This endpoint handles the Home Page request

const getHome = (req, res) => {
    res.status(200).json("HOME PAGE");
  };
  
  module.exports = { getHome };