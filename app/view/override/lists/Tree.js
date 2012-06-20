Ext.define('SimpleTasks.view.override.lists.Tree', {
    override: 'SimpleTasks.view.lists.Tree',
    
     viewConfig: {
            plugins: {
                ptype: 'tasksdragdrop',
                dragText: 'Drag to reorder',
                ddGroup: 'task'
            }
    },
    
    initComponent: function(){              
        this.callOverridden(arguments);
        
        this.plugins = [this.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing')];

        this.relayEvents(this.getView(), ['taskdrop', 'listdrop']);
    }
    
});