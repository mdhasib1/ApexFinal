const asyncHandler = require('express-async-handler');
const CollectionNFT = require('../Models/CollectionModal');
const multer = require("multer");
const User = require('mongoose').model('User');






const Filter = (req, file, cb) => {
    if (
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("jpg") ||
      file.mimetype.includes("gif") ||
      file.mimetype.includes("webp")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only png, jpg, jpeg, or gif files.", false);
    }
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const fileName =
        file.fieldname + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: Filter,
  }).single("image");
  


const CreateCollection = asyncHandler(async (req, res) => {
    try {
        const { collectionname, collectiondes,file } = req.body;
        
        const collectionExists = await CollectionNFT.findOne({ collectionname });
  
        if (collectionExists) {
          res.status(400);
          throw new Error("same Collection already exist");
        }

    const newCollection = new CollectionNFT({
        user: req.user._id,
        collectionname: collectionname,
        collectionimage:file,
        collectiondes:collectiondes,
      });
    
      const savedCollection = await newCollection.save();
  
      console.log(savedCollection)
    
      res.status(201).json(savedCollection);
    } catch (error) {
        console.log(error)
    }

  });


  const getCollections = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user.isAdmin) {
      const collections = await CollectionNFT.find();
      res.status(200).json(collections);
    } else {
      const collections = await CollectionNFT.find({ user: req.user._id });
      res.status(200).json(collections);
    }
  });


  // controllers/CollectionController.js
  const deleteCollection = asyncHandler(async (req, res) => {
    console.log('Attempting to delete collection with ID:', req.params.id);
    const collection = await CollectionNFT.findById(req.params.id);
  
    if (collection) {
      await CollectionNFT.deleteOne({ _id: req.params.id }); // Change this line
      res.json({ message: 'Collection deleted' });
    } else {
      res.status(404);
      throw new Error('Collection not found');
    }
  });

  const getTotalCollection = async (req, res) => {
    try {
      const numberOfCollection = CollectionNFT.length;
      res.status(200).json({ numberOfCollection });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  

  module.exports = {
    CreateCollection,
    upload,
    getCollections,
    deleteCollection,
    getTotalCollection
  };
  
