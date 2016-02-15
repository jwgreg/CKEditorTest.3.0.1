CKEDITOR.plugins.add( 'hrccontact', {
    // Register the icons.
    
	icons: 'hrccontact',
	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
        
		// Define an editor command that opens our dialog window.
		var pluginDirectory = this.path;
		var rootDirectory = document.location.pathname;
		editor.addCommand( 'hrccontact', new CKEDITOR.dialogCommand( 'contactDialog' ) );
		editor.ui.addButton( 'Hrccontact', {
			label: 'Insert Contact',
			command: 'hrccontact',
			toolbar: 'insert'
		});
		editor.addContentsCss( pluginDirectory + 'styles/hrccontact.css');	
        
        var contextMenu = new CKEDITOR.plugins.contextMenu(editor); 
        
		if ( editor.contextMenu ) {
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'hrccontactGroup' );
			editor.addMenuItem( 'hrccontactItem', {
				label: 'Edit Contact',
				icon: pluginDirectory + 'icons/hrccontact.png',
				command: 'hrccontact',
				group: 'hrccontactGroup'
			});
            
            var contactMatch = function(element) {
                return ( element.hasClass && (element.hasClass('hrc-contact') || element.hasClass('cke_hrc_contact')));
            }
            
			editor.contextMenu.addListener( function( element ) {
				if ( isFakeContactElement(element) || element.getAscendant( 'hrc-contact', true) ) {
					return { hrccontactItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}
        
		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'contactDialog', pluginDirectory + 'dialogs/contactDialog.js' ); 

        if(typeof editor.config.contentsCss == 'object') {
        	editor.config.contentsCss.push(CKEDITOR.getUrl(pluginDirectory + 'styles/hrccontact.css'));
        	// editor.config.contentsCss.push(CKEDITOR.getUrl(rootDirectory + 'font-awesome/css/font-awesome.min.css'));
        } else {
        	editor.config.contentsCss = [editor.config.contentsCss, CKEDITOR.getUrl(pluginDirectory + 'styles/hrccontact.css')];
        	// editor.config.contentsCss.push(CKEDITOR.getUrl(rootDirectory + 'font-awesome/css/font-awesome.min.css'));
        }
        
        // Use this to intercept things from fake element in source to real element
        //  editor.dataProcessor.htmlFilter.addRules( {
        //     elements: {
        //         'hrc-contact': function(el){
        //             console.log(el); 
        //         }
        //     }
        // })
        
        editor.dataProcessor.dataFilter.addRules( {
            elements: {
                'hrc-contact': function(el){
                    var fake = createFakeParserElementForContact(editor, el, 'cke_hrc_contact', 'hrc-contact', false); 
                    return fake; 
                }
            }
        })
        
    },
    
});

function isFakeContactElement(element){
    return element.hasClass('cke_hrc_contact');
}

function createFakeParserElementForContact( editor, realElement, className, realElementType, isResizable ) {
    var lang = editor.lang.fakeobjects,
        label = lang[ realElementType ] || lang.unknown,
        html;

    var writer = new CKEDITOR.htmlParser.basicWriter();
    realElement.writeHtml( writer );
    html = writer.getHtml();

    var attributes = {
        'class': className,
        'data-cke-realelement': encodeURIComponent( html ),
        'data-cke-real-node-type': realElement.type,
        alt: label,
        title: label,
        align: realElement.attributes.align || '',
        readonly: '',
        value: "Contact: " + realElement.attributes['name']
    };

    // Do not set "src" on high-contrast so the alt text is displayed. (#8945)
    if ( !CKEDITOR.env.hc )
        attributes.src = CKEDITOR.tools.transparentImageData;

    if ( realElementType )
        attributes[ 'data-cke-real-element-type' ] = realElementType;

    if ( isResizable ) {
        attributes[ 'data-cke-resizable' ] = isResizable;
        var realAttrs = realElement.attributes,
            fakeStyle = new cssStyle();

        var width = realAttrs.width,
            height = realAttrs.height;

        width !== undefined && ( fakeStyle.rules.width = cssLength( width ) );
        height !== undefined && ( fakeStyle.rules.height = cssLength( height ) );
        fakeStyle.populate( attributes );
    }

    var mainElement =  new CKEDITOR.htmlParser.element( 'input', attributes );
    
   // mainElement.setHtml("Contact: " + realElement.attributes['name']); 
    return mainElement; 
};