const Case = require("./../../db/models/case");

const createNewCase = (req, res) => {
  console.log("create");
  const userId = req.token.userId;
  const {
    caseName,
    category,
    neededAmount,
    address,
    isPrivate,
  } = req.body;

  const newCase = new Case({
    caseName,
    category,
    neededAmount,
    address,
    isPrivate,
    isClosed:false,
    userId,
    donatedAmount:0
  });

  newCase
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
      console.log(err);
    });
};

const getAllCases = (req, res) => {
  Case.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const getClosedCases = (req, res) => {
  const category = req.params.category;
  const skip = req.body.skip;
  const limit = req.body.limit;
  console.log(req.body.sorting);
  if (req.body.sorting) {
    const donationNeeded = req.body.donationNeeded;
    console.log(donationNeeded);
    const caseSorting = req.body.sorting;
    console.log(caseSorting);
    const caseName = req.body.caseName;
    console.log(caseName);
    if (donationNeeded) {
      if (donationNeeded < 5000) {
        if (caseSorting === "lowHigh") {
          Case.find({
            $and: [
              { neededAmount: { $lte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: true},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: 1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        } else if (caseSorting === "highLow") {
          Case.find({
            $and: [
              { neededAmount: { $lte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: true},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: -1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        }
      } else {
        if (caseSorting === "lowHigh") {
          Case.find({
            $and: [
              { neededAmount: { $gte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: true},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: 1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        } else if (caseSorting === "highLow") {
          Case.find({
            $and: [
              { neededAmount: { $gte: DonationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: true},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: -1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        }
      }
    } else {
      if (caseSorting === "lowHigh") {
        Case.find({
          $and: [
            { caseName: { $regex: caseName, $options: "i" } },
            {isClosed: true},
          ],
        })
          .skip(skip)
          .limit(limit)
          .sort({ neededAmount: 1 })
          .then((result) => {
            let docCount
            Case.countDocuments().then((count)=>{
              docCount = count;
            }).catch((err)=>{console.log(err)})
            res.status(200).json({result:result,docCount:docCount});
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      } else if (caseSorting === "highLow") {
        Case.find({
          $and: [
            { caseName: { $regex: caseName, $options: "i" } },
            {isClosed: true},
          ],
        })
          .skip(skip)
          .limit(limit)
          .sort({ neededAmount: -1 })
          .then((result) => {
            let docCount
            Case.countDocuments().then((count)=>{
              docCount = count;
            }).catch((err)=>{console.log(err)})
            res.status(200).json({result:result,docCount:docCount});
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      }
    }
  } else {
    Case.find({isClosed: true})
      .skip(skip)
      .limit(limit)
      .then((result) => {
        let docCount
        Case.countDocuments().then((count)=>{
          docCount = count;
        }).catch((err)=>{console.log(err)})
        res.status(200).json({result:result,docCount:docCount});
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
};

const getAvailableCases =(req,res)=>{
  Case.find({isClosed:false}).then((result)=>{
  res.status(200).json(result)
  .catch(err=>{
    res.status(400).json(err)
  })
})
}

const updateCaseById = (req, res) => {
  const id = req.params.id;
  const updates = req.body.updates;
console.log(updates);
console.log(id);
  Case.findOneAndUpdate({ _id: id }, updates, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);

      res.status(404).json(err);
    });
};

const getCaseById = (req, res) => {
  const id = req.params.id;
  Case.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const deleteCaseById = (req, res) => {
  const id = req.params.id;

  Case.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Success Delete Case With ID => ${id}`,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const closeCaseById=(req,res)=>{
  const id = req.params.id;
  const updates = req.body.updates;
  Case.findOneAndUpdate({ _id: id }, updates, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
}

const getCasesByCategory = (req, res) => {
  const category = req.params.category;
  const skip = req.body.skip;
  const limit = req.body.limit;
  console.log(req.body.sorting);
  if (req.body.sorting) {
    const donationNeeded = req.body.donationNeeded;
    console.log(donationNeeded);
    const caseSorting = req.body.sorting;
    console.log(caseSorting);
    const caseName = req.body.caseName;
    console.log(caseName);
    if (donationNeeded) {
      if (donationNeeded < 5000) {
        if (caseSorting === "lowHigh") {
          Case.find({
            $and: [
              { category: category },
              { neededAmount: { $lte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: false},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: 1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        } else if (caseSorting === "highLow") {
          Case.find({
            $and: [
              { category: category },
              { neededAmount: { $lte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: false},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: -1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        }
      } else {
        if (caseSorting === "lowHigh") {
          Case.find({
            $and: [
              { category: category },
              { neededAmount: { $gte: donationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: false},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: 1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        } else if (caseSorting === "highLow") {
          Case.find({
            $and: [
              { category: category },
              { neededAmount: { $gte: DonationNeeded } },
              { caseName: { $regex: caseName, $options: "i" } },
              {isClosed: false},
            ],
          })
            .skip(skip)
            .limit(limit)
            .sort({ neededAmount: -1 })
            .then((result) => {
              let docCount
              Case.countDocuments().then((count)=>{
                docCount = count;
              }).catch((err)=>{console.log(err)})
              res.status(200).json({result:result,docCount:docCount});
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        }
      }
    } else {
      if (caseSorting === "lowHigh") {
        Case.find({
          $and: [
            { category: category },
            { caseName: { $regex: caseName, $options: "i" } },
            {isClosed: false},
          ],
        })
          .skip(skip)
          .limit(limit)
          .sort({ neededAmount: 1 })
          .then((result) => {
            let docCount
            Case.countDocuments().then((count)=>{
              docCount = count;
            }).catch((err)=>{console.log(err)})
            res.status(200).json({result:result,docCount:docCount});
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      } else if (caseSorting === "highLow") {
        Case.find({
          $and: [
            { category: category },
            { caseName: { $regex: caseName, $options: "i" } },
            {isClosed: false},
          ],
        })
          .skip(skip)
          .limit(limit)
          .sort({ neededAmount: -1 })
          .then((result) => {
            let docCount
            Case.countDocuments().then((count)=>{
              docCount = count;
            }).catch((err)=>{console.log(err)})
            res.status(200).json({result:result,docCount:docCount});
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      }
    }
  } else {
    Case.find({$and: [{ category: category },{isClosed: false},]})
      .skip(skip)
      .limit(limit)
      .then((result) => {
        let docCount
        Case.countDocuments().then((count)=>{
          docCount = count;
        }).catch((err)=>{console.log(err)})
        res.status(200).json({result:result,docCount:docCount});
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
};

module.exports = {
  createNewCase,
  getAllCases,
  getClosedCases,
  updateCaseById,
  getCaseById,
  deleteCaseById,
  getCasesByCategory,
  closeCaseById,
  getAvailableCases
};
