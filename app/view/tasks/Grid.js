/*
 * File: app/view/tasks/Grid.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SimpleTasks.view.tasks.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.taskGrid',

    requires: [
        'SimpleTasks.view.tasks.Form',
        'SimpleTasks.view.override.tasks.Grid'
    ],

    enableColumnMove: false,
    store: 'Tasks',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'editclick',
            'deleteclick',
            'recordedit',
            'reminderselect'
        );

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'taskForm',
                    bodyStyle: {
                        'background-color': '#E4E5E7'
                    },
                    dock: 'top',
                    weight: 101
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    listeners: {
                        edit: {
                            fn: me.onGridcelleditingpluginEdit,
                            scope: me
                        }
                    }
                })
            ],
            features: [
                {
                    ftype: 'grouping',
                    groupHeaderTpl: Ext.create('Ext.XTemplate', 
                        '{groupValue:this.renderDueDate}',
                        {
                            renderDueDate: function(date) {
                                var today = Ext.Date.clearTime(new Date()),
                                    todayTime = today.getTime(),
                                    dueDateTime;

                                if(!date) {
                                    return '(No Date)';
                                }
                                dueDateTime = Ext.Date.clearTime(date).getTime();
                                if(dueDateTime === todayTime) {
                                    return 'Today';
                                }
                                if(dueDateTime > todayTime) {
                                    if(dueDateTime === Ext.Date.add(today, Ext.Date.DAY, 1).getTime()) {
                                        // due date is current date + 1 day
                                        return 'Tomorrow';
                                    }
                                    if(dueDateTime < Ext.Date.add(today, Ext.Date.DAY, 7).getTime()) {
                                        // if the due date is less than one week in the future, return the day of the week.
                                        return Ext.Date.format(date, 'l');
                                    }
                                } else {
                                    if(dueDateTime === Ext.Date.add(today, Ext.Date.DAY, -1).getTime()) {
                                        // due date is current date - 1 day.
                                        return 'Yesterday';
                                    }
                                    if(dueDateTime > Ext.Date.add(today, Ext.Date.DAY, -7).getTime()) {
                                        // if the due date is less than one week past, return 'Last' + the day of the week.
                                        return 'Last '+ Ext.Date.format(date, 'l');
                                    }
                                }
                                return date.getFullYear() === today.getFullYear() ? Ext.Date.format(date, 'D m/d') : Ext.Date.format(date, 'D m/d/Y');
                            }
                        }
                    )
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'done'
                }
            ]
        });

        me.callParent(arguments);
    },

    onGridcelleditingpluginEdit: function(editor, e, options) {
        this.fireEvent('recordedit', e.record);
    },

    handleEditClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('editclick', gridView, rowIndex, colIndex, column, e);
    },

    handleCheckChange: function(column, rowIndex, checked) {
        this.fireEvent('recordedit', this.store.getAt(rowIndex));
    },

    handleReminderSelect: function(task, value) {
        this.fireEvent('reminderselect', task, value);
    },

    handleCellEdit: function(editor, e) {
        this.fireEvent('recordedit', e.record);
    },

    refreshFilters: function() {
        var store = this.store,
            filters = store.filters;

        // save a reference to the existing task filters before clearing them
        filters = filters.getRange(0, filters.getCount() - 1);

        // clear the tasks store's filters and reapply them.
        store.clearFilter();
        store.filter(filters);
    },

    renderList: function(value, metaData, task, rowIndex, colIndex, store, view) {
        var listsStore = Ext.getStore('Lists'),
            node = value ? listsStore.getNodeById(value) : listsStore.getRootNode();

        if (node) {
            return node.get('name');
        }

        return null;
    },

    handleDeleteClick: function(gridView, rowIndex, colIndex, column, e) {
        this.fireEvent('deleteclick', gridView, rowIndex, colIndex, column, e);
    }

});