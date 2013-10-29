Ext.define('SimpleTasks.view.override.tasks.Fields', {
    override: 'SimpleTasks.view.tasks.Fields',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'datefield',
                    margin: '0 15 0 0',
                    width: 185,
                    name: 'due',
                    fieldLabel: 'Due Date',
                    labelWidth: 80
                },
                 {
                            xtype: 'treepicker',
                            name: 'list_id',
                            fieldLabel: 'Task List',
                            labelWidth: 60,
                            displayField: 'name',
                            store: Ext.create('SimpleTasks.store.Lists', {storeId: 'Lists-TaskEditWindow'}),
                            flex: 1
                        }
            ]
        });

        me.callParent(arguments);
    }
    
});