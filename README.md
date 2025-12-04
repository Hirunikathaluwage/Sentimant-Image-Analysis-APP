# Overview

This project is a Node.js + Express backend API that accepts an uploaded image, sends it to Google Gemini (Gemini 1.5 Flash), and returns:

scene → What the image shows

mood → Overall sentiment (happy, sad, calm, energetic, neutral)

tags → Important objects, people, animals, or scene details

The API returns clean JSON with structured sentiment analysis.

# Features

Image upload using Multer

Image converted to base64 and analyzed via Gemini API

Returns structured JSON only (scene, mood, tags)

Simple and easy REST API endpoint

Clean folder structure

Supports PNG/JPG/etc. (based on your code)


## Technologies Used

Node.js

Express.js

Multer (image upload)

Google Generative AI (Gemini 1.5 Flash)

dotenv

fs module
