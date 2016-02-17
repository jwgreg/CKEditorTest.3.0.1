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
