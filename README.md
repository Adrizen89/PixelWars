# DOCUMENTATION PIXEL WARS

## Introduction

Cette application permet la création d'une image de façon collaborative, en invitant chaque utilisateur connecté à dessiner un pixel.
(TP réalisé dans le cadre d'une Formation)

### Installation

Suivez les étapes suivantes pour installer localement ce projet :

- Clonez le dépôt sur dans un répertoire.

### Backend

Installer les dépendances  
``cd backend``   
``npm install``

### Frontend

Installer les dépendances  
``cd frontend``   
``npm install``

### Configuration base de données

- Créer la base de données en ouvrant votre fenêtre MySql et en y ajoutant ce code :
- ``CREATE DATABASE pixel_wars;
     USE pixel_wars;``   
``CREATE TABLE pixels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    x INT NOT NULL,
    y INT NOT NULL,
    color VARCHAR(7) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );``

- Configurez la connexion à la base de données dans le fichier server.js dans le dossier 'backend'.

## Exécution de l'application

- Placez vous dans le répertoire backend et tapez :
 ``node server.js``
- Placez vous dans le répertoire frontend et tapez :
 ``npm run serve``
- Ouvrez le projet à l'adresse suivante : http://localhost:8080/

## Utilisation de l'application

- Pour utiliser l'application, vous pouvez choisir la couleur de votre pixel en cliquant sur le bouton en bas de l'écran.
- Cliquez dans la zone délimitée d'une bordure.
- Une fois cliquée, vous devez attendre 3 minutes afin de replacer un pixel.

## Versions
**Version :** 1.0

## Auteur
* **Adrien Berard**

