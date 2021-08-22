const express = require ("express");
const axios = require("axios");
const Card = require("../../db/models/cards");
const bcrypt = require("bcrypt")

const saveCard = (req,res)=>{
    const {cardNumber, cardHolder, expiryDate} = req.body;
    const userId = req.token.userId;
    
    const newCard = new Card({
        cardNumber,
        cardHolder,
        expiryDate,
        userId
    })

    newCard.save()
    .then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

const getCardByUserId = (req,res)=>{
    const userId = req.body.userId;

    Card.find({userId:userId}).exec()
    .then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(404).json(err)
    })
}

module.exports = {
    saveCard,
    getCardByUserId
}