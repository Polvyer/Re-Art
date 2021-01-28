# [Re:Art](https://floating-hamlet-42717.herokuapp.com/posts)
> A social media platform for visual artists who wish to improve their art. It focuses on community-sourced feedback where users help each other out.

Website live at: https://floating-hamlet-42717.herokuapp.com (it might take a bit too load)

<p align="center">
  <img src="https://media.giphy.com/media/KnQb2DFQMo0olzsRnQ/giphy.gif" />
</p>

## App Screenshots
<table align="center">
  <tr>
    <th>App Home</th>
    <th>App Login</th>
    <th>App Upload</th>
    <th>App Portfolio</th>
  </tr>
  <tr>
    <td><img width="300em" src="https://i.ibb.co/FwmgQCc/Screen-Shot-2021-01-19-at-9-34-23-PM.png" alt="Home" /></td>
    <td><img width="300em" src="https://i.ibb.co/KspFNqP/Screen-Shot-2021-01-20-at-5-30-54-AM.png" alt="Login" /></td>
    <td><img width="300em" src="https://i.ibb.co/PxXqWhb/Screen-Shot-2021-01-19-at-9-35-19-PM.png" alt="Upload" /></td>
    <td><img width="300em" src="https://i.ibb.co/q7bwWY2/Screen-Shot-2021-01-19-at-9-34-42-PM.png" alt="Portfolio" /></td>
  </tr>
</table>

<table align="center">
  <tr>
    <th>App Image Modal</th>
    <th>App Post</th>
    <th>App Comment + Attachment</th>
    <th>App Edit Portfolio</th>
  </tr>
  <tr>
    <td><img width="300em" src="https://i.ibb.co/svYrhgm/Screen-Shot-2021-01-19-at-9-36-45-PM.png" alt="Image Modal" /></td>
    <td><img width="300em" src="https://i.ibb.co/fHFx8gh/Screen-Shot-2021-01-19-at-9-38-06-PM.png" alt="Post" /></td>
    <td><img width="300em" src="https://i.ibb.co/7y4vG1b/Screen-Shot-2021-01-19-at-9-36-59-PM.png" alt="Comment + Attachment" /></td>
    <td><img width="300em" src="https://i.ibb.co/DYD2SS6/Screen-Shot-2021-01-19-at-9-35-02-PM.png" alt="Edit Portfolio" /></td>
  </tr>
</table>

## Features
- You can upload images of your art publicly or privately, requesting feedback for each image you upload
- Community members who see feedback requests may respond to community posts
- Responses may be replied to in order to create dialogue between community members and adding visual reference is also possible in responses through the attachment feature
- Responses and replies have ratings associated with them so that useful feedback is rewarded
- You can find a specific post using the search feature
- You can edit your portfolio to describe who you are
- You can view the portfolio of posts that you have made over your course of time using this app
- To ensure a safe and worry-free community, you may remain anonymous if you wish

## Installation (via Docker-Compose)

You could run each individual container using the Dockerfiles. In this case there is 2 containers to manage, so you should use docker-compose instead. Compose is a tool for defining and running multi-container Docker applications.

Build images
```bash
docker-compose build
```
Run the dockers
```bash
docker-compose up
```
