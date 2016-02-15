// Dialog definition.
CKEDITOR.dialog.add( 'contactDialog', function( editor ) {
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Contact Details',
		minWidth: 600,
		minHeight: 300,

		// Dialog window content definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'tab-basic',
				label: 'Basic Settings',

				// The tab content.
				elements: [
                    {
						type: 'text',
						id: 'contactName',
						label: 'Name:',
						className: 'contactNameClass',
						validate: CKEDITOR.dialog.validate.notEmpty(" Name field required."),
						setup: function( element ) {
							this.setValue( element.getAttribute('name') );
						},
						commit: function( element ) {
							element.setAttribute( 'name', this.getValue() );
						}
					}, {
						type: 'text',
						id: 'contactTitle',
						label: 'Title:',
						validate: CKEDITOR.dialog.validate.notEmpty(" Title field required."),
						setup: function( element ) {
							this.setValue( element.getAttribute( "title" ) );
						},
						commit: function( element ) {
							element.setAttribute( "title", this.getValue() );
						}
					}, {
						type: 'text',
						id: 'contactEmail',
						label: 'Email:',
						validate: CKEDITOR.dialog.validate.notEmpty(" Email field required."),
						setup: function( element ) {
							this.setValue( element.getAttribute( "email" ) );
						},
						commit: function( element ) {
							element.setAttribute( "email", this.getValue() );
						}
					}, {
						type: 'text',
						id: 'contactPhone',
						label: 'Phone:',
						validate: CKEDITOR.dialog.validate.notEmpty(" Phone field required."),
						setup: function( element ) {
							this.setValue( element.getAttribute("phone") );
						},
						commit: function( element ) {
							element.setAttribute( "phone", this.getValue() );
						}
					}, {
						type: 'text',
						id: 'contactUrl',
						label: 'Url:',
						setup: function( element ) {
							this.setValue( element.getAttribute("url") );
						},
						commit: function( element ) {
							element.setAttribute( "url", this.getValue() );
						}
					}
				]
			}
		],

		onShow: function() {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

            if(isFakeContactElement(element))
            {
                element = editor.restoreRealElement(element); 
            } 

			if(element)
				element = element.getAscendant('hrc-contact', true);

			if(!element || element.getName() != 'hrc-contact') {
				element = editor.document.createElement('hrc-contact');
				this.insertMode = true;
			} else {
				this.insertMode = false;
			}

			this.element = element;
			if(!this.insertMode)
				this.setupContent(this.element);
		},

		onOk: function() {
			var dialog = this;
			dialog.commitContent(this.element);
			if(this.insertMode)
            {
                var attributes = {}; 
                
                var name = this.element.getAttribute('name'); 
                var title = this.element.getAttribute('title'); 
                var email = this.element.getAttribute('email'); 
                var phone = this.element.getAttribute('phone'); 
                var url = this.element.getAttribute('url'); 
                
                if(name) attributes['name'] = name; 
                if(email) attributes['email'] = email; 
                if(title) attributes['title'] = title; 
                if(phone) attributes['phone'] = phone; 
                if(url) attributes['url'] = url; 
                
                // INSERT ATTRIBUTES
                var parserElement = new CKEDITOR.htmlParser.element('hrc-contact', attributes); 
                
                var fake = createFakeParserElementForContact(editor, parserElement,'cke_hrc_contact', 'hrc-contact', false);
				editor.insertHtml(fake.getOuterHtml());
            }
		},
		onCancel: function() {
			
		}

	};
});