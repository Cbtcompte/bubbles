INSTALL

Version 2

Ce document a pour objectif de fournir des instructions claires sur la construction, les tests et l'exécution du projet à partir du code source.

## Installation et Exécution du Projet

### Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- Java JDK 8 ou version supérieure
- Maven 3.x
- Git
- Xamp ou Wamp

### Récupération du Code Source

Si vous n'avez pas encore récupéré le code source du projet, suivez ces étapes en utilisant Git. Exécutez la commande suivante dans votre terminal :

```bash
git clone https://gitlab.istic.univ-rennes1.fr/mdenahou/pdl_project_groupe_4.git
cd pdl_project_groupe_4
```

### Construction du Projet

Pour construire le projet, exécutez la commande suivante :

```bash
mvn clean install
```

### Exécution des Tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
mvn test
```

### Exécution du Logiciel

Pour exécuter le programme, 
- Commencez par lancer XAMP ou WAMP avec les options MYSQL et APACHE activées
- Ensuite, allez dans la classe `Application.java` du projet 
- Exécutez-la en tant qu'application Java depuis votre IDE.
Pour arrêter le programme, appuyez sur le bouton carré rouge et arrêtez XAMP ou WAMP.

## Support

Si vous avez des questions ou des préoccupations, n'hésitez pas à contacter l'un des membres du groupe sur Teams ou par e-mail :

- [DENAHOU Michael](mailto:michael-marino-d.denahou@etudiant.univ-rennes1.fr)
- [THOO Graciela](mailto:omonliwi.thoo@etudiant.univ-rennes1.fr)
- [TESSE WAMBA Loica](mailto:loica-cynthiche.tesse-wamba@etudiant.univ-rennes1.fr)
```
