# Evaluate

A chrome extension to help users evaluate their understanding of text content consumed through the browser. Generate assessment questions from a page, answer the questions, and get feedback!

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/e65a3b43b9a74e80ba10cba56e315281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Inspiration

> This project is currently being built during the [Google Chrome Built-in AI Challenge 2025](https://googlechromeai2025.devpost.com/) event.

Evaluate is the first dynamic Chrome extension designed to leverage Chrome’s built-in AI for assessing user knowledge. The project was inspired by the quiz and self-assessment features commonly found on EduTech platforms such as **Udemy** and **Pluralsight**. We wanted to bring a similar interactive learning experience directly into the browser.

## What it does

**Evaluate** intelligently summarizes the entire text on a webpage, generates tailored assessment questions, and provides instant feedback on user responses. This process helps users identify knowledge gaps and guides them toward deeper learning and comprehension. 

Evaluate uses four question types ( single-choice, multi-choice, long input field, and short input field ) to keep the assessment engaging for users. Each question also contains a hint for users struggling with getting the answer.


## Requirements

- Node.js V22.15.1 
- PNPM 
- Chrome Web browser to load and use extension

## Usage

- Clone project from repo.
- Install project dependencies using `pnpm install` command. 
- Start project server from root directory using `pnpm dev` command.
- Load project as a chrome extension from generated `./dist` directory. 

Changes to the code will cause websocket connection to automatically reload extension with recent changes.