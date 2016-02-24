/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.language = 'en';
	config.uiColor = '#E8E8E8';
	config.width = '100%';

    config.disableNativeSpellChecker = true; //This disables the native CKEditor Spell Checker.
    config.title = false; //Disables the pop-up tooltip in th editor body area.

    // Remove plugins here


    // Set options here
    // Prevent paragraph tags from being added to modified text.
    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftenterMode = CKEDITOR.ENTER_P;
    config.autoParagraph = false;


    // Set up to allow all content types

    config.allowedContent = {
        'hrc-contact':
        {
            attributes: true,
            styles: true,
            classes: true
        },
        $1: {
            // Use the ability to specify elements as an object.
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
        }
    };
    
    
    // Add extra plugins here
    config.extraPlugins = 'widget,hrcwidgetbootstrap,hrccontact,abbr,hrciconlink';

    // Setup the custom toolbar
    config.toolbar = [
    	{
    		name: 'document',
            items: ['Source', '-','Bold', '-', 'NumberedList', 'BulletedList', 'Table', '-', 'Link', 'Unlink', 'Anchor', '-', 'HrcwidgetbootstrapLeftCol', 
                    'HrcwidgetbootstrapRightCol', 'HrcwidgetbootstrapTwoCol', 'HrcwidgetbootstrapThreeCol', 'HrcwidgetbootstrapFourCol','HrcwidgetbootstrapPanel', '-', 'Hrccontact', 'Abbr', 'Hrciconlink']  
        }, { 
            name: 'styles',     
            items: ['Styles', 'Format', 'Font', 'FontSize'] 
        }, { 
            name: 'editing', 
            items: ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'] 
        }, { 
            name: 'clipboard', 
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'] 

    	}
    ];





};
