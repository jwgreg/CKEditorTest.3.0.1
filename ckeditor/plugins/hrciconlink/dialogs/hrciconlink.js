// Our dialog definition.
CKEDITOR.dialog.add('hrciconlinkDialog', function(editor) {

    // var branchArray = {
    //     branches: []
    // };
    var epmdArray = {
        branches: []
    };
    var opmdArray = {
        branches: []
    };
    var tagdArray = {
        branches: []
    }
    var selectedClass;
    var textValue;

    editor.addContentsCss('../../styles/insignia.css');

    function loadBranchSelect(thisSelect, type) {

        removeAllOptions(thisSelect);

        switch (type) {
            case 'EPMD':
                thisSelect.add('-- Choose Branch --', '');
                for (var i = 0; i < epmdArray.branches.length; i++) {
                    thisSelect.add(epmdArray.branches[i].Description, epmdArray.branches[i].Value);
                }
                break;
            case 'OPMD':
                thisSelect.add('-- Choose Branch --', '');
                for (var i = 0; i < opmdArray.branches.length; i++) {
                    thisSelect.add(opmdArray.branches[i].Description, opmdArray.branches[i].Value);
                }
                break;
            default:
                thisSelect.add('-- Choose Branch --', '');
                for (var i = 0; i < tagdArray.branches.length; i++) {
                    thisSelect.add(tagdArray.branches[i].Description, tagdArray.branches[i].Value);
                }
                break;
        }

    }

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
            elements: [{
                type: 'radio',
                id: 'icontype',
                label: 'Icon Type',
                items: [
                    ['EPMD', 'EPMD'],
                    ['OPMD', 'OPMD'],
                    ['Logos', 'TAGD']
                ],
                default: 'EPMD',
                onChange: function() {
                    var thisType = this.getValue();
                    var thisDialog = this.getDialog();
                    var thisSelect = thisDialog.getContentElement('tab-basic', 'branch');
                    loadBranchSelect(thisSelect, thisType);
                }
            }, {
                type: 'select',
                id: 'branch',
                label: 'Select a Branch',
                items: [
                    ['-- Choose Branch --', '']
                ],
                onChange: function() {
                    // This section needs work, it does not work as desired
                    var thisDialog = this.getDialog();
                    var imgPreview = thisDialog.getContentElement('tab-basic', 'imagePreview');
                    var linkText = thisDialog.getContentElement('tab-basic', 'linktext');
                    selectedClass = this.getValue();
                    var input = this.getInputElement().$;
					textValue = input.options[ input.selectedIndex ].text;
                    var calcId = imgPreview.domId;
                    document.getElementById(calcId).className = "imgElement " + selectedClass;
					linkText.setValue(textValue);
                }
            }, {
                type: 'html',
                id: 'imagePreview',
                html: '<div></div>'
            }, {
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

            }, {
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
            }]
        }],
        onLoad: function() {
            // Get the Select Object to load the branch data
            var thisSelect = this.getContentElement('tab-basic', 'branch')

            var userType = "Officer"
                // Set the path for the JSON Data
            var jsonBranchPath = "../../json/branches.json";

            // Read the JSON Branch data and load into appropriate arrays to fill Branch Select Box
            $.getJSON(jsonBranchPath, function(data) {
                var jsonData = {};
                $.each(data, function(idx, obj) {
                    $.each(obj, function(key, value) {
                        // Load the array for TAGD
                        if (value.logoClass != '')
                            tagdArray.branches.push({
                                "Description": value.title,
                                "Value": value.logoClass
                            });
                        // Load the array for OPMD
                        if (value.insigniaClass != '')
                            opmdArray.branches.push({
                                "Description": value.title,
                                "Value": value.insigniaClass
                            });
                        // Load the array for EPMD
                        if (value.plaqueClass != '')
                            epmdArray.branches.push({
                                "Description": value.title,
                                "Value": value.plaqueClass
                            });
                    });
                });

                // Load the Branch data from the EPMD array
                loadBranchSelect(thisSelect, 'EPMD');


            });

        },

        // Invoked when the dialog is loaded.
        onShow: function() {
            //alert ("Dialog 'onShow' event fired.");

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
            var dialog = this;
            dialog.commitContent(this.element);

            var attributes = {};

            var linkText = this.element.getAttribute('linktext');
            var linkUrl = this.element.getAttribute('linkurl');

            if (selectedClass) attributes['cssClass'] = selectedClass;
            if (linkText) attributes['linkText'] = linkText;
            if (linkUrl) attributes['linkUrl'] = linkUrl;
            //var link = this.element.getAttribute('')
            // The context of this function is the dialog object itself.
            // http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
            //var dialog = this;

            // Create a new <hrciconlink> element.
            //var hrciconlink = this.element;

            // Invoke the commit methods of all dialog window elements, so the <hrciconlink> element gets modified.
            //this.commitContent(hrciconlink);

            // Finally, if in insert mode, insert the element into the editor at the caret position.
            //if (this.insertMode)
            var result = buildHtml(attributes);
            editor.insertHtml(result);
        }
    };
});
