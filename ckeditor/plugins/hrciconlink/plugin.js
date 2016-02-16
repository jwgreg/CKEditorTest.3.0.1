CKEDITOR.plugins.add( 'hrciconlink', {
	// Register the icons.
	icons: 'hrciconlink',
	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Define an editor command that opens our dialog window.
		editor.addCommand( 'hrciconlink', new CKEDITOR.dialogCommand( 'hrciconlinkDialog' ) );
		editor.ui.addButton( 'Hrciconlink', {
			label: 'Insert Icon Link',
			command: 'hrciconlink',
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			// Add a context menu group with the Edit iconlink item.
			editor.addMenuGroup( 'hrciconlinkGroup' );
			editor.addMenuItem( 'hrciconlinkItem', {
				label: 'Edit Icon Link',
				icon: this.path + 'icons/hrciconlink.png',
				command: 'hrciconlink',
				group: 'hrciconlinkGroup'
			});
			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'hrciconlink', true ) ) {
					return { hrciconlinkItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}

		// Register our dialog file -- this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'hrciconlinkDialog', this.path + 'dialogs/hrciconlink.js' );
	}
});