﻿function myScript(thisObj) {function myScript_buildUI(thisObj) {//var win = (object instanceof Panel) ? object :  var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "GridPanel", [0,0,300,400],{	resizeable:true,independent:false,minimizeButton:false,maximizeButton:false,closeButton:false,});  //myPanel.alignChildren = ["fill","fill"];//image ressources pathvar dir = "(Icons)/";iconalignL= {a: File(dir+"alignL.png")}iconalignR= {a: File(dir+"alignR.png")}iconalignT= {a: File(dir+"alignT.png")}iconalignB= {a: File(dir+"alignB.png")}var gittergroup = myPanel.add ('group {alignment: "left"}');var p1 = gittergroup.add("panel", [0,0,300,50]);p1.orientation = "row";p1.add("statictext",[0, 0, 90, 20], "Wieviele Linien?");var anzahlEingabe = p1.add ("edittext", [0, 0, 23, 20], "10", {multiline: false, characters: 2});p1.ok = p1.add ('button {text: "ADD"}');var icongroup = myPanel.add ('group {alignment: "left"}');var p3 = icongroup.add("panel", [0,0,300,50]);//p3.preferredSize = [10, 600];p3.orientation ="row";p3.add("statictext",[0,0,70,40] ,"Align to Grid",{multiline:false});var icon1 = p3.add("iconbutton",[0,0,40,40] ,ScriptUI.newImage (iconalignL.a, undefined, undefined, undefined),{style: "toolbutton", toggle:0} );var icon2 = p3.add("iconbutton",[0,0,40,40] ,ScriptUI.newImage (iconalignR.a, undefined, undefined, undefined),{style: "toolbutton", toggle:0} );var icon3 = p3.add("iconbutton",[0,0,40,40] ,ScriptUI.newImage (iconalignT.a, undefined, undefined, undefined),{style: "toolbutton", toggle:0} );var icon4 = p3.add("iconbutton",[0,0,40,40] ,ScriptUI.newImage (iconalignB.a, undefined, undefined, undefined),{style: "toolbutton", toggle:0} );                  //Setup panel sizing and make panel resizable                    myPanel.layout.layout(true);                    //myPanel.grp.minimumSize = myPanel.grp.size;                    //myPanel.layout.resize();                    myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}p1.ok.onClick = function()        {          //alert ("debugging sucks");//check if input text is intvar toCheck = anzahlEingabe.text;var intCopies = parseInt(toCheck);if (isNaN(intCopies)){  alert ("Bitte eine Zahl eingeben");    } else {     var  copies = intCopies;        }    //call other func    lines(copies);            }//alignbutton setupicon1.onClick = function()        {gittercheck(); align ("left");            }icon2.onClick = function()        {gittercheck(); align ("right");            }icon3.onClick = function()        {gittercheck();align ("top");            }icon4.onClick = function()        {gittercheck();align ("bottom");            }                    return myPanel;} var myScriptPal = myScript_buildUI(thisObj);          if ((myScriptPal != null) && (myScriptPal instanceof Window)) {                    myScriptPal.center();                    myScriptPal.show();                    }          }      myScript(this);//globalsvar myComp = app.project.activeItem;//var myLayer = myComp.selectedLayers;//var thisLayer = myComp.selectedLayers[0];//globale arrays mit den gitterwertenvar xPositions = [0];var yPositions = [0];function lines(copies){  try{app.beginUndoGroup("Add Grid");//alert (myComp.name);var myComp = app.project.activeItem;var masterLayer = myComp.layers.addShape();masterLayer.name = ("grid " + copies);//sizevar  compWidth = (masterLayer.width); // gives the comp widthvar compHeight = (masterLayer.height);// gives the comp heightmasterLayer.property("Position").setValue([0,0]); var contents = masterLayer.property("ADBE Root Vectors Group");//shapes set-up var h1Path = new Shape();  h1Path.vertices = [[0,0], [compWidth,0]];  h1Path.closed = false;var v1Path = new Shape();  v1Path.vertices = [[0,0], [0,compHeight]];  v1Path.closed = false;var  abstand = compWidth/copies; var  copiesHori = compHeight/abstand;/////////////////horzontal group  var hori = contents.addProperty("ADBE Vector Group");  var hori1 = hori.property("ADBE Vectors Group");  hori.name = "horigroup";  var h1 = hori1.addProperty("ADBE Vector Shape - Group");  h1.name = "h1";  h1.property("ADBE Vector Shape").setValue(h1Path); //repeatervar xRepeater = hori.property("Contents").addProperty("ADBE Vector Filter - Repeater");xRepeater.property("Copies").setValue(copiesHori);xRepeater.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").setValue([0,abstand]);  //seting strokevar horiStroke =  hori1.addProperty("ADBE Vector Graphic - Stroke");horiStroke.name = "horiStroke";horiStroke.property("ADBE Vector Stroke Color").setValue([0.992, 0.368, 0.956,1]);horiStroke.property("Opacity").setValue([100]);horiStroke.property("Stroke Width").setValue([2]);///////////////vertical groupvar verti = contents.addProperty("ADBE Vector Group");var  ver1 = verti.property("ADBE Vectors Group");verti.name = "vertigroup";var v1 = ver1.addProperty("ADBE Vector Shape - Group");v1.name = "v1";v1.property("ADBE Vector Shape").setValue(v1Path);//repeatervar yRepeater = verti.property("Contents").addProperty("ADBE Vector Filter - Repeater");yRepeater.property("Copies").setValue(copies);yRepeater.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").setValue([abstand,0]);var vertiStroke =  ver1.addProperty("ADBE Vector Graphic - Stroke");vertiStroke.name = "vertiStroke";vertiStroke.property("ADBE Vector Stroke Color").setValue([0.992, 0.368, 0.956,1]);vertiStroke.property("Opacity").setValue([100]);vertiStroke.property("Stroke Width").setValue([2]);}catch(err) {alert (err.line.toString()+"\r"+ err.toString())} saveWerte (copies, abstand) ; app.endUndoGroup();}function saveWerte (copies, abstand){xPositions = [0];yPositions = [0];// positionen der linien in array speichernvar xPos =0;//var xPositions = [0];for(i=0; i < copies; i++){   xPos = xPos + abstand;   //xPos = xPos.toFixed(2);  // xpos = parseFloat(xPos);  xPos = parseFloat(xPos.toFixed(2));   xPositions.push(xPos);    }    //alert(xPositions);//return xPositions;var yPos =0;for(i=0; i < copies; i++){   yPos = yPos + abstand;   yPos = parseFloat(yPos.toFixed(2));   yPositions.push(yPos);    }//alert(yPositions);    } // func endefunction align (direction){try {app.beginUndoGroup("Align");var myLayer = myComp.selectedLayers;var thisLayer = myLayer[0];// check if layer is selectedif (thisLayer == null) {	alert ("Select a Layer first!");		}else{// position of the selected object?var posi = thisLayer.transform.position.value;xpos = posi[0];ypos = posi[1];    xpos = parseFloat(xpos.toFixed(2));    ypos = parseFloat(ypos.toFixed(2));//hier muss abfrage rein, ob es sich um shape layer handelt oder solid oder whatever else.if (thisLayer instanceof ShapeLayer){  //alert("ShapeLayer");var  size = thisLayer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property ("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").value;}else if (thisLayer instanceof AVLayer){  var lSource = thisLayer.source;  var lMainSource = lSource.mainSource;  if((lSource.frameDuration == 1)&&(lMainSource.color)){      //alert ("Solid Layer");      // how to find out the actual size in pixel of solid layer??      // geht davon aus, dass das Solid Comp Size hatte      var lWidth = thisLayer.width;      var lHeight = thisLayer.height;      var prozente = thisLayer.property("ADBE Transform Group").property("ADBE Scale").value;      var size = new Array();      size[0] = lWidth/100 * prozente[0];      size[1] = lHeight/100 * prozente[1];    }  }var breite = size[0];var hoehe = size[1];var halbeBreite = breite/2;    halbeBreite = parseFloat(halbeBreite.toFixed(2));var halbeHoehe = hoehe/2;    halbeHoehe = parseFloat(halbeHoehe.toFixed(2));// speicher die kantenwerte des objects in arrayvar kantenArray = [xpos - halbeBreite, xpos + halbeBreite, ypos - halbeHoehe, ypos + halbeHoehe];//ALIGN LEFT IS OKif (direction == "left"){var  arraySize = xPositions.length;var  newPos; for (x=arraySize; x>0; x--){     if (xPositions[x-1] < kantenArray[0])  {        var  newPos = xPositions[x-1];          //move selected layer object        var newPos2 = newPos + halbeBreite;        if (thisLayer.property("Transform").property("Position").numKeys == 0){        thisLayer.transform.position.setValue([newPos2,ypos]);      } else {        // keyframes da        // time is aktuelle positon der timeline        var aktTime = app.project.activeItem.time;        thisLayer.transform.position.setValueAtTime(aktTime,[newPos2,ypos]);        var thisKeyIndex = thisLayer.transform.position.nearestKeyIndex(aktTime);        thisLayer.transform.position.setSpatialTangentsAtKey(thisKeyIndex, [0,0,0], [0,0,0]);        //alert("key");      }        break;          }        }    }//ALIGN RIGHT okif (direction == "right"){var  arraySize = xPositions.length;var  newPos; for (x=0; x<arraySize; x++){     if (xPositions[x] > kantenArray[1])  {        var  newPos = xPositions[x];          //move selected layer object        var newPos2 = newPos - halbeBreite;        if (thisLayer.property("Transform").property("Position").numKeys == 0){        thisLayer.transform.position.setValue([newPos2,ypos]);        } else {        // keyframes da        var aktTime = app.project.activeItem.time;        thisLayer.transform.position.setValueAtTime(aktTime,[newPos2,ypos]);        //var holdInt = KeyframeInterpolationType.HOLD;        var thisKeyIndex = thisLayer.transform.position.nearestKeyIndex(aktTime);        thisLayer.transform.position.setSpatialTangentsAtKey(thisKeyIndex, [0,0,0], [0,0,0]);        //thisLayer.transform.position.setInterpolationTypeAtKey(thisKeyIndex, holdInt, holdInt);        //alert("key");      }        break;          }        }    }  //ALIGN TOP IS OKif (direction == "top"){var  arraySize = yPositions.length;var  newPos; for (x=arraySize; x>0; x--){     if (yPositions[x-1] < kantenArray[2])  {        var  newPos = yPositions[x-1];          //move selected layer object        var newPos2 = newPos + halbeHoehe;        if (thisLayer.property("Transform").property("Position").numKeys == 0){        thisLayer.transform.position.setValue([xpos,newPos2]);        } else {        // keyframes da        var aktTime = app.project.activeItem.time;        thisLayer.transform.position.setValueAtTime(aktTime,[xpos,newPos2]);        var thisKeyIndex = thisLayer.transform.position.nearestKeyIndex(aktTime);        thisLayer.transform.position.setSpatialTangentsAtKey(thisKeyIndex, [0,0,0], [0,0,0]);        //alert("key");      }        break;          }        }    }    //ALIGN BOTTOM FEHLERif (direction == "bottom"){var  arraySize = yPositions.length;var  newPos; for (x=0; x<arraySize; x++){     if (yPositions[x] > kantenArray[3])  {        var  newPos = yPositions[x];          //move selected layer object        var newPos2 = newPos - halbeHoehe;        if (thisLayer.property("Transform").property("Position").numKeys == 0){        thisLayer.transform.position.setValue([xpos,newPos2]);        } else {        // keyframes da        var aktTime = app.project.activeItem.time;        thisLayer.transform.position.setValueAtTime(aktTime,[xpos,newPos2]);        var thisKeyIndex = thisLayer.transform.position.nearestKeyIndex(aktTime);        thisLayer.transform.position.setSpatialTangentsAtKey(thisKeyIndex, [0,0,0], [0,0,0]);        //alert("key");      }        break;          }        }      }    } // end else selected layerapp.endUndoGroup();}catch(err) {alert (err.line.toString()+"\r"+ err.toString())}} // end func whereIsIt//function check if there is already eine gitter layer, wenn man auf align cklicktfunction gittercheck(){  try{    var allNames = new Array();    //schreib alle namen der comp in ein array    for (var i = 1; i <= myComp.numLayers; i++){    allNames.push(myComp.layer(i).name);    }    var layerZahl =allNames.length;    for(x = 0; x< layerZahl-1; x++){      var nameLayer = allNames[x];      //alert (nameLayer);    var suche = "grid";    if(nameLayer.indexOf(suche) != -1){      //alert("gibt schon ein gitter");      var thisLayerIndex = x+1;      var thisLayer = myComp.layer(thisLayerIndex);        if (thisLayer instanceof ShapeLayer){          // repeater auslesen            var horiRepeat = thisLayer.property("ADBE Root Vectors Group").property("horigroup").property("ADBE Vectors Group").            property("ADBE Vector Filter - Repeater").property("ADBE Vector Repeater Copies").value;            //alert (countRepeater1);            var vertiRepeat = thisLayer.property("ADBE Root Vectors Group").property("vertigroup").property("ADBE Vectors Group").            property("ADBE Vector Filter - Repeater").property("ADBE Vector Repeater Copies").value;            //alert (vertiRepeat);            // check welcher repeater eine ganze zahl ist              if (horiRepeat %1 != 0){                  //alert(vertiRepeat);                  // check if yPositions array hat schon mehr als ein eintrag                      if (yPositions.length <= 1){                          var copies = vertiRepeat;                          var  compWidth = (thisLayer.width); // gives the comp width                          var  abstand = compWidth/copies;                          saveWerte (copies, abstand);                          //alert(xPositions);                        }                } else{                    if (yPositions.length <= 1){                        var copies = horiRepeat;                        var  compWidth = (thisLayer.width); // gives the comp width                        var  abstand = compWidth/copies;                        saveWerte (copies, abstand);                        //alert(yPositions);                        }                  }      }      break;    }  } // ende for schleife  }catch(err) {alert (err.line.toString()+"\r"+ err.toString())}} // ende fuc gittercheck