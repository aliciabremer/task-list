const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Cinnamon = imports.gi.Cinnamon;
const Lang = imports.lang;
const GLib = imports.gi.GLib;
const Gettext = imports.gettext;
const UUID = "task-list@alicia";
const DESKLET_ROOT = imports.ui.deskletManager.deskletMeta[UUID].path;

Gettext.bindtextdomain(UUID, GLib.get_home_dir() + "/.local/share/locale")

function _(str) {
  return Gettext.dgettext(uuid, str);
}

function MyDesklet(metadata, desklet_id) {
	this._init(metadata, desklet_id);
}

MyDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id)
    {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);
        this.setupUI();
    },

    setupUI: function()
    {
        this.mainWindow = new St.BoxLayout({vertical:true});

        this.title = new St.Label({style_class: "text-title"});
        this.title.set_text("To-Do List");

        this.mainWindow.add_child(this.title);

        this.mainDir = GLib.get_home_dir()+'/.local/share/cinnamon/desklets/task-list@alicia/';
        this.file = this.mainDir + "todo.json";

        global.log("task-list string" + Cinnamon.get_file_contents_utf8_sync(this.file).toString());

        let choices = JSON.parse(Cinnamon.get_file_contents_utf8_sync(this.file).toString());

        global.log("task-list json file:" + choices);

        for (let task in choices.tasks)
        {
          let container = new St.BoxLayout({vertical:false, style_class: "text-boxes"});

          let tempText = new St.Label();
          tempText.set_text(task);

           let buttonAdd = new St.Button({style_class: "button-text"});
           buttonAdd.set_label("(click)");
           buttonAdd.connect("clicked", Lang.bind(buttonAdd, this.itemComplete));
           container.add_child(buttonAdd);
           container.add_child(tempText);

          this.mainWindow.add_child(container);
        }

        this.setContent(this.mainWindow);
        //add reload

    },

    itemComplete: function()
    {
      this.set_checked(!this.get_checked());
      if (this.get_checked())
      {
        this.set_label("\u00D7");
      }
      else
      {
        this.set_label("\u2022");
      }
    },

    on_desklet_clicked: function(event)
    {
      this.setUpUI();
    }

}

function main(metadata, desklet_id)
{
    return new MyDesklet(metadata, desklet_id);
}
