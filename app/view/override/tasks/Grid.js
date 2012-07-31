// need to override because of inability to add custom xtypes
Ext.define('SimpleTasks.view.override.tasks.Grid', {
    override: 'SimpleTasks.view.tasks.Grid',
    
    requires: [
        'SimpleTasks.ux.DragDrop',
        'SimpleTasks.ux.CheckColumn',
        'SimpleTasks.ux.ReminderColumn',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.grid.feature.Grouping',
        'Ext.grid.plugin.DragDrop',
        'Ext.ux.TreePicker'
    ],

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'task',
            dragText: 'Drag task to change list',
            enableDrop: false
        },
        getRowClass: function(record, rowIndex, rowParams, store){
            var due = record.get('due');
            if(record.get('done')) {
                return 'tasks-completed-task';
            } else if(due && (due < Ext.Date.clearTime(new Date()))) {
                return 'tasks-overdue-task';
            }
        }
    },


    initComponent: function() {
        var me = this;

        me.columns = {
            defaults: {
                draggable: false,
                resizable: false,
                hideable: false
            },
            items: [
                {
                    xtype: 'checkcolumn',
                    dataIndex: 'done',
                    cls: 'tasks-icon-column-header tasks-done-column-header',
                    width: 24,
                    align: 'center',
                    menuDisabled: true,
                    sortable: false,
                    listeners: {
                        'checkchange': Ext.bind(me.handleCheckChange, me)
                    }
                },
                {
                    text: 'Title',
                    dataIndex: 'title',
                    flex: 1,
                    emptyCellText: '',
                    editor: {
                        xtype: 'textfield',
                        selectOnFocus: true
                    }
                },
                {
                    text: 'List',
                    dataIndex: 'list_id',
                    width: 200,
                    editor: {
                        xtype: 'treepicker',
                        displayField: 'name',
                        store: Ext.create('SimpleTasks.store.Lists', {storeId: 'Lists-TaskGrid' })
                    },
                    renderer: me.renderList
                },
                {
                    xtype: 'datecolumn',
                    text: 'Due Date',
                    dataIndex: 'due',
                    width: 90,
                    editor: 'datefield',
                    format: 'n/j/Y',
                    emptyCellText: ''
                },
                {
                    xtype: 'remindercolumn',
                    dataIndex: 'reminder',
                    cls: 'tasks-icon-column-header tasks-reminder-column-header',
                    width: 24,
                    tooltip: 'Set Reminder',
                    menuPosition: 'tr-br',
                    menuDisabled: true,
                    sortable: false,
                    emptyCellText: '',
                    listeners: {
                        select: Ext.bind(me.handleReminderSelect, me)
                    }
                },
                {
                    xtype: 'actioncolumn',
                    cls: 'tasks-icon-column-header tasks-edit-column-header',
                    width: 24,
                    icon: 'resources/images/edit_task.png',
                    iconCls: 'x-hidden',
                    tooltip: 'Edit',
                    menuDisabled: true,
                    sortable: false,
                    handler: Ext.bind(me.handleEditClick, me)
                },
                {
                    xtype: 'actioncolumn',
                    cls: 'tasks-icon-column-header tasks-delete-column-header',
                    width: 24,
                    icon: 'resources/images/delete.png',
                    iconCls: 'x-hidden',
                    tooltip: 'Delete',
                    menuDisabled: true,
                    sortable: false,
                    handler: Ext.bind(me.handleDeleteClick, me)
                }
            ]
        };

        me.callOverridden(arguments);

    }
});