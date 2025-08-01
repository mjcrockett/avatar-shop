    // src/assets/js/avatar-renderer.d.ts
    interface JQuery {
        /**
         * Initializes avatar on the selected elements.
         * @param methodOrOptions Optional configuration options for the plugin.
         */
        avatar(methodOrOptions: AvatarConfiguration): JQuery;

        /**
         * Calls a specific method of avatar instance.
         * @param methodOrOptions The name of the method to call.
         * @param percent A number to define the scale, 1 is default.
         */
        avatar(methodOrOptions: 'scale', percent: number): void;

        /**
         * @param methodOrOptions The name of the method to call.
         */
        avatar(methodOrOptions: 'breathe'): void;

        /**
         * @param methodOrOptions The name of the method to call.
         * @param isFlinch Defines if the avatar should blink when the user clicks.
         */
        avatar(methodOrOptions: 'blink', isFlinch: boolean): void;

        /**
         * @param methodOrOptions The name of the method to call.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'wave', handleComplete?: Function): void;
        
        /**
         * @param methodOrOptions The name of the method to call.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'jump', handleComplete: Function): void;
        
        /**
         * @param methodOrOptions The name of the method to call.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'confused', handleComplete: Function): void;

        /**
         * @param methodOrOptions The name of the method to call.
         * @param isActive Turns it off (possibly?)
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'bored', isActive: boolean, handleComplete: Function): void;
    
        /**
         * @param methodOrOptions The name of the method to call.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'laughing', handleComplete: Function): void;
 
        /**
         * @param methodOrOptions The name of the method to call.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'celebrate', handleComplete: Function): void;

        /**
         * @param methodOrOptions The name of the method to call.
         * @param expression A string representation of the possible mouths: neutral, smirk, smile, full-smile, frown, full-frown, surprised, ooo.
         */
        avatar(methodOrOptions: 'mouth', expression: string): void;
        
        /**
         * @param methodOrOptions The name of the method to call.
         * @param eyes A string representation of the possible eyes: bored, closed, excited, confused, normal, hard-close
         */
        avatar(methodOrOptions: 'eyes', eyes: string): void;
 
        /**
         * @param methodOrOptions The name of the method to call.
         */
        avatar(methodOrOptions: 'disableActions'): void;
        
        /**
         * @param methodOrOptions The name of the method to call.
         */
        avatar(methodOrOptions: 'enableActions'): void;
     
        /**
         * @param methodOrOptions The name of the method to call.
         */
        avatar(methodOrOptions: 'changeOrientation'): void;
            
        /**
         * @param methodOrOptions The name of the method to call.
         * @param newBodyParts The AvatarParts body object 
         */
        avatar(methodOrOptions: 'insertNewParts', newBodyParts: AvatarParts): void;
                    
        /**
         * @param methodOrOptions The name of the method to call.
         * @param degrees The number of degrees to rotate the avatar's head.
         */
        avatar(methodOrOptions: 'rotateHeadToDegrees', degrees: number): void;
                            
        /**
         * @param methodOrOptions The name of the method to call.
         * @param isActive Possibly turns it off or on.
         * @param xPos X position the avatar's head should look to.
         * @param yPos Y position the avatar's head should look to.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'headLookAtPoint', isActive: boolean, xPos: number, yPos: number, handleComplete: Function): void;
             
        /**
         * @param methodOrOptions The name of the method to call.
         * @param isActive Possibly turns it off or on.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'headFollowCursor', isActive: boolean, handleComplete: Function): void;

        /**
         * @param methodOrOptions The name of the method to call.
         * @param isActive Possibly turns it off or on.
         * @param handleComplete The complete callback.
         */
        avatar(methodOrOptions: 'headFollowElement', isActive: boolean, handleComplete: Function): void;

        /**
         * @param methodOrOptions The name of the method to call.
         */
        avatar(methodOrOptions: 'destroy'): void;
    }

    /**
* Represents a AvatarParts.
* @typedef AvatarParts
* @property {string} head - String path to image file for the head
* @property {string} hair - String path to image file for the hair
* @property {string} torso - String path to image file for the torso
* @property {string} leftArm - String path to image file for the leftArm
* @property {string} rightArm - String path to image file for the rightArm
* @property {string} legs - String path to image file for the legs
* @property {string} feet - String path to image file for the feet
*/

interface AvatarParts {
  head?: string;
  hair?: string;
  torso?: string;
  leftArm?: string;
  rightArm?: string;
  legs?: string;
  feet?: string;
}

/**
* Represents a AvatarConfiguration.
* @typedef AvatarConfiguration
* @property {AvatarParts} bodyParts - Collection of string paths to the avatar body part images
* @property {boolean} facingRight - Boolean defining if the avatar should face to the right
* @property {boolean} justTheHead - Boolean defining if the just the avatar's head should be visible
* @property {boolean} shouldBlink - Boolean defining if the avatar should ever blink of not
* @property {boolean} showShadow - Boolean defining if the avatar's shadow should be visible
* @property {number} xPos - The x position of the avatar in the canvas
* @property {number} yPos - The y position of the avatar in the canvas
* @property {number} scale - The size of the avatar as a decimal, 1 being the default
* @property {function} complete - Callback function when the the avatar is ready
*/

interface AvatarConfiguration {
  bodyParts?: AvatarParts;
  facingRight?: boolean;
  justTheHead?: boolean;
  shouldBlink?: boolean;
  showShadow?: boolean;
  xPos?: number;
  yPos?: number;
  scale?: number;
  complete?: Function;
}


