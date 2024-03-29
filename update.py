import json

# Opening JSON file
with open('todo.json', 'r') as openfile:
    # Reading from json file
    json_object = json.load(openfile)

c = ""
print("update to do list:\n- add 'text here'\n- ret 'text here'\n- ren 'number here'\n- pri\n- cle\n- fin\n- swp")

while c != "fin":
  c = input("input now\n")
  if c[0:3]=="add":
    json_object["tasks"].append(c[4:])
  if c[0:3]=="ret":
    json_object["tasks"].remove(c[4:])
  if c[0:3]=="ren":
    json_object["tasks"].pop(int(c[4:]))
  if c[0:3]=="pri":
    for i in range(len(json_object["tasks"])):
      print(str(i) + ": " + json_object["tasks"][i]);
  if c[0:3]=="cle":
    json_object["tasks"].clear();
  if c[0:3]=="swp":
    spc = c[4:].index(" ")
    ind1 = int(c[4:spc+4])
    ind2 = int(c[spc+5:])
    obj = json_object["tasks"][ind1]
    json_object["tasks"][ind1] = json_object["tasks"][ind2]
    json_object["tasks"][ind2] = obj


# Writing to sample.json
with open("todo.json", "w") as outfile:
    json.dump(json_object, outfile) #fix writing

print("Go be productive!")
