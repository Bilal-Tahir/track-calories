# Calories Tracker

Calories Tracker is a simple and easy-to-use app designed to help you track your daily calories intake. With a user-friendly interface, you can list and monitor the calories you consume, making it easier to manage your diet and maintain a healthy lifestyle.

## Features

- **User Authentication:** Sign up and log in securely to manage your calories.
- **Calories Entry:** Add your meals and calories to track your daily intake.
- **Weekly Summaries:** Get a summary of your weekly calorie consumption.

## Getting Started

These instructions will help you get the project up and running on your local machine for development and testing purposes.

### Pre-requisites

- Ruby version 2.7.8
- PostgreSQL

### Installation

- Clone repo and open project folder from terminal
- Run `bundle install` to install all dependencies
- Setup database
  - Add your database info inside config/databse.yml
  - Run `rails db:create`
  - Run `rails db:migrate`
  - Run `rails db:seed`

## Running locally

In the project directory, you can run to start the project:

### `rails s`
