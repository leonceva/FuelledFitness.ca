# Fuelled Fitness Front-End

Welcome to the ReactJS app front-end the website of Fuelled Fitness. This repository contains the client-side code for the custom platform, which is currently under development.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Platform](#platform)

## Introduction

Aside from a traditional website containing all the information regarding the Registered Dietitian and Personal Trainer services offered by Fuelled Fitness, it also contains a custom-built platform to create, edit, and view training programs. This repository specifically houses the front-end codebase, built with ReactJS.

Please note that the custom platform is still under development, and this repository focuses on the user interface and client-side functionality. The back-end server supporting this platform is not viewable to the public.

## Features

-   **ReactJS:** The front-end is built using ReactJS, providing a dynamic and responsive user interface.
-   **Under Development:** The platform is actively being developed, with new features and improvements added regularly.
-   **Back-End Server:** While the back-end server is not publicly accessible, it plays a crucial role in supporting the functionality of the platform. Created with Node.js as an Express App, using RESTful routes, and a PostreSQL Database. The back-end server is deployed in a Docker container.

## Platform

The custom-built is designed to facilitate the workload of the professionals at Fuelled Fitness. The platform consists of two main components:

### Admin Dashboard

The desktop-focused admin console is a powerful tool designed for administrators to manage programs and users efficiently. Key features of the admin console include:

-   **Program Management:** Create and edit workout programs, allowing administrators to easily create programs using templates and a database of exercises and movement, each with its respective linked tutorial video.
-   **User Management:** Admins can manage users, including creating new accounts, editing user details, and controlling access to specific features.

-   **Authentication:** User authentication is handled securely through the back-end server. Additionally, administrators have the option to integrate Google OAuth for streamlined login processes.

### Client Dashboard

The mobile-focused client dashboard provides a user-friendly interface for clients to interact with the platform. It is designed with a focus on responsiveness and ease of use. Key features of the client dashboard include:

-   **Personal Programs:** Clients can view and access their personalized programs created by administrators in the admin dashboard.

-   **Check-in Submission:** Users can submit check-ins, providing valuable feedback or data for feedback as part of the training process.

-   **Secure Authentication:** User authentication for the client dashboard is seamlessly handled through the back-end server, ensuring the security of user data. Additionally, clients have the option to integrate Google OAuth for streamlined login processes.

### Integration with Back-End Server

While the admin console and client dashboard provide distinct functionalities, both components seamlessly integrate with the back-end server. The server handles user authentication, data storage, and communication between the front-end and back-end components. Please note that the back-end server is not viewable to the public.

This two-tier architecture ensures a robust and secure environment as all data is parsed and sanitized both on the front-end and back-end prior to any action taken.
