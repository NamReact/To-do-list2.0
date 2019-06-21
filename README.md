# Short URL

> This is part of my full stack final exam.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)

## General info

A simple short URL website. I dont have a domain name so some URLs might end up longer.

This is only the front end. You can find the back end [here](https://github.com/NamReact/short-url-nam-bui-server)

## Technologies

- axios - version 0.19.0
- React.js - version 16.8.6
- react-router-dom - version 5.0.1

## Setup

Clone the repository then install the dependencies using `npm install`.

Make sure nothing is running on your port 3000.

Use `npm start`to launch the website.

You can also visit the demo website :

https://short-url-nam-bui.herokuapp.com/

## Features

- Add new URL to be shortened to the API
- Redirect to the original website when using the short URL
- Check for valid URL format and display an error bubble if a wrong format is used.
- Redirect back to the home page is a wrong short url is used. An alert informs the user.

## Status

Project is _finished_.

## Inspiration

Project inspired by websites like https://bitly.com/ and https://tiny.cc/.
