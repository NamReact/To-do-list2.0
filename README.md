![todo-list](https://user-images.githubusercontent.com/49146106/59919315-64f62880-9427-11e9-9da3-eb9876cfdb6b.png)

# To do list

> A fancy to do list with project management.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)

## General info

This to do list is my first attempt at using hooks and context.

The login page and everyting involved with it is still coded with regular class component and state.

## Technologies

- axios - version 0.19.0
- js-cookie - version 2.2.0
- moment - version 2.24.0
- React.js - version 16.8.6
- react-router-dom - version 5.0.1

## Setup

Clone the repository then install the dependencies using `npm install`.

Make sure nothing is running on your port 3000.

Use `npm start`to launch the website.

You can also visit the demo website :

https://todo-list-nam.herokuapp.com

## Features

### Login page

![login-page](https://user-images.githubusercontent.com/49146106/59919703-712eb580-9428-11e9-90eb-131e731367e4.png)

- Check for valid email format and display an error bubble to inform user.
- Check for empty password and display an error bubble to inform user.
- Error message in case of wrong identification.
- Check for duplicate email during new account creation.
- Forgot my password function.

### TODO List

- Automatically launch on today's date page.
- Add and remove tasks.
- Change task status to done or not done.
- Tasks done turn grey and goes to the bottom of the list.

### User settings page

![setting-page](https://user-images.githubusercontent.com/49146106/59919842-d5ea1000-9428-11e9-8bad-c571e8fd6cbb.png)

- Add/change first name and last name.
- Change email.
- Change password.
- Delete account.

### Possible improvement

A lot can be improved but overall refactoring for a cleaner code and better structure.

- Add a bubble that signal how many tasks are left to be done.
- Automatically move unfinished tasks to tomorrow.

- Project management function is not implemented yet although some bases are already coded in (add project button, project bubble in the left navigation bar...)

- Once project management is implemented, automatically add tasks to the to do list depending on the assigned tasks through projects.

- Chat function.

## Status

Project is _in progress_.

## Inspiration

The design is greatly inspired from https://discordapp.com/.

The project management aspect is based on websites such as https://trello.com/.
