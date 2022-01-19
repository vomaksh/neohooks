<div align="center">
  <img src="screenshots/logo.svg" height="72" width="72" />
  <h1>
    <a href="https://neohooks.site" target="_blank">
      Neohooks
    </a>
  </h1>
</div>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.5.1-gree.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Debug and test webhooks at ease

## Introduction

Neohooks provides you a playground for webhook debugging and testing without a hassle. It provides unique and random URLs which can be used to debug and test webhooks and HTTP requests.

Neohooks is inspired by [webhook.site](https://webhook.site). It is more focused on self hosting though you can use the [live version](https://neohooks.site).

## Screenshots

In light mode                                                                     |  In dark mode
:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:
![](https://github.com/iyorozuya/neohooks/raw/master/screenshots/light-mode.png)  |  ![](https://github.com/iyorozuya/neohooks/raw/master/screenshots/dark-mode.png)

## Todos

- [ ] Remove hardcoded strings such as domains and add those to env file
- [ ] Add error handling for every API endpoint on UI
- [ ] CI/CD 
- [ ] Add unit tests on UI and API
- [ ] Write a CLI client which can talk to API
- [ ] Add integration tests

I haven't added features in todos. Please file an issue, if a feature is required that you consider essential.

## Local development

This application consists of 2 docker-compose files namely docker-compose.yml and docker-compose-dev.yml.

docker-compose-dev.yml is for running the application locally and docker-compose.yml is for self hosting the application.

You need to have the following tools installed to run neohooks locally
- docker
- docker-compose

To run the application locally run
```docker-compose -f docker-compose-dev.yml up -d```
 at the root of the project.

## Contributing

If you found any bug or want a feature then please file an issue.

## Author

- **Akshay Mahajan**
  - Github: [@iyorozuya](https://github.com/iyorozuya)
  - LinkedIn: [@akshay-m-05aab8112](https://linkedin.com/in/akshay-m-05aab8112)

## Show your support

Please give a ⭐️ if you found neohooks useful.

## License

Copyright © 2022 Akshay Mahajan.

This project is MIT licensed.

<hr />

<p align="center">Made with ❤️ in India</p>