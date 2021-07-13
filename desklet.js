const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Lang = imports.lang;

function HelloDesklet(metadata, desklet_id)
{
    this._init(metadata, desklet_id);
}

HelloDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id)
    {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);

        this.setupUI();

        //create list of boxes of text stuff...
        //start with list and then create multi-dimensionalarray/list thing
    },

    setupUI: function()
    {
        // main container for the desklet


        this.mainWindow = new St.BoxLayout({vertical:true, style_class: "to-do-main-window"});

        this.bottomContent = new St.BoxLayout({vertical:true}); //change to scrollable

        let text = new St.Label({style_class: "text-title"});
        text.set_text("TO-DO:");

        this.mainWindow.add_child(text);

        this.mainWindow.add_child(this.bottomContent);

        let buttonAdd = new St.Button({style_class: "to-do-button-main"});
        buttonAdd.set_label("+");
        buttonAdd.connect("clicked", Lang.bind(this, this.addItem));
        this.mainWindow.add_child(buttonAdd);

        let buttonClear = new St.Button({style_class: "to-do-button-main"});
        buttonClear.set_label("clear all");
        buttonClear.connect("clicked", Lang.bind(this, this.clearItems));
        this.mainWindow.add_child(buttonClear);

        this.setContent(this.mainWindow);
    },

    addItem: function()
    {
      let item = new St.BoxLayout({vertical:false});
      let selected = new St.Button();
      selected.set_label("(click)");
      selected.connect("clicked", Lang.bind(this, this.itemComplete));

      let text = new St.Label();
      let temp = text.get_clutter_text();
      temp.set_editable(true);
      temp.set_cursor_visible(true);
       //change to entry so can be edited


      item.add_child(selected);
      item.add_child(text);
      this.bottomContent.add_child(item);
    },

    clearItems: function()
    {

    },

    itemComplete: function()
    {
    }
}

function main(metadata, desklet_id)
{
    return new HelloDesklet(metadata, desklet_id);
}
