/* ========================================
   CONTRÔLE DE VITESSE STANDARDISÉ POUR LES DÉMONSTRATIONS
   ======================================== */

/* 
   Ce fichier contient la logique JavaScript standardisée pour le contrôle
   de vitesse des animations dans toutes les démonstrations MyCustomDesk.
   
   UTILISATION :
   1. Inclure ce script après demo-elements.css
   2. Ajouter la structure HTML standardisée (voir demo-elements.css)
   3. Utiliser les variables et fonctions fournies
   
   VARIABLES REQUISES DANS VOTRE SCRIPT :
   - animationTimer : Timer de l'animation principale
   - Une fonction startAnimation() qui utilise setInterval
   
   EXEMPLE D'INTÉGRATION :
   ```javascript
   // Variables standardisées
   let animationSpeed = 1;
   let baseInterval = 80;
   let animationTimer;
   
   function startAnimation() {
       const currentInterval = Math.round(baseInterval / animationSpeed);
       animationTimer = setInterval(() => {
           // Votre logique d'animation ici
       }, currentInterval);
   }
   
   // Initialiser le contrôle de vitesse
   initSpeedControl(startAnimation);
   ```
*/

/**
 * Initialise le contrôle de vitesse standardisé
 * @param {Function} animationStartFunction - Fonction qui démarre l'animation
 * @param {number} [defaultSpeed=1] - Vitesse par défaut (1x)
 * @param {number} [defaultInterval=80] - Intervalle de base en millisecondes
 */
function initSpeedControl(animationStartFunction, defaultSpeed = 1, defaultInterval = 80) {
    // Variables globales standardisées
    if (typeof window.animationSpeed === 'undefined') {
        window.animationSpeed = defaultSpeed;
    }
    if (typeof window.baseInterval === 'undefined') {
        window.baseInterval = defaultInterval;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        
        // Vérifier que les éléments existent
        if (!speedSlider || !speedValue) {
            console.warn('Contrôle de vitesse : Éléments HTML non trouvés. Assurez-vous d\'inclure la structure HTML standardisée.');
            return;
        }
        
        // Fonction pour redémarrer l'animation avec la nouvelle vitesse
        function restartAnimationWithNewSpeed() {
            if (typeof window.animationTimer !== 'undefined' && window.animationTimer) {
                clearInterval(window.animationTimer);
            }
            animationStartFunction();
        }
        
        // Écouteur d'événement pour le slider
        speedSlider.addEventListener('input', function() {
            window.animationSpeed = parseFloat(this.value);
            speedValue.textContent = window.animationSpeed + 'x';
            
            // Redémarrer l'animation avec la nouvelle vitesse
            restartAnimationWithNewSpeed();
        });
        
        // Initialiser l'affichage de la vitesse
        speedValue.textContent = window.animationSpeed + 'x';
        speedSlider.value = window.animationSpeed;
    });
}

/**
 * Calcule l'intervalle de timer en fonction de la vitesse actuelle
 * @param {number} [baseInterval] - Intervalle de base (utilise window.baseInterval par défaut)
 * @returns {number} - Intervalle calculé en millisecondes
 */
function getAnimationInterval(baseInterval) {
    const base = baseInterval || window.baseInterval || 80;
    const speed = window.animationSpeed || 1;
    return Math.round(base / speed);
}

/**
 * Met à jour la vitesse d'animation programmatiquement
 * @param {number} newSpeed - Nouvelle vitesse (0.25 à 3)
 * @param {Function} animationStartFunction - Fonction qui démarre l'animation
 */
function setAnimationSpeed(newSpeed, animationStartFunction) {
    if (newSpeed < 0.25 || newSpeed > 3) {
        console.warn('Vitesse d\'animation hors limites (0.25-3). Valeur ignorée.');
        return;
    }
    
    window.animationSpeed = newSpeed;
    
    // Mettre à jour l'interface
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    
    if (speedSlider) speedSlider.value = newSpeed;
    if (speedValue) speedValue.textContent = newSpeed + 'x';
    
    // Redémarrer l'animation
    if (typeof window.animationTimer !== 'undefined' && window.animationTimer) {
        clearInterval(window.animationTimer);
    }
    animationStartFunction();
}

/* ========================================
   CONSTANTES STANDARDISÉES
   ======================================== */

// Vitesses prédéfinies pour un accès facile
const ANIMATION_SPEEDS = {
    VERY_SLOW: 0.25,    // 4x plus lent
    SLOW: 0.5,          // 2x plus lent
    NORMAL: 1,          // Vitesse normale
    FAST: 1.5,          // 1.5x plus rapide
    VERY_FAST: 2,       // 2x plus rapide
    ULTRA_FAST: 3       // 3x plus rapide
};

// Intervalle de base standardisé (80ms = 12.5 FPS)
const STANDARD_BASE_INTERVAL = 80;

/* ========================================
   DOCUMENTATION D'UTILISATION
   ======================================== */

/*
STRUCTURE HTML STANDARDISÉE :
------------------------------
<div class="speed-control">
    <label for="speedSlider">Vitesse de l'animation :</label>
    <input type="range" id="speedSlider" min="0.25" max="3" step="0.25" value="1" class="speed-slider">
    <span id="speedValue">1x</span>
</div>

INTÉGRATION JAVASCRIPT :
------------------------
1. Inclure ce fichier : <script src="demo-speed-control.js"></script>
2. Dans votre script principal :

// Variables requises
let animationTimer;
let animationSpeed = 1;
let baseInterval = 80;

function startAnimation() {
    const currentInterval = getAnimationInterval(); // Utilise la fonction standardisée
    animationTimer = setInterval(() => {
        // Votre logique d'animation
    }, currentInterval);
}

// Initialiser le contrôle (après DOMContentLoaded)
initSpeedControl(startAnimation);

EXEMPLES D'USAGE AVANCÉ :
-------------------------
// Changer la vitesse programmatiquement
setAnimationSpeed(ANIMATION_SPEEDS.FAST, startAnimation);

// Utiliser une vitesse personnalisée
setAnimationSpeed(1.75, startAnimation);

// Obtenir l'intervalle pour une vitesse spécifique
const customInterval = getAnimationInterval(100); // Base de 100ms
*/
