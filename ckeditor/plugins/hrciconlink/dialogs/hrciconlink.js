// Our dialog definition.
CKEDITOR.dialog.add('hrciconlinkDialog', function(editor) {
    return {

        // Basic properties of the dialog window: title, minimum size.
        title: 'Icon Link Properties',
        minWidth: 400,
        minHeight: 200,

        // Dialog window content definition.
        contents: [{
            // Definition of the Basic Settings dialog tab (page).
            id: 'tab-basic',
            label: 'Basic Settings',

            // The tab content.
            elements: [
	            {
	                type: 'radio',
	                id: 'icontype',
	                label: 'Icon Type',
	                items: [
	                    ['Enlisted', 'EPMD'],
	                    ['Officer', 'OPMD']
	                ],
	                onClick: function() {
	                    alert('Value Chosen: ' + this.getValue());
	                }
	            }, 
	            {
	                type: 'select',
	                id: 'branch',
	                label: 'Select a Branch',
	                items: [
	                    ['Basketball'],
	                    ['Baseball'],
	                    ['Hockey'],
	                    ['Football']
	                ],
	                'default': 'Football'
	       //          onLoad: function () {
	       //          	(function($) {
		      //           	$.ajax({
		      //           		url: '/json/branches.json',
		      //           		datatype: 'json',
		      //           		data: '',
		      //           		success: function(data){
								// 	$("label").each(function() {
        //                                 var value = $(this).html();
        //                                 if (value == "Category") {
        //                                     cms_pageSelectElement = $(".cke_dialog_ui_input_select", $(this).parent());
        //                                 }
        //                                 if (value == "Album") {
        //                                     album_pageSelectElement = $(".cke_dialog_ui_input_select", $(this).parent());
        //                                 }
        //                             });		                		
								// }
		      //           	});
	       //          	})(jquery);
	       //          }
	       //          onChange: function(api) {
	       //              // this = CKEDITOR.ui.dialog.select
	       //              alert('Current value: ' + this.getValue());
	       //          }
	            }, 
	            {
	                // Text input field for the icon path text.
	                type: 'text',
	                id: 'icon',
	                label: 'Icon',

	                // Validation checking whether the field is not empty.
	                validate: CKEDITOR.dialog.validate.notEmpty("Icon field cannot be empty."),

	                // Called by the main setupContent method call on dialog initialization.
	                setup: function(element) {
	                    this.setValue(element.getText());
	                },

	                // Called by the main commitContent method call on dialog confirmation.
	                commit: function(element) {
	                    element.setText(this.getValue());
	                }
	            }, 
	            {
	                type: 'text',
	                id: 'linktext',
	                label: 'Link Text',
	                validate: CKEDITOR.dialog.validate.notEmpty("Link text field cannot be empty."),

	                setup: function(element) {
	                    this.setValue(element.getAttribute('linktext'));
	                },
	                commit: function(element) {
	                    element.setAttribute('linktext', this.getValue());
	                }

	            }, 
	            {
	                // Text input field for the link url
	                type: 'text',
	                id: 'linkurl',
	                label: 'URL',
	                validate: CKEDITOR.dialog.validate.notEmpty("URL field cannot be empty."),

	                // Called by the main setupContent method call on dialog initialization.
	                setup: function(element) {
	                    this.setValue(element.getAttribute('linkurl'));
	                },

	                // Called by the main commitContent method call on dialog confirmation.
	                commit: function(element) {
	                    element.setAttribute('linkurl', this.getValue());
	                }
	            }
            ]
        }],

        // Invoked when the dialog is loaded.
        onShow: function() {

            // Get the selection from the editor.
            var selection = editor.getSelection();

            // Get the element at the start of the selection.
            var element = selection.getStartElement();

            // Get the <hrciconlink> element closest to the selection, if it exists.
            if (element)
                element = element.getAscendant('hrciconlink', true);

            // Create a new <hrciconlink> element if it does not exist.
            if (!element || element.getName() != 'hrciconlink') {
                element = editor.document.createElement('hrciconlink');

                // Flag the insertion mode for later use.
                this.insertMode = true;
            } else
                this.insertMode = false;

            // Store the reference to the <hrciconlink> element in an internal property, for later use.
            this.element = element;

            // Invoke the setup methods of all dialog window elements, so they can load the element attributes.
            if (!this.insertMode)
                this.setupContent(this.element);
        },

        // This method is invoked once a user clicks the OK button, confirming the dialog.
        onOk: function() {

            // The context of this function is the dialog object itself.
            // http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
            var dialog = this;

            // Create a new <hrciconlink> element.
            var hrciconlink = this.element;

            // Invoke the commit methods of all dialog window elements, so the <hrciconlink> element gets modified.
            this.commitContent(hrciconlink);

            // Finally, if in insert mode, insert the element into the editor at the caret position.
            if (this.insertMode)
                editor.insertElement(hrciconlink);
        }
    };
});
