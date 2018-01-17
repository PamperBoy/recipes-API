const router = require('express').Router()
const { Recipe } = require('../models')
const passport = require('../config/auth')

router.get('/recipes', (req, res, next) => {
 Recipe.find()
   // Newest recipes first
   .sort({ createdAt: -1 })
   // Send the data in JSON format
   .then((recipes) => res.json(recipes))
   // Throw a 500 error if something goes wrong
   .catch((error) => next(error))
 })
 .get('/recipes/:id', (req, res, next) => {
   const id = req.params.id
   Recipe.findById(id)
     .then((recipe) => {
       if (!recipe) { return next() }
       res.json(recipe)
     })
     .catch((error) => next(error))
 })
 .post('/recipes', passport.authorize('jwt', { session: false }), (req, res, next) => {
   let newRecipe = req.body
   newRecipe.authorId = req.account._id

   Recipe.create(newRecipe)
     .then((recipe) => res.json(recipe))
     .catch((error) => next(error))
 })
 .put('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
   let updateRecipe = req.body
   updateRecipe.authorId = req_account._id

   Recipe.update(updateRecipe)
     .then((recipe) => res.json(recipe))
     .catch((error) => next(error))
 })
 .patch('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
   let updatePartRecipe = req.body
   updatePartRecipe.authorId = req_account._id

   Recipe.update(updatePartRecipe)
     .then((recipe) => res.json(recipe))
     .catch((error) => next(error))
 })
 .delete('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
   let deleteRecipe = req.body
   deleteRecipe.authorId = req_account._id

   Recipe.update(deleteRecipe)
     .then((recipe) => res.json(recipe))
     .catch((error) => next(error))
 })


module.exports = router
