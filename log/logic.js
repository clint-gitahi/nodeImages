var cloudinary = require('cloudinary');
var Model = require('../models/models');

cloudinary.config({
  cloud_name: 'dxer2l0ds',
  api_key: '252624446614488',
  api_secret: '3siunuOcTgyxaudnEbsSS8aKfeY'
});

const getPhotos = (req, res) => {
  Model.find(null, null, { sort: { created_at: -1 }}, (err, images) => {
    if (err) {
      res.send(err);
    }
    res.json(images)
  })
}

const getPic = (req, res) => {
  const { id } = req.params;
  Model.findById(id, (err, image) => {
    if (err) {
      res.send(err);
    }
    res.json(image);
  });
}

const postcreate = function(req, res) {
  cloudinary.uploader.upload(req.body.path, function(result) {
    var post = new Model({
      title: req.body.title,
      description: req.body.description,
      created_at: new Date(),
      image: result.url,
      image_id: result.public_id
    });

    post.save(function(err) {
      if(err) {
        res.send(err)
      }

    })
  })
}


const deletePic = (req, res) => {
  Model.remove(
    { _id: req.params.id},
    err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully Deleted'});
    }
  );
}

export {getPhotos, getPic, deletePic, postcreate};
