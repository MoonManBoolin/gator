# Gator

The gator CLI tool fetches posts and parses xml from RSS feeds. It manages users, feeds, posts, and user-feed relationships in postgreSQL database. It has a variety of commands to use at your disposal.

## Table of Contents
 - [Prerequiesites](#prerequisites)
 - [Installation](#installation)
 - [Configuration](#configuration)
 - [Usage](#usage)
 - [Commands](#commands)


## Prerequisites

Before you can run this tool, you'll need the following on your system:

 - `Node.js 2.15.0 or Newer`
 - `npm (Node package manager)`


## Installation

To get started with the Gator CLI tool, follow these steps:

1. Clone the repository:
    ```bash
   git clone https://github.com/MoonManBoolin/gator

2. Navigate into the project Directory:
    cd gator

3. Install the required dependencies:
    npm install

## Configuration

1. Create a file named .gatorconfig.json in the root directory of the project

2. The .gatorconfig.json file should have the following structure (Make sure to replace the example values with your own actual values):
{
  "db_url": "postgres://username:password@localhost:5432/gator?sslmod=disable"
}

## Usage

Once installed and configured you can run the tool from your terminal with: npm run start <command> <additional_arguments>

## Commands

Here is the list of commands Gator currently has to offer (Note: for each of these commands you should prepend "npm run start" to them. Commands with (?) in front of them mean the arguments are optional):

 - register "username": Registers a new user with desired username and sets that user as the current user. Note, if "username" must not already exist.  
 - login "username": Sets desired user as current user. Note, user must exist in database.
 - users: Lists all users currently in the database.
 - feeds: Lists all the feeds the current user is following.
 - addfeed "feed_name" "feed_url": Adds a new feed to the database and follows that feed for the current user.
 - follow "feed_url": Follows a feed in the database by inputing its url for the current user.
 - unfollow "feed_url": Unfollows a feed the current user is following
 - following: Lists all the feeds the current user is following.
 - agg "time_between_requests": Goes through the added feeds and adds the posts to the database. Note: Careful with the time_between_requests as this makes requests to the feed urls which could unintentionally DOS the servers.
 - (?) browse "limit": Lists posts from the followed feeds. Lists 2 posts unless limit is specified.
 - reset: Resets all the tables in the database.