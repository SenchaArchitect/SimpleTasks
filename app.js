/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
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

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'SimpleTasks.ux': 'app/ux',
        'Ext.ux': 'ux'
    }
});

Ext.application({
    models: [
        'List',
        'Task'
    ],
    stores: [
        'ReminderTimes',
        'Lists',
        'Tasks'
    ],
    views: [
        'lists.ContextMenu',
        'lists.Tree',
        'tasks.ContextMenu',
        'tasks.DefaultTimeWindow',
        'tasks.EditWindow',
        'tasks.Form',
        'tasks.ReminderWindow',
        'Toolbar',
        'SimpleTasksViewport',
        'MyComponent3',
        'tasks.Fields',
        'MyForm3'
    ],
    autoCreateViewport: true,
    name: 'SimpleTasks',
    controllers: [
        'Lists',
        'Tasks'
    ],

    launch: function() {
        SimpleTasksSettings = {
            // This property is used to turn on local storage.  If set to false the php backend will be used.
            useLocalStorage: true
        };
    }

});
