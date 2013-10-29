// need to override because of inability to add custom xtypes
Ext.define('SimpleTasks.view.override.tasks.Form', {
    override: 'SimpleTasks.view.tasks.Form',
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'component',
                cls: 'tasks-new',
                width: 24,
                height: 24
            },
            {
                xtype: 'textfield',
                name: 'title',
                emptyText: 'Add a new task'
            },
            {
                xtype: 'treepicker',
                name: 'list_id',
                displayField: 'name',
                store: Ext.create('SimpleTasks.store.Lists', {storeId: 'Lists-TaskForm'}),
                width: 195
            },
            {
                xtype: 'datefield',
                name: 'due',
                value: new Date(), // value of datefield can be an object
                width: 85
            }
        ];

        this.callParent(arguments);
    }
    
    
});