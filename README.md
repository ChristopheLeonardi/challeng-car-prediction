# challenge-car-prediction
Lien trello : https://trello.com/invite/challengecarprediction/ATTI715d5c12d4bd4bbde3099a0d63af39164698A49A
Lien Github : https://github.com/ChristopheLeonardi/challeng-car-prediction.git

## Objectif :

Ce projet doit permettre la prédiction du prix d'une voiture d'occasion d'un utilisateur visitant un site web. Afin de permettre sa réalisation, les données des voitures du site lacentrale.fr sont scrappé. Les données prélevées sont utilisées afin de créer un algorythme de prédiction du prix de la voiture. Le backend est créé à l'aide de la technologie Django et le frontend avec React.

## Scrapping des données
Le code du scrapping est présent dans le dossier notebook-test
Le scrapping se décompose en plusieurs parties.
Dans le fichier scrapping.ipynb, on récupère les informations sur le véhicule. 
Dans un premier temps, on récupère les pages de véhicule qui n'ont pas de soucis.
Après, on va chercher les informations nécessaires dans chaque page.
(vous pouvez retrouver des résultats intermédiaires dans le même repository)

On a aussi ajouté un fichier scrape_categories.ipynb
dans ce fichier, on va pouvoir jouer avec les filtres de recherche pour récupérer marques et type de véhicules
(les résultats sont dans retrieved_data)

## Nettoyage des données

## Entrainement de l'algorithme
L'algorithme est présent dans le fichier backend/api/MLP_prediction.py
Le fichier notebook-test/ML car price.ipynb présente l'étude des données et l'entrainement de algorithme.

## Backend avec api Rest
Le code du backend Django se situe dans le dossier backend
Afin de le faire fonctionner, il est nécessaire d'installer django, djongo, rest_framework et corsheaders pour permettre les appels API entre backend et frontend.

Le backend est responsable de l'envoi des données par l'utilisation d'une api requêtée à l'aide des url :
- localhost:8000/api/predict_price?q=[<données utilisées pour la description>]
    Complétée par l'attribut qu'elle permet de prédire le prix d'une voiture.

- localhost:8000/api/get_data 
    Cette url permet de récupérer l'ensemble des marques de voitures présentes dans a base de données afin de faciliter la saisie de l'utilisateur en lui proposant une liste de voiture

- localhost:8000/api/get_description 
    Cette requête permet de recueillir les données de la voiture sélectionnée afin de préremplir le formulaire.

## Frontend React
Le code du frontend se situe dans le dossier frontend et utilise React. Il utilise le module Downshift afin de générer un composant select dynamique.

## Base de données 
La base de données est constituée sur MongoDB Atlas