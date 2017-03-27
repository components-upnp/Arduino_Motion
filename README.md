# Arduino_Motion
Capteur de présence UPnP basé sur Arduino

INSTALLATION:

    i - Avoir nodeJs installé sur la machine
    ii - Télécharger et décompresser l'archive du projet dans un dossier
    iii - Lancer les commandes npm install johnny-five et npm install peer-upnp depuis un terminal dans le répertoire du projet
    iv - Cabler les composants physiques sur la carte Arduino (confère la schéma ci-dessous)
    v - Brancher la carte sur la machine (port COM3 par défaut, si branchée sur un autre port, le préciser dans index.js)
    vi - Depuis l'IDE Arduinon, lancer le sketch File > Examples > Firmata > StandardFirmata
    vii - Lancer l'application avec la commande node index.js
    
Ici, lien vers le schéma du circuit:
https://github.com/components-upnp/Arduino_Luminosity/blob/master/upnp_Motion/circuit.png


Ce device lorsqu'il perçoit un mouvement dans son environnement, lance un évènement UPnP avec une variable d'état (type string).
Dans notre implémentation, cette valeur est soit 0 lorsqu'il n'y a pas de mouvement soit 100.

Cas d'utilisation du potentiomètre UpNP:
    -Gestion de la lumière dans une salle
    -Surveillance d'une salle
    
