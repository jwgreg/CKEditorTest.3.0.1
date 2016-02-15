CKEDITOR.plugins.add( 'abbr', {
	// Register the icons.
	icons: 'abbr',
	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Define an editor command that opens our dialog window.
		editor.addCommand( 'abbr', new CKEDITOR.dialogCommand( 'abbrDialog' ) );
		editor.ui.addButton( 'Abbr', {
			label: 'Insert Abbreviation',
			command: 'abbr',
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'abbrGroup' );
			editor.addMenuItem( 'abbrItem', {
				label: 'Edit Abbreviation',
				icon: this.path + 'icons/abbr.png',
				command: 'abbr',
				group: 'abbrGroup'
			});
			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'abbr', true ) ) {
					return { abbrItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'abbrDialog', this.path + 'dialogs/abbr.js' );
	}
});